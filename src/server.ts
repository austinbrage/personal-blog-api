import createApp from './app'
import UserModel from './models/User'
import ArticleModel from './models/Article'

const userModel = new UserModel()
const articleModel = new ArticleModel()

const app = createApp({ userModel, articleModel })

export default app