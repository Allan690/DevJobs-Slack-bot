import express from 'express';
import jobsRouter from './GithubJobs';
import slackRouter from './Slack';

const apiPrefix = '/api/v1';

const routes = (app: express.Application) => {
  app.use(slackRouter);
  app.use(apiPrefix, jobsRouter);
  return app;
};

export default routes;
