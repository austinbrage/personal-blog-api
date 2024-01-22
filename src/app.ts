import express, { json } from 'express'
import createUserRouter from './routes/users'
import createArticleRouter from './routes/articles'
import createSectionRouter from './routes/sections'
import connectionRouter from './routes/connection'
import corsMiddleware from './middlewares/cors'
import errorMiddleware from './middlewares/error'
import { type IUser } from './types/users'
import { type IArticle } from './types/articles'
import { type ISection } from './types/sections'
import { type IStyle } from './types/styles'
import { notFoundHandler } from './services/notFoundHandler'

type ModelsType = {
    userModel: IUser,
    styleModel: IStyle
    articleModel: IArticle
    sectionModel: ISection
}

const createApp = ({ userModel, articleModel, sectionModel, styleModel }: ModelsType) => {
    const app = express()

    app.use(json())
    app.use(corsMiddleware())
    app.disable('x-powered-by')
    
    app.use('/personal-blog/ping',    connectionRouter)
    app.use('/personal-blog/user',    createUserRouter({ userModel }))
    app.use('/personal-blog/article', createArticleRouter({ articleModel }))
    app.use('/personal-blog/section', createSectionRouter({ sectionModel, styleModel }))
    
    app.all('*', notFoundHandler)
    app.use(errorMiddleware)

    return app
}

export default createApp