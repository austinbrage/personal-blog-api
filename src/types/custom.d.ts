import { type Response } from "express"
import { type UserType } from "./users"
import { type RowDataPacket } from "mysql2"
import { type ZodFormattedError } from "zod"

declare global{
    namespace Express {
        interface Request {
            userId: UserType['id']
        }
    }
}

export interface JwtPayload {
    id: number
}

export type ErrorResponse = {
    success: false
    error: {
        status: 'fail' | 'error',
        message: string
        validationError: ZodFormattedError<unknown> | null
    }
}

export type OkResponse = {
    success: true
    result: {
        message: string,
        data: RowDataPacket[] | null
    }
}

export type StardardResponse = OkResponse | ErrorResponse