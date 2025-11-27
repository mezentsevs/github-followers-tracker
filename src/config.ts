import dotenv from 'dotenv';
import type { Config } from './types.js';

dotenv.config();

export const config: Config = {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
    GITHUB_USERNAME: process.env.GITHUB_USERNAME || '',
    MAX_DISPLAY_FOLLOWERS: process.env.MAX_DISPLAY_FOLLOWERS ? parseInt(process.env.MAX_DISPLAY_FOLLOWERS, 10) : 100,
    FOLLOWERS_FILE: 'data/followers.json',
};
