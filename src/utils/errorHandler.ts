import { Request, Response, NextFunction } from "express"
import { RowDataPacket } from "mysql2" 
import { ZodFormattedError } from "zod"

type ErrorResponse = {
    status: 'error',
    validationError: ZodFormattedError<unknown, string>
}

type OkResponse = {
    status: 'error' | 'success'
    message?: string
    data?: RowDataPacket[]
}

export type AsyncFuntion = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => Promise<Response<ErrorResponse | OkResponse> | void> 

type ErrorHandler = (func: AsyncFuntion) => (
    req: Request, 
    res: Response, 
    next: NextFunction
) => Promise<Response<ErrorResponse | OkResponse> | void> 

export const asyncErrorHandler: ErrorHandler = (func) => {
    return async (req, res, next) => {
        try {
            const response = await func(req, res, next)
            // return response as Response<ErrorResponse | OkResponse>
        } catch (err) {
            next(err)
        }
    }
}