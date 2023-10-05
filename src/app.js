const express = require('express')
const { PORT } = require('./utils/config')
const createUserRouter = require('./routes/users')
const createArticleRouter = require('./routes/articles')
const corsMiddleware = require('./middlewares/cors')

const createApp = ({ userModel, articleModel }) => {
    const app = express()
    
    app.use(express.json())
    app.use(corsMiddleware())
    app.disable('x-powered-by')
    
    app.use('./blogApi/user', createUserRouter({ userModel }))
    app.use('./blogApi/article', createArticleRouter({ articleModel }))

    app.listen(PORT, () => {
        console.log(`Server running on Port: ${PORT}`)
    })

    return app
}

module.exports = createApp