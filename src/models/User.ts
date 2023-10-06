const pool = require('../utils/config')
import { Pool, RowDataPacket } from 'mysql2/promise'
import { userType, userPasswordType } from '../types'

class User {
    private pool: Pool
    
    constructor() {
        this.pool = pool
    }

    getUser = async ({ user }: userType): Promise<RowDataPacket[]> => {
        const connection = await this.pool.getConnection()

        const query = `SELECT User
                       FROM users
                       WHERE User = ?`

        const [rows] = await connection.execute(query, [user])

        connection.release()
        return rows as RowDataPacket[]
    }

    getUserPassword = async ({ user, password }: userPasswordType) => {
        const connection = await this.pool.getConnection()

        const query = `SELECT User, Password
                       FROM users
                       WHERE User = ?`

        const [rows] = await connection.execute(query, [user, password])

        connection.release()
        return rows
    }

    insertNewUser = async ({ user, password }: userPasswordType) => {
        const connection = await this.pool.getConnection()

        const query = `INSERT INTO users (User, Password)
                       VALUES (?, ?)`

        const [rows] = await connection.execute(query, [user, password])

        connection.release()
        return rows
    }

    deleteUser = async ({ user, password }: userPasswordType) => {
        const connection = await this.pool.getConnection()

        const query = `DELETE FROM users
                       WHERE User = ? AND Password = ?`

        const [rows] = await connection.execute(query, [user, password])

        connection.release()
        return rows
    }
}

module.exports = User