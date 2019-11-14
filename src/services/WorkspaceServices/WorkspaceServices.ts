import workspaceModel from '../../database/models';
import cache from '../../cache';

export default class WorkspaceService {
    /**
     * @description saves a workspace to the database once the app is installed
     * @param accessToken access token of workspace
     * @param teamName name of the workspace
     * @param webhookUrl the webhook url to be used to send requests
     */
  public static async addWorkspace(accessToken: string, teamId: string, webhookUrl: string) {
    try {
      const ws = await workspaceModel.findOne({ teamId });
      const workspace = new workspaceModel({
        accessToken,
        teamId,
        webhook: webhookUrl
      });
      if (!ws) {
        await workspace.save();
        await cache.saveObject(`DEVJOBS_${teamId}`, webhookUrl);
        return;
      }
      workspaceModel.deleteOne({ teamId });
      await workspace.save();
      await cache.saveObject(`DEVJOBS_${teamId}`, webhookUrl);
    } catch (err) {
      console.log(err);
    }
  }
}
