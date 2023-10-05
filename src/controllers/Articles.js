const asyncErrorHandler = require('../utils/errorHandler')

class Articles {
    constructor({ articleModel }) {
        this.articleModel = articleModel
    }    

    getArticle = asyncErrorHandler(async (req, res, next) => {
        const { id, post } = req.query
        
        const article = await this.articleModel.getArticle({ id, post })

        res.status(200).json({
            status: 'success',
            data: {
                article
            } 
        })
    })
    
    getAllArticles = asyncErrorHandler(async (req, res, next) => {
        const { id } = req.query
        
        const article = await this.articleModel.getAllArticles({ id })

        res.status(200).json({
            status: 'success',
            data: {
                article
            } 
        })
    })

    createArticle = asyncErrorHandler(async (req, res, next) => {
        const { id, post, order, content, styles, isPublish } = req.body

        const result = await this.articleModel.createArticle({ 
            id, post, order, content, styles, isPublish 
        })

        res.status(201).json({
            status: 'success',
            result
        })
    })

    updateArticle = asyncErrorHandler(async (req, res, next) => {
        const { id, post, order, content, styles } = req.body

        const result = await this.articleModel.updateArticle({ id, post, order, content, styles })

        res.status(200).json({
            status: 'success',
            result
        })
    })
    
    updateArticleName = asyncErrorHandler(async (req, res, next) => {
        const { id, oldName, newName } = req.body

        const result = await this.articleModel.updateArticleName({ id, oldName, newName })

        res.status(200).json({
            status: 'success',
            result
        })
    })
    
    updateArticlePublishState = asyncErrorHandler(async (req, res, next) => {
        const { id, post, isPublish } = req.body

        const result = await this.articleModel.updateArticlePublishState({ id, post, isPublish })

        res.status(200).json({
            status: 'success',
            result
        })
    })

    deleteSection = asyncErrorHandler(async (req, res, next) => {
        const { id, post, content, order } = req.body

        const result = await this.articleModel.deleteSection({ id, post, content, order })

        res.status(200).json({
            status: 'success',
            result
        })
    })
    
    deleteArticle = asyncErrorHandler(async (req, res, next) => {
        const { id, post } = req.body

        const result = await this.articleModel.deleteArticle({ id, post })

        res.status(200).json({
            status: 'success',
            result
        })
    })
}

module.exports = Articles