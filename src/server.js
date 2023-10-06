const createApp = require('./app')
const UserModel = require('./models/User')
const ArticleModel = require('./models/Article')

const app = createApp({ userModel: UserModel, articleModel: ArticleModel })

module.exports = app