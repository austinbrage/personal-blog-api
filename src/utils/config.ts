import { createPool } from 'mysql2/promise'
import { Pool } from 'mysql2/promise'
import { config } from 'dotenv'

config()

export const PORT = process.env.PORT ?? 3000
export const ENVIRONMENT = process.env.NODE_ENV ?? 'production'

export const JWT_EXPIRE = process.env.JWT_EXPIRE
export const SECRET_KEY = process.env.SECRET_KEY

export const dbConfig: {[env: string]: object} = {
    development: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },
    production: {
        host: process.env.PROD_DB_HOST,
        user: process.env.PROD_DB_USER,
        password: process.env.PROD_DB_PASSWORD,
        database: process.env.PROD_DB_DATABASE,
    },
    test: {
        host: process.env.TEST_DB_HOST,
        user: process.env.TEST_DB_USER,
        password: process.env.TEST_DB_PASSWORD,
        database: process.env.TEST_DB_DATABASE,
    },
}