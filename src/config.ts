import dotenv from 'dotenv';
import type { Config } from './types.js';

dotenv.config();

export const config: Config = {
    FOLLOWERS_FILE: 'data/followers.json',
    GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
    MAX_DISPLAY_FOLLOWERS: process.env.MAX_DISPLAY_FOLLOWERS ? parseInt(process.env.MAX_DISPLAY_FOLLOWERS, 10) : 100,
    USERNAME: process.env.GITHUB_USERNAME || '',
};
