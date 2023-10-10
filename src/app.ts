import express, { json } from 'express'
import { PORT } from './utils/config'
import createUserRouter from './routes/users'
import createArticleRouter from './routes/articles'
import createSectionRouter from './routes/sections'
import corsMiddleware from './middlewares/cors'
import errorMiddleware from './middlewares/error'
import { type IUser } from './types/users'
import { type IArticle } from './types/articles'
import { type ISection } from './types/sections'
import { type IStyle } from './types/styles'

type ModelsType = {
    userModel: IUser,
    styleModel: IStyle
    articleModel: IArticle
    sectionModel: ISection
}

const createApp = ({ userModel, articleModel, sectionModel, styleModel }: ModelsType) => {
    const app = express()
    
    app.use(json())
    app.use(corsMiddleware)
    app.use(errorMiddleware)
    app.disable('x-powered-by')
    
    app.use('./blogApi/user', createUserRouter({ userModel }))
    app.use('./blogApi/article', createArticleRouter({ articleModel }))
    app.use('./blogApi/section', createSectionRouter({ sectionModel, styleModel }))

    app.listen(PORT, () => {
        console.log(`Server running on Port: ${PORT}`)
    })

    return app
}

export default createApp