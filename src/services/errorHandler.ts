import type { Request, Response, NextFunction } from "express"
import type { StardardResponse } from "../types/custom"

export type AsyncFuntion = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => Promise< Response<StardardResponse> | void > 

type ErrorHandler = (func: AsyncFuntion) => (
    req: Request, 
    res: Response, 
    next: NextFunction
) => Promise< Response<StardardResponse> | void > 

export const asyncErrorHandler: ErrorHandler = (func) => {
    return async (req, res, next) => {
        try {
            await func(req, res, next)
        } catch (err) {
            if(process.env.NODE_ENV !== 'production') console.error(err)
            next(err)
        }
    }
}