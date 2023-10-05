const { pool } = require('../utils/config')

class Article {
    constructor() {
        this.pool = pool
    }

    getArticle = async ({ id, post }) => {
        const connection = await this.pool.getConnection()

        const query2 = `SELECT Post, Order, Content, Styles, isPublish
                        FROM articles
                        WHERE ID_name = ? AND Post = ?`
        
        const [rows] = await connection.execute(query2, [id, post]) 
        
        return rows
    }

    getAllArticles = async ({ id }) => {
        const connection = await this.pool.getConnection()

        const query1 = `SELECT Post, Order, Content, Styles, isPublish
                        FROM articles
                        WHERE ID_name = ?`
        
        const [rows] = await connection.execute(query1, [id]) 
        
        return rows
    }

    createArticle = async ({ id, post, order, content, styles, isPublish }) => {
        const connection = await this.pool.getConnection()

        const query = `INSERT INTO articles (ID_name, Post, Order, Content, Styles, isPublish)
                       VALUES (?, ?, ?, ?, ?, ?)`
        
        const [rows] = await connection.execute(query, [id, post, order, content, styles, isPublish])

        return rows
    }

    updateArticle = async ({ id, post, order, content, styles }) => {
        const connection = await this.pool.getConnection()

        const query = `UPDATE articles 
                       SET Content = ?, Styles = ?
                       WHERE ID_name = ? AND Post = ? AND Order = ?`

        const [rows] = await connection.execute(query, [content, styles, id, post, order])

        return rows               
    }

    updateArticleName = async ({ id, oldName, newName }) => {
        const connection = await this.pool.getConnection()

        const query = `UPDATE articles
                       SET Post = ?
                       WHERE ID_name = ? AND Post = ?`

        const [rows] = await connection.execute(query, [newName, id, oldName])

        return rows
    }

    updateArticlePublishState = async ({ id, post, isPublish }) => {
        const connection = await this.pool.getConnection()

        const query = `UPDATE articles
                       SET isPublish = ?
                       WHERE ID_name = ? AND Post = ?`

        const [rows] = await connection.execute(query, [isPublish, id, post])

        return rows
    }

    deleteSection = async ({ id, post, content, order }) => {
        const connection = await this.pool.getConnection()

        const query = `DELETE FROM articles
                       WHERE ID_name = ? AND Post = ? AND Content = ? AND Order = ?`

        const [rows] = await connection.execute(query, [id, post, content, order]) 

        return rows
    }
    
    deleteArticle = async ({ id, post }) => {
        const connection = await this.pool.getConnection()

        const query = `DELETE FROM articles
                       WHERE ID_name = ? AND Post = ?`

        const [rows] = await connection.execute(query, [id, post]) 

        return rows
    }
}

module.exports = Article 