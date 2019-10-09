import axiosConfig from "../../helpers/axiosConfig";
import cache from '../../cache';

class GithubJobsService {
    /**
     *
     * @param description job description e.g python
     * @param location job location e.g sf
     * @param search search term e.g node
     * @param page e.g 1
     */
    static async getAllJobs(description = '', location = '', page = 1, search = '') {
        const results = await axiosConfig.request({
            method: "GET",
            url: `description=${description}&location=${location}&page=${page}&search=${search}&markdown=true`,
        });
        await cache.saveObject('allJobs', results.data);
        return results;
    }

    static async getSingleJob(id: string, markdown = true) {
        const result = await axiosConfig.request({
            baseURL: `https://jobs.github.com/positions/${id}.json?markdown=${markdown}`,
            method: 'GET'
        });
        return result;
    }
}

export default GithubJobsService;
