import { RequestHandler } from "express"
import { CustomError } from "../helpers/customError" 

const environmentMiddleware: RequestHandler = (_req, _res, next) => {
    if(process.env.NODE_ENV !== 'test') {
        return next(new CustomError('Only allowed in test environment', 403))
    }
    next()
}

export default environmentMiddleware