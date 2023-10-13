import { type RequestHandler } from "express"
import { CustomError } from "../helpers/customError"

export const notFoundHandler: RequestHandler = (req, _res, next) => {
    const err = new CustomError(`Cannot find ${req.originalUrl} on the server!`, 404)
    next(err)
}