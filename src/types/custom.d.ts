import { type Response } from "express"
import { type UserType } from "./users"
import { type ZodFormattedError } from "zod"
import { type RowDataPacket, ResultSetHeader } from "mysql2"

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
        status: 'fail' | 'error'
        message: string
        validationError: ZodFormattedError<unknown> | null
    }
}

export type OkResponse = {
    success: true
    result: {
        message: string
        token: string | null
        data: RowDataPacket[] | ResultSetHeader[] | null
    }
}

export type StardardResponse = OkResponse | ErrorResponse