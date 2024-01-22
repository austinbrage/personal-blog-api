import { Router } from 'express'
import { Articles as ArticleController } from '../controllers/Articles'
import createAuthorization from '../auth/authorization'
import { type IArticle } from '../types/articles'

const createArticleRouter = ({ articleModel }: { articleModel: IArticle }) => {
    const articleRouter = Router()

    const userAuth = createAuthorization()
    const articleController = new ArticleController({ articleModel })

    articleRouter.get('/',              articleController.getAll)
    articleRouter.get('/keywords',      articleController.getKeywords)

    articleRouter.patch('/data',        userAuth, articleController.changeData)
    articleRouter.patch('/publishment', userAuth, articleController.changePublishState)

    articleRouter.post('/',             userAuth, articleController.addNew)
    articleRouter.delete('/',           userAuth, articleController.remove)

    return articleRouter
}

export default createArticleRouter