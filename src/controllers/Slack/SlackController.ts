import cache from '../../cache';
const signature  = require('../../verifySignature');
const { IncomingWebhook } = require('@slack/webhook');
import { Response, Request } from 'express';
import GithubJobsService from '../../services/GithubJobs/GithubJobsService';
import env from '../../config/environment';


type job = {
  title: string,
  company: string,
  location: string,
  type: string,
  created_at: string,
  how_to_apply: string
};

export const jobsDestructurer = (job: job) => {
  return [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*${job.title}*`
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `:classical_building: _${job.company}_`
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `:house_buildings: _${job.location}_ \n\n :stopwatch:  _${job.type}_  \n\n Posted on: _${job.created_at}_`
      }
    },
    {
      type: 'divider'
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `\n\n${job.how_to_apply}\n\n`
      }
    },
    {
      type: 'divider'
    },
  ];

};
class SlackController {
  /**
   * @description verifies whether the incoming request is from slack then fetches jobs from Github
   * @param req the payload received from slack
   * @param res the response object
   */
  static async getAllTasks(req: Request, res: Response) {
    try {
      const url = await cache.fetch(`DEVJOBS_${req.body.team_id}`)
      const webhook = new IncomingWebhook(url);
      const emptyBlock: any = {
        blocks: []
      };
      if (signature.isVerified(req)) {
        let data = await cache.fetch('allJobs');
        if (!data) {
          const results = await GithubJobsService.getAllJobs();
          data = results.data;
        }
        for (const job of data) {
          const jobArray = jobsDestructurer(job);
          emptyBlock.blocks.push(...jobArray);
          await webhook.send({
            blocks: emptyBlock.blocks
          });
        }
      }
      return;
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default SlackController;
