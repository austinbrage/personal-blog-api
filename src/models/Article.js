const pool = require('../utils/config')

class Article {
    constructor() {
        this.pool = pool
    }

    getArticle = async ({ name, post }) => {
        const connection = await this.pool.getConnection()

        const query1 = `SELECT Post, Order, Content, Styles, State
                        FROM articles
                        WHERE ID_name = ?`

        const query2 = `SELECT Post, Order, Content, Styles, State
                        FROM articles
                        WHERE ID_name = ? AND Post = ?`
        
        const [rows] = await post 
            ? connection.execute(query1, [name]) 
            : connection.execute(query2, [name, post]) 
        
        return rows
    }

    createArticle = async ({ name, post, order, content, styles, state }) => {
        const connection = await this.pool.getConnection()

        const query = `INSERT INTO articles (ID_name, Post, Order, Content, Styles, State)
                       VALUES (?, ?, ?, ?, ?, ?)`
        
        const [rows] = await connection.execute(query, [name, post, order, content, styles, state])

        return rows
    }

    updateArticle = async ({ name, post, order, content, styles }) => {
        const connection = await this.pool.getConnection()

        const query = `UPDATE articles 
                       SET Content = ?, Styles = ?
                       WHERE ID_name = ? AND Post = ? AND Order = ?`

        const [rows] = await connection.execute(query, [content, styles, name, post, order])

        return rows               
    }

    updateArticleName = async ({ name, oldName, newName }) => {
        const connection = await this.pool.getConnection()

        const query = `UPDATE articles
                       SET Post = ?
                       WHERE ID_name = ? AND Post = ?`

        const [rows] = await connection.execute(query, [newName, name, oldName])

        return rows
    }

    updateArticleState = async ({ name, post, state }) => {
        const connection = await this.pool.getConnection()

        const query = `UPDATE articles
                       SET State = ?
                       WHERE ID_name = ? AND Post = ?`

        const [rows] = await connection.execute(query, [state, name, post])

        return rows
    }

    deleteSection = async ({ name, post, content, order }) => {
        const connection = await this.pool.getConnection()

        const query = `DELETE FROM articles
                       WHERE ID_name = ? AND Post = ? AND Content = ? AND Order = ?`

        const [rows] = await connection.execute(query, [name, post, content, order]) 

        return rows
    }
    
    deleteArticle = async ({ name, post }) => {
        const connection = await this.pool.getConnection()

        const query = `DELETE FROM articles
                       WHERE ID_name = ? AND Post = ?`

        const [rows] = await connection.execute(query, [name, post]) 

        return rows
    }
}