import { createPool } from 'mysql2/promise'
import { Pool } from 'mysql2/promise'
import { config } from 'dotenv'

config()

export const PORT = process.env.PORT || 3000

export const createPoolConnection = (wait: boolean, limit: number, queue: number) => {
    const pool: Pool = createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        waitForConnections: wait,
        connectionLimit: limit,
        queueLimit: queue
        // waitForConnections: true,
        // connectionLimit: 10,
        // queueLimit: 0
    })

    return pool
}