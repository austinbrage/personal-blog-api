import { createPool } from "mysql2/promise"
import { dbCofig, ENVIRONMENT } from "../utils/config"

type CreatePool = {
    waitForConnection?: boolean, 
    connectionLimit?: number, 
    queueLimit?: number
}

const currentDBConfig = dbCofig[ENVIRONMENT]

export const createPoolConnection = ({
    waitForConnection, 
    connectionLimit, 
    queueLimit
}: CreatePool = {}) => {
    const pool = createPool({
        ...currentDBConfig,
        waitForConnections: waitForConnection ?? true,
        connectionLimit: connectionLimit ?? 10,
        queueLimit: queueLimit ?? 0
    })

    if(!pool) throw new Error('Error at MySQL pool connection')

    return pool
}