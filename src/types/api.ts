import { type Response } from "express"
import { type UserType } from "./users"
import { type ZodFormattedError } from "zod"
import { type RowDataPacket, ResultSetHeader } from "mysql2"

export enum AppRoutes {
    VERSION_1 = '/personal-blog'
}

export enum ResourceRoutes {
    PING = '/ping',
    USER = '/user',
    ARTICLE = '/article',
    SECTION = '/section',
}

declare global{
    namespace Express {
        interface Request {
            userId: UserType['id']
        }
    }
}

export type UserRoles = ('READ' | 'WRITE' | 'ADMIN')

export interface JwtPayload {
    id: number
    roles: UserRoles[]
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