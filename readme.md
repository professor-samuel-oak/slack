# Professor Oak Slack Bot

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
