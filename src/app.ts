import express, { json, Router } from 'express'
import createUserRouter from './routes/users'
import createArticleRouter from './routes/articles'
import createSectionRouter from './routes/sections'
import connectionRouter from './routes/connection'
import corsMiddleware from './middlewares/cors'
import errorMiddleware from './middlewares/error'
import { notFoundHandler } from './services/notFoundHandler'
import { type IUser } from './types/users'
import { type IArticle } from './types/articles'
import { type ISection } from './types/sections'
import { type IStyle } from './types/styles'
import { AppRoutes as APP, ResourceRoutes as RESOURCES } from './types/api'

type ModelsType = {
    userModel: IUser,
    styleModel: IStyle
    articleModel: IArticle
    sectionModel: ISection
}

const createApp = ({ userModel, articleModel, sectionModel, styleModel }: ModelsType) => {
    const app = express()
    const mainRouter = Router()

    app.use(json())
    app.use(corsMiddleware())
    app.disable('x-powered-by')
    
    mainRouter.use(RESOURCES.PING,    connectionRouter)
    mainRouter.use(RESOURCES.USER,    createUserRouter({ userModel }))
    mainRouter.use(RESOURCES.ARTICLE, createArticleRouter({ articleModel }))
    mainRouter.use(RESOURCES.SECTION, createSectionRouter({ sectionModel, styleModel }))
    
    app.use(APP.VERSION_1, mainRouter)

    app.all('*', notFoundHandler)
    app.use(errorMiddleware)

    return app
}

export default createApp