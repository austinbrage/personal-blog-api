import createApp from './app'
import UserModel from './models/User'
import StyleModel from './models/Style'
import ArticleModel from './models/Article'
import SectionModel from './models/Section'
import { PORT, ENVIRONMENT } from './utils/config'
import { createPoolConnection } from './services/database'

const userPool = createPoolConnection()
const stylePool = createPoolConnection()
const articlePool = createPoolConnection()
const sectionPool = createPoolConnection()

const userModel = new UserModel({ userPool })
const styleModel = new StyleModel({ stylePool })
const articleModel = new ArticleModel({ articlePool })
const sectionModel = new SectionModel({ sectionPool })

const app = createApp({ userModel, articleModel, sectionModel, styleModel })

const server = app.listen(PORT[ENVIRONMENT], () => {
    if(process.env.NODE_ENV !== 'production') {
        console.log(`Server running on Port: ${PORT[ENVIRONMENT]}`)
    }
})

export { app, server, userPool, stylePool, articlePool, sectionPool }