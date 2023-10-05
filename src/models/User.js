const pool = require('../utils/config')

class User {
    constructor() {
        this.pool = pool
    }

    getUser = async ({ user }) => {
        const connection = await this.pool.getConnection()

        const query = `SELECT User
                       FROM users
                       WHERE User = ?`

        const [rows] = connection.execute(query, [user])

        return rows
    }

    getUserPassword = async ({ user, password }) => {
        const connection = await this.pool.getConnection()

        const query = `SELECT User, Password
                       FROM users
                       WHERE User = ?`

        const [rows] = connection.execute(query, [user, password])

        return rows
    }

    insertNewUser = async ({ user, password }) => {
        const connection = await this.pool.getConnection()

        const query = `INSERT INTO users (User, Password)
                       VALUES (?, ?)`

        const [rows] = connection.execute(query, [user, password])

        return rows
    }

    deleteUser = async ({ user, password }) => {
        const connection = await this.pool.getConnection()

        const query = `DELETE FROM users
                       WHERE User = ? AND Password = ?`

        const [rows] = connection.execute(query, [user, password])

        return rows
    }
}