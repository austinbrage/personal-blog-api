const pool = require('../utils/config')
import { Pool, RowDataPacket } from 'mysql2/promise'
import { 
    idType, 
    idPostType, 
    sectionType, 
    allArticleType, 
    publishStateType,
    partialArticleType,
    articleNameChangeType 
} from '../types'

class Article {
    private pool: Pool

    constructor() {
        this.pool = pool
    }

    getArticle = async ({ id, post }: idPostType) => {
        const connection = await this.pool.getConnection()

        const query2 = `SELECT Post, Order, Content, Styles, isPublish
                        FROM articles
                        WHERE ID_name = ? AND Post = ?`
        
        const [rows] = await connection.execute(query2, [id, post]) 
        
        connection.release()
        return rows as RowDataPacket[]
    }

    getAllArticles = async ({ id }: idType) => {
        const connection = await this.pool.getConnection()

        const query1 = `SELECT Post, Order, Content, Styles, isPublish
                        FROM articles
                        WHERE ID_name = ?`
        
        const [rows] = await connection.execute(query1, [id]) 
        
        connection.release()
        return rows as RowDataPacket[]
    }

    createArticle = async ({ id, post, order, content, styles, isPublish }: allArticleType) => {
        const connection = await this.pool.getConnection()

        const query = `INSERT INTO articles (ID_name, Post, Order, Content, Styles, isPublish)
                       VALUES (?, ?, ?, ?, ?, ?)`
        
        const [rows] = await connection.execute(query, [id, post, order, content, styles, isPublish])

        connection.release()
        return rows as RowDataPacket[]
    }

    updateArticle = async ({ id, post, order, content, styles }: partialArticleType) => {
        const connection = await this.pool.getConnection()

        const query = `UPDATE articles 
                       SET Content = ?, Styles = ?
                       WHERE ID_name = ? AND Post = ? AND Order = ?`

        const [rows] = await connection.execute(query, [content, styles, id, post, order])

        connection.release()
        return rows as RowDataPacket[]    
    }

    updateArticleName = async ({ id, oldName, newName }: articleNameChangeType) => {
        const connection = await this.pool.getConnection()

        const query = `UPDATE articles
                       SET Post = ?
                       WHERE ID_name = ? AND Post = ?`

        const [rows] = await connection.execute(query, [newName, id, oldName])

        connection.release()
        return rows as RowDataPacket[]
    }

    updateArticlePublishState = async ({ id, post, isPublish }: publishStateType) => {
        const connection = await this.pool.getConnection()

        const query = `UPDATE articles
                       SET isPublish = ?
                       WHERE ID_name = ? AND Post = ?`

        const [rows] = await connection.execute(query, [isPublish, id, post])

        connection.release()
        return rows as RowDataPacket[]
    }

    deleteSection = async ({ id, post, content, order }: sectionType) => {
        const connection = await this.pool.getConnection()

        const query = `DELETE FROM articles
                       WHERE ID_name = ? AND Post = ? AND Content = ? AND Order = ?`

        const [rows] = await connection.execute(query, [id, post, content, order]) 

        connection.release()
        return rows as RowDataPacket[]
    }
    
    deleteArticle = async ({ id, post }: idPostType) => {
        const connection = await this.pool.getConnection()

        const query = `DELETE FROM articles
                       WHERE ID_name = ? AND Post = ?`

        const [rows] = await connection.execute(query, [id, post]) 

        connection.release()
        return rows as RowDataPacket[]
    }
}

module.exports = Article 