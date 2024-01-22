import { Router } from 'express'
import { Articles as ArticleController } from '../controllers/Articles'
import { type IArticle } from '../types/articles'

const createArticleRouter = ({ articleModel }: { articleModel: IArticle }) => {
    const articleRouter = Router()

    const articleController = new ArticleController({ articleModel })

    articleRouter.get('/', articleController.getAll)
    articleRouter.get('/keywords', articleController.getKeywords)

    articleRouter.patch('/data', articleController.changeData)
    articleRouter.patch('/publishment', articleController.changePublishState)

    articleRouter.post('/', articleController.addNew)
    articleRouter.delete('/', articleController.remove)

    return articleRouter
}

export default createArticleRouter