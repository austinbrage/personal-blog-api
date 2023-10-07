import { Router } from 'express'
import ArticleController from '../controllers/Articles'

const createArticleRouter = ({ articleModel }) => {
    const articleRouter = Router()

    const articleController = new ArticleController({ articleModel })

    articleRouter.get('./', articleController.getArticle)
    articleRouter.get('./all', articleController.getAllArticles)

    articleRouter.post('./', articleController.createArticle)

    articleRouter.patch('./', articleController.updateArticle)
    articleRouter.patch('./name', articleController.updateArticleName)
    articleRouter.patch('./state', articleController.updateArticleState)
    
    articleRouter.delete('./', articleController.deleteArticle)
    articleRouter.delete('./section', articleController.deleteSection)

    return articleRouter
}

export default createArticleRouter