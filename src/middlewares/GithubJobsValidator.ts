import { Request, Response, NextFunction} from "express";
import joi from '@hapi/joi';

class GithubJobsValidator {
    /**
     *
     * @param req Express request object
     * @param res express response object
     * @param next express next function
     * @returns a response or calls the next function
     */
    static validateIdParam(req: Request, res: Response, next: NextFunction) {
        const schema = joi.object().keys({
            id: joi.string().required().trim(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            const { details: errorDetails } = error;
            const { message } = errorDetails[0];
            return res.status(400).send({
                message: 'VALIDATION_ERROR',
                error: message
            })
        }
        return next();
    }

    static validateQueryParams(req: Request, res: Response, next: NextFunction) {
        const schema = joi.object().keys({
            description: joi.string().trim(),
            location: joi.string().trim(),
            search: joi.string().trim(),
            page: joi.number()
        });
        const { error, value } = schema.validate(req.query, { abortEarly: false });
        if (error) {
            const errorArr: Array<string> = [];
            const { details: errorDetails } = error;
            errorDetails.forEach((err) => {
                const { context: { key }, message } = err;
                errorArr.push(message);
            });
            return res.status(400).send({
                message: 'VALIDATION_ERROR',
                error: errorArr
            })
        }
        req.body = value;
        return next();
    }
}

export default GithubJobsValidator;
