export interface GitHubUser {
  readonly avatar_url: string;
  readonly html_url: string;
  readonly id: number;
  readonly login: string;
}

export interface FollowersData {
  readonly followers: readonly string[];
  readonly lastUpdated: string;
}

export interface Config {
  readonly FOLLOWERS_FILE: string;
  readonly GITHUB_TOKEN: string;
  readonly MAX_DISPLAY_FOLLOWERS: number;
  readonly USERNAME: string;
}
