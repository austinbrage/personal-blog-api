import { RowDataPacket } from 'mysql2'

declare module 'express' {
    interface Request {
        userData: RowDataPacket[]
    }
}

export interface JwtPayload {
    id: number;
}