import express, { json } from 'express'
import { PORT } from './utils/config'
import createAuthorization from './auth/authorization'
import createUserRouter from './routes/users'
import createArticleRouter from './routes/articles'
import createSectionRouter from './routes/sections'
import corsMiddleware from './middlewares/cors'
import errorMiddleware from './middlewares/error'
import { type IUser } from './types/users'
import { type IArticle } from './types/articles'
import { type ISection } from './types/sections'
import { type IStyle } from './types/styles'
import { notFoundHandler } from './utils/notFoundHandler'

type ModelsType = {
    userModel: IUser,
    styleModel: IStyle
    articleModel: IArticle
    sectionModel: ISection
}

const createApp = ({ userModel, articleModel, sectionModel, styleModel }: ModelsType) => {
    const app = express()
    const userAuth = createAuthorization({ userModel })

    app.use(json())
    app.use(corsMiddleware)
    app.use(errorMiddleware)
    app.disable('x-powered-by')
    
    app.use('./personal-blog/user', createUserRouter({ userModel }))
    app.use('./personal-blog/article', userAuth, createArticleRouter({ articleModel }))
    app.use('./personal-blog/section', userAuth, createSectionRouter({ sectionModel, styleModel }))

    app.all('*', notFoundHandler)

    app.listen(PORT, () => {
        if(process.env.NODE_ENV !== 'production') {
            console.log(`Server running on Port: ${PORT}`)
        }
    })

    return app
}

export default createApp