import { WebClient } from '@slack/web-api';
import express from 'express';
import env from '../../config/environment';
import { acquireOAuthAccess } from './helpers/WebControllers';
import WorkspaceService from '../../services/WorkspaceServices/WorkspaceServices';

export interface IMessageInfo {
  channel: string;
  messageTs: any;
  originalChannel: string;
  user?: boolean;
  always?: boolean;
}

class WebController {
  public static renderHomePage(req: express.Request, res: express.Response) {
    res.render('home', {
      slackButtonHref: '/api/v1/install',
      title: 'Install DevJobs',
    });
  }


  public static installRedirect(req: express.Request, res: express.Response) {
    res.redirect(WebController.slackInstallationUrl);
  }


  // slack installation url
  private static slackInstallationUrl: string = `https://slack.com/oauth/authorize?scope=incoming-webhook,commands,bot&client_id=${env.CLIENT_ID}&redirect_url=${env.SLACK_REDIRECT_URL}`;

  private static async userAuth(req: express.Request, res: express.Response) {
    const response = await acquireOAuthAccess(req.query.code);
    const web = new WebClient(response.data.access_token);
    res.render('userauth', {
      title: 'Success',
    });
  }

  /**
   * @description Authenticate a user or install the app in a workspace
   */
  public static async authorize(req: any, res: any) {
    try {
      const messageInfo: IMessageInfo = JSON.parse(req.query.state || '{}');

      // Check if authentication is for user or team
      if (messageInfo.user) {
        await WebController.userAuth(req, res);
      } else {
        console.log('nko hapa')
        await WebController.teamAuth(req, res);
      }
    } catch (error) {
      console.error(error);
      res.render('installationError', {
        title: 'Error',
      });
    }
  }

  /**
   * @description Install the app in a team workspace
   */
  private static async teamAuth(req: any, res: any) {
    try {
      const { data } = await acquireOAuthAccess(req.query.code);
      await WorkspaceService.addWorkspace(
        data.access_token, data.team_id, data.incoming_webhook.url
        );
      res.render('installationSuccess', {
        title: 'Success'
      });
    }
    // tslint:disable-next-line: brace-style
    catch (err) {
      console.log(err);
    }
  }

}

export default WebController;
