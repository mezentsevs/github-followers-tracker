import { GitHubFollowersTracker } from './tracker.js';

class GitHubFollowersChecker {
    private readonly tracker: GitHubFollowersTracker;

    constructor() {
        this.tracker = new GitHubFollowersTracker();
    }

    public async check(): Promise<void> {
        const { username, useCached } = this.validateArgs();

        let followers: Set<string>;
        
        if (useCached) {
            console.log('📁 Using cached followers data...');
            followers = await this.tracker.readPreviousFollowers();
        } else {
            console.log('🔄 Updating followers data...');
            await this.tracker.updateFollowers();
            followers = await this.tracker.readPreviousFollowers();
        }

        if (followers.has(username)) {
            console.log('✅ User "%s" is in your %s followers list', username, useCached ? 'cached' : 'current');
        } else {
            console.log('❌ User "%s" is NOT in your %s followers list', username, useCached ? 'cached' : 'current');
        }
    }

    private validateArgs(): { username: string; useCached: boolean } {
        const args = process.argv.slice(2);
        
        if (args.length === 0) {
            console.error('❌ Error: Username argument is required');
            console.info('ℹ  Usage: npm run check <username> [cached]');
            console.info('ℹ  Example: npm run check octocat');
            console.info('ℹ  Example: npm run check octocat cached');
            process.exit(1);
        }

        const username: string = args[0]!;
        const secondArg: string | undefined = args[1];
        const useCached: boolean = secondArg !== undefined && secondArg.toLowerCase() === 'cached';

        return { username, useCached };
    }
}

new GitHubFollowersChecker().check().catch((error: unknown) => {
    console.error('❌ Error: %s', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
});
