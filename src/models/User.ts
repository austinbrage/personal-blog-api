import { pool } from '../utils/config'
import { RowDataPacket } from 'mysql2/promise'
import { type userType, type userPasswordType } from '../types/users'
import { type IUser } from '../types/users'

class User implements IUser {
    private pool
    
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
        return rows as RowDataPacket[]
    }

    insertNewUser = async ({ user, password }: userPasswordType) => {
        const connection = await this.pool.getConnection()

        const query = `INSERT INTO users (User, Password)
                       VALUES (?, ?)`

        const [rows] = await connection.execute(query, [user, password])

        connection.release()
        return rows as RowDataPacket[]
    }

    deleteUser = async ({ user, password }: userPasswordType) => {
        const connection = await this.pool.getConnection()

        const query = `DELETE FROM users
                       WHERE User = ? AND Password = ?`

        const [rows] = await connection.execute(query, [user, password])

        connection.release()
        return rows as RowDataPacket[]
    }
}

export default User