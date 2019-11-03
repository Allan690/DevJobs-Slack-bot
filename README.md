[![Maintainability](https://api.codeclimate.com/v1/badges/39d075b3b3ce19ead297/maintainability)](https://codeclimate.com/github/Allan690/DevJobs-Slack-bot/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/39d075b3b3ce19ead297/test_coverage)](https://codeclimate.com/github/Allan690/DevJobs-Slack-bot/test_coverage)

[![CircleCI](https://circleci.com/gh/Allan690/DevJobs-Slack-bot.svg?style=svg)](https://circleci.com/gh/Allan690/DevJobs-Slack-bot)

## DevJobs Bot
A slack bot for devs looking for jobs. 

#### GETTING STARTED
1. Clone this repo and checkout to the develop branch
2. Install the requirements: `yarn`. This assumes that you have `yarn` installed.
3. Create a .env file at the root of your directory 
4. Create a slack application by following the instructions at api.slack.com.
5. Save the webhook url under the environment variable `SLACK_WEBHOOK_URL` in your .env
6. Start the app by running: `yarn start:dev`

#### NOTES
The app is not yet set up for distribution

#### TOOLS/LANGUAGES
- Node js
- Typescript
- REST
- Redis(caching)

#### APIs consumed
- Slack API
- Github Jobs API

#### SCREENSHOTS

![image](https://user-images.githubusercontent.com/23090268/66515253-72731380-eae7-11e9-939c-7a4d1fe7751a.png)
#### Author
- Allan Mogusu
