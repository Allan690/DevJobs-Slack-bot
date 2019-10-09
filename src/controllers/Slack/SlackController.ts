import cache from '../../cache';
const signature  = require('../../verifySignature');
const { IncomingWebhook } = require("@slack/webhook");
import { Response, Request } from "express";
import GithubJobsService from "../../services/GithubJobs/GithubJobsService";

const url = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(url);

class SlackController {
    static async getAllTasks(req: Request, res: Response) {
      try {
          let emptyBlock: any = {
              blocks: []
          };
          if(signature.isVerified(req)) {
              let data = await cache.fetch('allJobs');
              if(!data) {
                  const results = await GithubJobsService.getAllJobs();
                  data = results.data
              }
             for (const job of data) {
                 let jobArray = [
                     {
                         "type": "section",
                         "text": {
                             "type": "mrkdwn",
                             "text": `*${job.title}*`
                         }
                     },
                     {
                         "type": "section",
                         "text": {
                             "type": "mrkdwn",
                             "text": `:classical_building: _${job.company}_`
                         }
                     },
                     {
                         "type": "section",
                         "text": {
                             "type": "mrkdwn",
                             "text": `:house_buildings: _${job.location}_ \n\n :stopwatch:  _${job.type}_  \n\n Posted on: _${job.created_at}_`
                         }
                     },
                     {
                         "type": "divider"
                     },
                     {
                         "type": "section",
                         "text": {
                             "type": "mrkdwn",
                             "text": `\n\n${job.how_to_apply}\n\n`
                         }
                     },
                     {
                         "type": "divider"
                     },
                 ];

                 emptyBlock.blocks.push(...jobArray);
                 await webhook.send({
                     blocks: emptyBlock.blocks
                 });
             }
          }
          return;
      }
      catch (e) {
         throw new Error(e);
      }
    }
}

export default SlackController;
