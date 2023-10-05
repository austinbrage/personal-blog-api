const express = require('express')
const ArticleController = require('../controllers/Articles')

const createArticleRouter = ({ articleModel }) => {
    const articleRouter = express.Router()

    const articleController = new ArticleController({ articleModel })

    articleRouter.get('./', articleController.getArticle)
    articleRouter.get('./all', articleController.getAllArticles)

    articleRouter.post('./', articleController.createArticle)

    articleRouter.put('./', articleController.updateArticle)
    articleRouter.put('./name', articleController.updateArticleName)
    articleRouter.put('./state', articleController.updateArticleState)
    
    articleRouter.delete('./', articleController.deleteArticle)
    articleRouter.delete('./section', articleController.deleteSection)
}

module.exports = createArticleRouter