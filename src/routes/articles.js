const express = require('express')
const ArticleController = require('../controllers/Articles')

const createArticleRouter = ({ articleModel }) => {
    const articleRouter = express.Router()

    const articleController = new ArticleController({ articleModel })

    articleRouter.get('./article', articleController.getArticle)
    articleRouter.get('./article/all', articleController.getAllArticles)

    articleRouter.post('./article', articleController.createArticle)

    articleRouter.put('./article', articleController.updateArticle)
    articleRouter.put('./article/name', articleController.updateArticleName)
    articleRouter.put('./article/state', articleController.updateArticleState)
    
    articleRouter.delete('./article', articleController.deleteArticle)
    articleRouter.delete('./article/section', articleController.deleteSection)
}

module.exports = createArticleRouter