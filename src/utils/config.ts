import { config } from 'dotenv'

config()

type DBConfig = {
    host?: string
    user?: string
    password?: string
    database?: string
}

type BucketConfig = {
    accessKey?: string
    bucketName?: string
    bucketRegion?: string
    secretAccessKey?: string
}

export const ENVIRONMENT = process.env.NODE_ENV ?? 'production'
export const SIGNED_URL_EXPIRE = process.env.SIGNED_URL_EXPIRE ?? '3600'

export const JWT_EXPIRE = process.env.JWT_EXPIRE
export const SECRET_KEY = process.env.SECRET_KEY

export const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
export const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

export const PORT: {[env: string]: string | number} = {
    development: process.env.DEV_PORT ?? 3000,
    production: process.env.PROD_PORT ?? 3001,
    test: process.env.TEST_PORT ?? 3002
} 

export const dbConfig: {[env: string]: DBConfig} = {
    development: {
        host: process.env.DEV_DB_HOST,
        user: process.env.DEV_DB_USER,
        password: process.env.DEV_DB_PASSWORD,
        database: process.env.DEV_DB_DATABASE,
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

export const bucketConfig: {[env: string]: BucketConfig} = {
    development: {
        accessKey: process.env.DEV_ACCESS_KEY,
        bucketName: process.env.DEV_BUCKET_NAME,
        bucketRegion: process.env.DEV_BUCKET_REGION,
        secretAccessKey: process.env.DEV_SECRET_ACCESS_KEY,
    },
    production: {
        accessKey: process.env.PROD_ACCESS_KEY,
        bucketName: process.env.PROD_BUCKET_NAME,
        bucketRegion: process.env.PROD_BUCKET_REGION,
        secretAccessKey: process.env.PROD_SECRET_ACCESS_KEY,
    },
    test: {
        accessKey: process.env.TEST_ACCESS_KEY,
        bucketName: process.env.TEST_BUCKET_NAME,
        bucketRegion: process.env.TEST_BUCKET_REGION,
        secretAccessKey: process.env.TEST_SECRET_ACCESS_KEY,
    }
}