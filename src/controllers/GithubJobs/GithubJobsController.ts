import { Request, Response } from 'express';
import GithubJobsService from '../../services/GithubJobs/GithubJobsService';

class GithubJobsController {
    /**
     * @param req Express request object
     * @param res express response object
     * @description fetches jobs from the service and sends a json response
     */
  static async getAllJobs(req: Request, res: Response) {
    try {
      let description: string;
      let location: string;
      let page: number;
      let search: string;
      if (req.query.description) {
        description = req.query.description;
      }
      if (req.query.location) {
        location = req.query.location;
      }
      if (req.query.page) {
        page = req.query.page;
      }
      if (req.query.search) {
        search = req.query.search;
      }
      const { data } = await GithubJobsService.getAllJobs(description, location, page, search);
      return res.status(200).json({
        success: true,
        jobs: data
      });
    } catch (err) {
      return res.json(err.data);
    }
  }
    /**
     * @param req Express request object
     * @param res express response object
     * @description fetches  a single job from the service and sends a json response
     */
  static async getSingleJob(req: Request, res: Response) {
    try {
      let markdown: boolean;
      const id: string = req.params.id;
      if (req.query.markdown) {
        markdown = req.query.markdown;
      }
      const result = await GithubJobsService.getSingleJob(id, markdown);
      return res.status(200).json({
        success: true,
        job: result.data
      });
    } catch (err) {
      if (err.response.status === 404) {
        return res.status(404).json({
          success: false,
          message: `Job with ID: '${req.params.id}' was not found`
        });
      }
      return res.json(err);
    }
  }
}
export default GithubJobsController;
