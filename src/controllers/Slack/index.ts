import { Router } from "express";
import SlackController from "./SlackController";

const slackRouter = Router();
slackRouter.post(
    '/slash',
    SlackController.getAllTasks
);

export default slackRouter;
