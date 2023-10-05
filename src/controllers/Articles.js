const asyncErrorHandler = require('../utils/errorHandler')

class Articles {
    constructor({ articleModel }) {
        this.articleModel = articleModel
    }    

    getArticle = asyncErrorHandler(async (req, res, next) => {
        const { name, post } = req.query
        
        const article = await this.articleModel.getArticle({ name, post })

        res.status(200).json({
            status: 'success',
            data: {
                article
            } 
        })
    })
    
    getAllArticles = asyncErrorHandler(async (req, res, next) => {
        const { name } = req.query
        
        const article = await this.articleModel.getAllArticles({ name })

        res.status(200).json({
            status: 'success',
            data: {
                article
            } 
        })
    })

    createArticle = asyncErrorHandler(async (req, res, next) => {
        const { name, post, order, content, styles, state } = req.body

        const result = await this.articleModel.createArticle({ name, post, order, content, styles, state })

        res.status(201).json({
            status: 'success',
            result
        })
    })

    updateArticle = asyncErrorHandler(async (req, res, next) => {
        const { name, post, order, content, styles } = req.body

        const result = await this.articleModel.updateArticle({ name, post, order, content, styles })

        res.status(200).json({
            status: 'success',
            result
        })
    })
    
    updateArticleName = asyncErrorHandler(async (req, res, next) => {
        const { name, oldName, newName } = req.body

        const result = await this.articleModel.updateArticleName({ name, oldName, newName })

        res.status(200).json({
            status: 'success',
            result
        })
    })
    
    updateArticleState = asyncErrorHandler(async (req, res, next) => {
        const { name, post, state } = req.body

        const result = await this.articleModel.updateArticleState({ name, post, state })

        res.status(200).json({
            status: 'success',
            result
        })
    })

    deleteSection = asyncErrorHandler(async (req, res, next) => {
        const { name, post, content, order } = req.body

        const result = await this.articleModel.deleteSection({ name, post, content, order })

        res.status(200).json({
            status: 'success',
            result
        })
    })
    
    deleteArticle = asyncErrorHandler(async (req, res, next) => {
        const { name, post } = req.body

        const result = await this.articleModel.deleteArticle({ name, post })

        res.status(200).json({
            status: 'success',
            result
        })
    })
}

module.exports = Articles