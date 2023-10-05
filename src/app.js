const express = require('express')
const { PORT } = require('./utils/config')
const createUserRouter = require('./routes/users')
const corsMiddleware = require('./middlewares/cors')

const createApp = ({ userModel, articleModel }) => {
    const app = express()
    
    app.use(express.json())
    app.use(corsMiddleware())
    app.use(disable('x-powered-by'))
    
    app.use('./blogApi/user', createUserRouter({ userModel }))
    app.use('./blogApi/article', createUserRouter({ userModel }))

    app.listen(PORT, () => {
        console.log(`Server running on Port: ${PORT}`)
    })
}

module.exports = createApp