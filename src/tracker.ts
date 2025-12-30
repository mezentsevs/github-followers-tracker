import { config } from './config.js';
import { dirname } from 'path';
import { promises as fs } from 'fs';
import type { GitHubUser, FollowersData } from './types.js';

export class GitHubFollowersTracker {
    private static readonly API_DELAY_MS: number = 1000;
    private static readonly PER_PAGE: number = 100;
    
    private readonly headers: HeadersInit;

    constructor() {
        this.validateConfig();

        this.headers = {
            'Authorization': `token ${config.GITHUB_TOKEN}`,
            'User-Agent': 'GitHub-Followers-Tracker',
        };
    }

    private validateConfig(): void {
        if (!config.GITHUB_TOKEN || config.GITHUB_TOKEN === 'your_github_token_here') {
            console.error('❌ Error: GITHUB_TOKEN not configured');
            console.info('ℹ  Please edit the .env file and add your actual GitHub personal access token');
            process.exit(1);
        }

        if (!config.GITHUB_USERNAME || config.GITHUB_USERNAME === 'your_github_username_here') {
            console.error('❌ Error: GITHUB_USERNAME not configured');
            console.info('ℹ  Please edit the .env file and add your actual GitHub username');
            process.exit(1);
        }
    }

    public async track(): Promise<void> {
        console.log('✔  Checking followers for %s...', config.GITHUB_USERNAME);

        const current: Set<string> = await this.fetchFollowers();
        const previous: Set<string> = await this.readPreviousFollowers();

        const gainedFollowers: Set<string> = new Set([...current].filter((f: string) => !previous.has(f)));
        const lostFollowers: Set<string> = new Set([...previous].filter((f: string) => !current.has(f)));

        await this.saveFollowers(current);
        this.displayResults(gainedFollowers, lostFollowers, current.size);
    }

    private async fetchFollowers(): Promise<Set<string>> {
        const followers: string[] = [];
        let page: number = 1;

        while (true) {
            const url: string = `https://api.github.com/users/${config.GITHUB_USERNAME}/followers?page=${page}&per_page=${GitHubFollowersTracker.PER_PAGE}`;
            const response: Response = await fetch(url, { headers: this.headers });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data: GitHubUser[] = await response.json() as GitHubUser[];

            if (data.length === 0) {
                break;
            }

            followers.push(...data.map((user: GitHubUser) => user.login));
            page++;

            await new Promise((resolve: (value: void) => void) => 
                setTimeout(resolve, GitHubFollowersTracker.API_DELAY_MS));
        }

        return new Set(followers);
    }

    public async readPreviousFollowers(): Promise<Set<string>> {
        try {
            const data: string = await fs.readFile(config.FOLLOWERS_FILE, 'utf8');

            return new Set((JSON.parse(data) as FollowersData).followers);
        } catch {
            return new Set();
        }
    }

    private async saveFollowers(followers: ReadonlySet<string>): Promise<void> {
        const data: FollowersData = {
            followers: Array.from(followers),
            lastUpdated: new Date().toISOString(),
        };

        await fs.mkdir(dirname(config.FOLLOWERS_FILE), { recursive: true });
        await fs.writeFile(config.FOLLOWERS_FILE, JSON.stringify(data, null, 2));
    }

    private displayResults(gainedFollowers: Set<string>, lostFollowers: Set<string>, total: number): void {        
        if (gainedFollowers.size > 0) {
            const displayedGainedFollowers = Array.from(gainedFollowers).slice(0, config.MAX_DISPLAY_FOLLOWERS);
            const moreText = gainedFollowers.size > config.MAX_DISPLAY_FOLLOWERS ? 
                ` and ${gainedFollowers.size - config.MAX_DISPLAY_FOLLOWERS} more` : '';

            console.log('😊 New followers (%d): %s%s', gainedFollowers.size, displayedGainedFollowers.join(', '), moreText);
        }

        if (lostFollowers.size > 0) {
            const displayedLostFollowers = Array.from(lostFollowers).slice(0, config.MAX_DISPLAY_FOLLOWERS);
            const moreText = lostFollowers.size > config.MAX_DISPLAY_FOLLOWERS ? 
                ` and ${lostFollowers.size - config.MAX_DISPLAY_FOLLOWERS} more` : '';

            console.warn('😞 Unfollowed (%d): %s%s', lostFollowers.size, displayedLostFollowers.join(', '), moreText);
        }

        console.info('ℹ  Total followers: %d', total);
    }

    public async updateFollowers(): Promise<void> {
        const current: Set<string> = await this.fetchFollowers();
        await this.saveFollowers(current);
    }
}

if (process.argv[1] && process.argv[1].endsWith('tracker.js')) {
    new GitHubFollowersTracker().track().catch((error: unknown) => {
        console.error('❌ Error: %s', error instanceof Error ? error.message : 'Unknown error');
        process.exit(1);
    });
}
