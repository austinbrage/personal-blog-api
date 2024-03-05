import { Router } from 'express'
import { Articles as ArticleController } from '../controllers/Articles'
import createAuthorization from '../auth/authorization'
import { ArticleRoutes as A, type IArticle } from '../types/articles'

const createArticleRouter = ({ articleModel }: { articleModel: IArticle }) => {
    const articleRouter = Router()

    const userAuth = createAuthorization()
    const articleController = new ArticleController({ articleModel })

    articleRouter.get(A.KEYWORDS,                 articleController.getKeywords)
    articleRouter.get(A.DALL,                     articleController.getEverything)
    articleRouter.get(A.DKEYWORDS,                articleController.getAllByKeywords)
    articleRouter.get(A.DUKEYWORDS,     userAuth, articleController.getByKeywords)
    articleRouter.get(A.EMPTY,          userAuth, articleController.getAll)

    articleRouter.patch(A.DATA,         userAuth, articleController.changeData)
    articleRouter.patch(A.PUBLISHMENT,  userAuth, articleController.changePublishState)

    articleRouter.post(A.EMPTY,         userAuth, articleController.addNew)
    articleRouter.delete(A.EMPTY,       userAuth, articleController.remove)

    return articleRouter
}

export default createArticleRouter