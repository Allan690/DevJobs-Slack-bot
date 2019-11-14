import express from 'express';
import jobsRouter from './GithubJobs';
import slackRouter from './Slack';
import webRouter from './Web';

const apiPrefix = '/api/v1';

const routes = (app: express.Application) => {
  app.use(slackRouter);
  app.use(apiPrefix, jobsRouter);
  app.use(apiPrefix, webRouter);
  return app;
};

export default routes;
