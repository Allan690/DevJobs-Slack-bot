require('./configure-env');

const env = {
  PORT: process.env.APP_PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'production',
  REDIS_URL: process.env.REDIS_URL,
  SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
  SLACK_SIGNING_SECRET: process.env.SLACK_SIGNING_SECRET,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  SLACK_REDIRECT_URL: process.env.SLACK_REDIRECT_URL,
  DATABASE_URL: process.env.DATABASE_URL
};

export default env;
