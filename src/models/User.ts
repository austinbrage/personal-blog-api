import { createPoolConnection } from '../utils/config'
import { type RowDataPacket } from 'mysql2/promise'
import { type UserType } from '../types/users'
import { type IUser } from '../types/users'
import { userQueries } from '../utils/queries'
import { UserQueries } from '../types/queries'

class User implements IUser {
    private pool
    
    constructor() {
        this.pool = createPoolConnection({
            waitForConnection: true,
            connectionLimit: 10,
            queueLimit: 0
        })
    }

    getAll = async ({ id }: UserType['id']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            userQueries[UserQueries.getAll], 
            [id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    getPassword = async ({ name }: UserType['name']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            userQueries[UserQueries.getPassword], 
            [name]
        )

        connection.release()
        return rows as RowDataPacket[]
    }
    
    changeName = async ({ id, name }: UserType['idName']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            userQueries[UserQueries.changeName], 
            [name, id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    changeEmail = async ({ id, email }: UserType['idEmail']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            userQueries[UserQueries.changeEmail], 
            [email, id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    changePhone = async ({ id, phone }: UserType['idPhone']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            userQueries[UserQueries.changePhone], 
            [phone, id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    changeAuthor = async ({ id, author }: UserType['idAuthor']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            userQueries[UserQueries.changeAuthor], 
            [author, id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    changePassword = async ({ id, password }: UserType['idPassword']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            userQueries[UserQueries.changePassword], 
            [password, id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    remove = async ({ id }: UserType['id']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            userQueries[UserQueries.remove], 
            [id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    addNew = async ({ name, password, email, phone, author }: UserType['data']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            userQueries[UserQueries.remove], 
            [name, password, email, phone, author]
        )

        connection.release()
        return rows as RowDataPacket[]
    }
}

export default User