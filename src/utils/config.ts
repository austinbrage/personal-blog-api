import { createPool } from 'mysql2/promise'
import { Pool } from 'mysql2/promise'
import { config } from 'dotenv'

config()

export const PORT = process.env.PORT || 3000
export const JWT_EXPIRE = process.env.JWT_EXPIRE
export const SECRET_KEY = process.env.SECRET_KEY

type CreatePool = {
    waitForConnection: boolean, 
    connectionLimit: number, 
    queueLimit: number
}

export const createPoolConnection = ({
    waitForConnection, 
    connectionLimit, 
    queueLimit
}: CreatePool) => {
    const pool: Pool = createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        waitForConnections: waitForConnection,
        connectionLimit: connectionLimit,
        queueLimit: queueLimit
        // waitForConnections: true,
        // connectionLimit: 10,
        // queueLimit: 0
    })
    return pool
}