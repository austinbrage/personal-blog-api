import type { RowDataPacket, ResultSetHeader, Pool } from 'mysql2/promise'
import type { ArticleType, IArticle } from '../types/articles'
import { ArticleQueries } from '../types/queries'
import { articleQueries } from '../utils/queries'

class Article implements IArticle {
    private pool

    constructor({ articlePool }: { articlePool: Pool }) {
        this.pool = articlePool
    }

    getKeywords = async () => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            articleQueries[ArticleQueries.getKeywords]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    getEverything = async ({ limit, offset }: ArticleType['limitOffsetPage']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            articleQueries[ArticleQueries.getEverything],
            [limit, offset]
        )

        connection.release()
        return rows as RowDataPacket[]
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

    getByKeyword = async ({ keywords, limit, offset, user_id }: ArticleType['allDataPage']) => {
        const connection = await this.pool.getConnection()

        const processedQuery = articleQueries[ArticleQueries.getByKeyword].replace(
            'placeholder',
            keywords.map(() => 'keywords LIKE ?').join(' OR ')
        )

        const processedKeywords = keywords.map(keyword => `%${keyword}%`)

        const [rows] = await connection.execute(
            processedQuery,
            [user_id, ...processedKeywords, limit, offset]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    getAllByKeyword = async ({ keywords, limit, offset }: ArticleType['noUserIdPage']) => {
        const connection = await this.pool.getConnection()

        const processedQuery = articleQueries[ArticleQueries.getAllByKeyword].replace(
            'placeholder',
            keywords.map(() => 'keywords LIKE ?').join(' OR ')
        )

        const processedKeywords = keywords.map(keyword => `%${keyword}%`)

        const [rows] = await connection.execute(
            processedQuery,
            [...processedKeywords, limit, offset]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    getImageById = async ({ id }: ArticleType['id']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            articleQueries[ArticleQueries.getImageById],
            [id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    changeData = async ({ id, name, title, image, keywords, description }: ArticleType['idData']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            articleQueries[ArticleQueries.changeData],
            [name, title, image, keywords, description, id]
        )   

        connection.release()
        return rows as ResultSetHeader
    }

    changePublishState = async ({ id, is_publish }: ArticleType['idPublishState']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            articleQueries[ArticleQueries.changePublishment],
            [is_publish, id]
        )

        connection.release()
        return rows as ResultSetHeader
    }

    addNew = async ({ user_id, name, title, image, keywords, description }: ArticleType['userIdData']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            articleQueries[ArticleQueries.addNew],
            [user_id, name, title, image, keywords, description]
        ) 

        connection.release()
        return rows as ResultSetHeader 
    }

    remove = async ({ id }: ArticleType['id']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            articleQueries[ArticleQueries.remove],
            [id]
        )

        connection.release()
        return rows as ResultSetHeader
    }
}

export default Article