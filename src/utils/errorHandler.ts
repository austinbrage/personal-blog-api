import { Request, Response, NextFunction } from "express"
import { RowDataPacket } from "mysql2" 

export type AsyncFuntion = (req: Request, res: Response, next: NextFunction) => Promise<void>
type ErrorHandler = (func: AsyncFuntion) => (req: Request, res: Response, next: NextFunction) => Promise<void>  

export const asyncErrorHandler: ErrorHandler = (func) => {
    return async (req, res, next) => {
        try {
            await func(req, res, next)
        } catch (err) {
            next(err)
        }
    }
}