const { createPool } = require('mysql2/promise')
const dotenv = require('dotenv')

dotenv.config()

const PORT = process.env.PORT || 3000

const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

module.exports = {
    pool,
    PORT
}