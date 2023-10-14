import { createPoolConnection } from '../services/database'
import { type RowDataPacket } from 'mysql2/promise'
import { type ArticleType } from '../types/articles'
import { type IArticle } from '../types/articles'
import { ArticleQueries } from '../types/queries'
import { articleQueries } from '../utils/queries'

class Article implements IArticle {
    private pool

    constructor() {
        this.pool = createPoolConnection({
            waitForConnection: true,
            connectionLimit: 10,
            queueLimit: 0
        })
    }

    getAll = async ({ user_id }: ArticleType['userId']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            articleQueries[ArticleQueries.getAll],
            [user_id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    getId = async ({ user_id, name }: ArticleType['userIdName']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            articleQueries[ArticleQueries.getId],
            [user_id, name]
        )

        connection.release()
        return rows as RowDataPacket[]
    }
    
    changeName = async ({ id, name }: ArticleType['idName']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            articleQueries[ArticleQueries.changeName],
            [name, id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    changePublishState = async ({ id, is_publish }: ArticleType['idPublishState']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            articleQueries[ArticleQueries.changePublishment],
            [is_publish, id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    addNew = async ({ user_id, name }: ArticleType['userIdName']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            articleQueries[ArticleQueries.addNew],
            [user_id, name]
        )

        connection.release()
        return rows as RowDataPacket[]   
    }

    remove = async ({ id }: ArticleType['id']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            articleQueries[ArticleQueries.remove],
            [id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }
}

export default Article