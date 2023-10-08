import { Router } from 'express'
import { Articles as ArticleController } from '../controllers/Articles'
import { type IArticle } from '../types/articles'

const createArticleRouter = ({ articleModel }: { articleModel: IArticle }) => {
    const articleRouter = Router()

    const articleController = new ArticleController({ articleModel })

    articleRouter.get('./', articleController.getArticle)
    articleRouter.get('./all', articleController.getAllArticles)

    articleRouter.post('./', articleController.createArticle)

    articleRouter.patch('./', articleController.updateArticle)
    articleRouter.patch('./name', articleController.updateArticleName)
    articleRouter.patch('./state', articleController.updateArticle)
    
    articleRouter.delete('./', articleController.deleteArticle)
    articleRouter.delete('./section', articleController.deleteSection)

    return articleRouter
}

export default createArticleRouter