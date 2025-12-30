# GitHub followers tracker

## Note on Future Development
Please be aware that this application is in active development and hasn't been extensively tested with very large numbers of followers yet. If you encounter any performance issues or bugs in such scenarios, contributions are greatly appreciated - feel free to open a pull request, and we can work together to improve it. Thank you for your understanding and support.

## About 'GitHub followers tracker'

This is a followers tracker, written in and for educational and demonstrational purposes.

A lightweight and convenient application that tracks your GitHub followers, detects changes between runs, and allows you to check if specific users are in your followers list.

Based on tech stack:
- [Node.js](https://nodejs.org),
- [TypeScript](https://www.typescriptlang.org),
- [GitHub REST API](https://docs.github.com/en/rest),
- [FS Promises API](https://nodejs.org/api/fs.html),
- [Dotenv](https://github.com/motdotla/dotenv).

## Getting Started

1. Install and setup:
``` bash
git clone [repository-url]
cd /path/to/github-followers-tracker/
npm install
cp .env.example .env
```

2. Get GitHub token:
- Go to https://github.com/settings/tokens
- Click `Generate new token` → `Generate new token (classic)`
- Set expiration and check only `public_repo` scope
- Copy the token immediately

3. Edit .env file and add your credentials:
``` bash
GITHUB_TOKEN=your_github_token_here
GITHUB_USERNAME=your_github_username_here
```

### Notes:
- Never commit your `.env` file
- Token only needs `public_repo` scope

## Track

The main script that fetches your current GitHub followers, compares them with previous data, and shows changes.

### Usage:
``` bash
npm run track
```

### What it does:
- Fetches your current GitHub followers
- Compares with previous run
- Shows new followers and unfollows
- Stores data locally for future comparisons

### Configuration (.env):
- `MAX_DISPLAY_FOLLOWERS`: Max usernames to show (default: 100)

### Example output:
``` bash
✔  Checking followers for username...
😊 New followers (2): user1, user2
😞 Unfollowed (1): user3
ℹ  Total followers: 154
```

### Notes:
- Data is stored in `data/followers.json` (completely overwritten each run)
- First run creates baseline, subsequent runs show changes

## Check

Additional script that checks if a specific user is in your followers list. Can use either current data from GitHub API or cached data from previous runs.

### Usage:
``` bash
npm run check <username> [cached]
```

### Parameters:
- `<username>`: **Required**. The GitHub username to check
- `[cached]`: **Optional**. Use cached data instead of fetching fresh data from GitHub API

### Examples:

Check if user "octocat" is in your current followers (fetches fresh data):
``` bash
npm run check octocat
```

Check if user "octocat" is in your cached followers (uses locally stored data):
``` bash
npm run check octocat cached
```

### Example outputs:

**When user IS in followers list:**
``` bash
🔄 Updating followers data...
✅ User "octocat" is in your current followers list
```

**When user is NOT in followers list:**
``` bash
📁 Using cached followers data...
❌ User "octocat" is NOT in your cached followers list
```

### Notes:
- Without the `cached` parameter, the script fetches fresh data from GitHub API
- With the `cached` parameter, uses data from `data/followers.json` without API calls (useful for quick checks without hitting API rate limits)

That's it! Thank you!

## License

The 'GitHub followers tracker' is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Third-Party Licenses
This project uses third-party software components. Their respective licenses can be found in the LICENSE-3rd-party.md file.
