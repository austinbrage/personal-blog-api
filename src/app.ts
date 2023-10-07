import express, { json } from 'express'
import { PORT } from './utils/config'
import createUserRouter from './routes/users'
import createArticleRouter from './routes/articles'
import corsMiddleware from './middlewares/cors'
import errorMiddleware from './middlewares/error'
import { type IUser } from './types/users'
import { type IArticle } from './types/articles'

type modelsType = {
    userModel: IUser,
    articleModel: IArticle
}

const createApp = ({ userModel, articleModel }: modelsType) => {
    const app = express()
    
    app.use(json())
    app.use(corsMiddleware)
    app.use(errorMiddleware)
    app.disable('x-powered-by')
    
    app.use('./blogApi/user', createUserRouter({ userModel }))
    app.use('./blogApi/article', createArticleRouter({ articleModel }))

    app.listen(PORT, () => {
        console.log(`Server running on Port: ${PORT}`)
    })

    return app
}

export default createApp