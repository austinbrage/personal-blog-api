const createApp = require('./src/app')
const UserModel = require('./src/models/User')
const ArticleModel = require('./src/models/Article')

const app = createApp({ userModel: UserModel, articleModel: ArticleModel })

module.exports = app