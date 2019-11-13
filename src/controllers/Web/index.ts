import { Router } from 'express';
import WebController from './WebControllers';

const webRouter = Router();

// Handle home page request
webRouter.get('/', WebController.renderHomePage);

// Handle install page request
webRouter.get('/install', WebController.installRedirect);

// Handle auth page request
webRouter.get('/auth/authorize', WebController.authorize);

export default webRouter;
