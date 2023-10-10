import createApp from './app'
import UserModel from './models/User'
import StyleModel from './models/Style'
import ArticleModel from './models/Article'
import SectionModel from './models/Section'

const userModel = new UserModel()
const styleModel = new StyleModel()
const articleModel = new ArticleModel()
const sectionModel = new SectionModel()

const app = createApp({ userModel, articleModel, sectionModel, styleModel })

export default app