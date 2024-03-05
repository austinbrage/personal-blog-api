import { Router } from 'express'
import { Articles as ArticleController } from '../controllers/Articles'
import createAuthorization from '../auth/authorization'
import { ArticleRoutes as A, type IArticle } from '../types/articles'

const createArticleRouter = ({ articleModel }: { articleModel: IArticle }) => {
    const articleRouter = Router()

    const readAuth = createAuthorization('READ')
    const writeAuth = createAuthorization('WRITE')
    
    const articleController = new ArticleController({ articleModel })

    articleRouter.get(A.KEYWORDS,                 articleController.getKeywords)
    articleRouter.get(A.DALL,                     articleController.getEverything)
    articleRouter.get(A.DKEYWORDS,                articleController.getAllByKeywords)
    articleRouter.get(A.DUKEYWORDS,     readAuth, articleController.getByKeywords)
    articleRouter.get(A.EMPTY,          readAuth, articleController.getAll)

    articleRouter.patch(A.DATA,         writeAuth, articleController.changeData)
    articleRouter.patch(A.PUBLISHMENT,  writeAuth, articleController.changePublishState)

    articleRouter.post(A.EMPTY,         writeAuth, articleController.addNew)
    articleRouter.delete(A.EMPTY,       writeAuth, articleController.remove)

    return articleRouter
}

export default createArticleRouter