const createApp = require('./src/app')
const UserModel = require('./src/models/User')
const ArticleModel = require('./src/models/Article')

createApp({ userModel: UserModel, articleModel: ArticleModel })