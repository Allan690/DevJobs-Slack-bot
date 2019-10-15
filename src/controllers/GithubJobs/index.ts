import { Router } from 'express';
import GithubJobsController from '../../controllers/GithubJobs/GithubJobsController';
import GithubJobsValidator from '../../middlewares/GithubJobsValidator';

const jobsRouter = Router();

jobsRouter.get(
    '/jobs',
    GithubJobsValidator.validateQueryParams,
    GithubJobsController.getAllJobs
);

jobsRouter.get(
    '/jobs/:id',
    GithubJobsValidator.validateIdParam,
    GithubJobsController.getSingleJob
);

export default jobsRouter;
