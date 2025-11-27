# GitHub followers tracker

## Note on Future Development
Please be aware that this application is in active development and hasn't been extensively tested with very large numbers of followers yet. If you encounter any performance issues or bugs in such scenarios, contributions are greatly appreciated - feel free to open a pull request, and we can work together to improve it. Thank you for your understanding and support.

## About 'GitHub followers tracker'

This is a followers tracker, written in and for educational and demonstrational purposes.

A lightweight and convenient application that tracks your GitHub followers and detects changes between runs.

Based on tech stack:
- [Node.js](https://nodejs.org),
- [TypeScript](https://www.typescriptlang.org),
- [GitHub REST API](https://docs.github.com/en/rest),
- [FS Promises API](https://nodejs.org/api/fs.html),
- [dotenv](https://github.com/motdotla/dotenv).

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
- Click "Generate new token" → "Generate new token (classic)"
- Set expiration and check only "public_repo" scope
- Copy the token immediately

3. Edit .env file and add your credentials:
``` bash
GITHUB_TOKEN=your_github_token_here
GITHUB_USERNAME=your_github_username_here
```

4. Run:
``` bash
npm run track
```

### What it does:
- Fetches your current GitHub followers
- Compares with previous run
- Shows new followers and unfollows
- Stores data locally for future comparisons

### Configuration (.env):
- GITHUB_TOKEN: Your GitHub personal access token
- GITHUB_USERNAME: Your GitHub username  
- MAX_DISPLAY_FOLLOWERS: Max usernames to show (default: 100)

### Example output:
``` bash
✓ Checking followers for username...
✓ New followers (2): user1, user2
⚠ Unfollowed (1): user3
ℹ Total followers: 154
```

### Notes:
- Never commit your .env file
- Token only needs 'public_repo' scope
- Data is stored in data/followers.json (completely overwritten each run)
- First run creates baseline, subsequent runs show changes
- For issues check the GitHub repository

That's it! Thank you!

## License

The 'GitHub followers tracker' is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
