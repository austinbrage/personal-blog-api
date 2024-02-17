import type { RowDataPacket, ResultSetHeader, Pool } from 'mysql2/promise'
import type { UserType, IUser } from '../types/users'
import { userQueries } from '../utils/queries'
import { UserQueries } from '../types/queries'

class User implements IUser {
    private pool
    
    constructor({ userPool }: { userPool: Pool }) {
        this.pool = userPool
    }
    
    getId = async ({ api_key }: UserType['apiKey']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            userQueries[UserQueries.getId], 
            [api_key]
        )

        connection.release()
        return rows as RowDataPacket[]
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

    getName = async ({ name }: UserType['name']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            userQueries[UserQueries.getName], 
            [name]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    getEmail = async ({ email }: UserType['email']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            userQueries[UserQueries.getEmail], 
            [email]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    getAuthor = async ({ author }: UserType['author']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            userQueries[UserQueries.getAuthor],
            [author]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    getIdPassword = async ({ name }: UserType['name']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            userQueries[UserQueries.getIdPassword], 
            [name]
        )

        connection.release()
        return rows as RowDataPacket[]
    }
    
    getByExternalID = async ({ auth_provider, external_id }: UserType['authData']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            userQueries[UserQueries.getByExternalId], 
            [auth_provider, external_id]
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

    addNew = async ({ name, password, email, author, auth_provider, external_id }: UserType['fullData']) => {
        const connection = await this.pool.getConnection()
        
        const [results] = await connection.execute(
            userQueries[UserQueries.addNew], 
            [name, password, email, author, auth_provider, external_id]
        ) as ResultSetHeader[]

        const newId = results.insertId

        connection.release()
        return newId as number
    }
}

export default User