# Professor Samuel Oak for Slack &middot; ![npm](https://img.shields.io/badge/build-passing-brightgreen.svg) ![npm](https://img.shields.io/badge/npm-3.0-blue.svg)

Slack integration for Professor Samuel Oak, a real-time Pokémon battle bot for group chat clients.

## NPM Scripts

```sh
# install
npm install
# build and run the development envoirement
npm start
# build for development
npm run build-dev
# build for production
npm run build-prod
# run last envoirement build
npm run server
```

## Config

To use the bot on your system, create an `config.json` file in the root directory of the project. Add the follow JSON body. This file may change in future updated.

```json
{
    "development": true | false,
    "slackbot": {
        "enabled": true | false,
        "config": {
            "token": "xoxb-YOUR_SLACK_TOKEN_HERE"
        }
    }
}
```
