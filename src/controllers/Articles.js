const asyncErrorHandler = require('../utils/errorHandler')
const articleValidation = require('../validations/articles')

class Articles {
    constructor({ articleModel }) {
        this.articleModel = articleModel
        this.validateArticle = new articleValidation()
    }    

    getArticle = asyncErrorHandler(async (req, res, next) => {
        // const { id, post } = req.query
        const validation = this.validateArticle.idPost(req.query)

        if(validation.success) {
            const article = await this.articleModel.getArticle(validation.data)
    
            res.status(200).json({
                status: 'success',
                data: {
                    article
                } 
            })
        } else {
            res.status(400).json({
                status: 'error',
                validationError: JSON.parse(validation.error)
            })
        }
    })
    
    getAllArticles = asyncErrorHandler(async (req, res, next) => {
        // const { id } = req.query
        const validation = this.validateArticle.id(req.query)

        if(validation.success) {
            const article = await this.articleModel.getAllArticles(validation.data)
    
            res.status(200).json({
                status: 'success',
                data: {
                    article
                } 
            })
        } else {
            res.status(400).json({
                status: 'error',
                validationError: JSON.parse(validation.error)
            })
        }
    })

    createArticle = asyncErrorHandler(async (req, res, next) => {
        // const { id, post, order, content, styles, isPublish } = req.body
        const validation = this.validateArticle.all(req.body)

        if(validation.success) {
            const result = await this.articleModel.createArticle(validation.data)
    
            res.status(201).json({
                status: 'success',
                result
            })
        } else {
            res.status(400).json({
                status: 'error',
                validationError: JSON.parse(validation.error)
            })
        }
    })

    updateArticle = asyncErrorHandler(async (req, res, next) => {
        // const { id, post, order, content, styles } = req.body
        const validation = this.validateArticle.partial(req.body)

        if(validation.success) {
            const result = await this.articleModel.updateArticle(validation.data)

            res.status(200).json({
                status: 'success',
                result
            })
        } else {
            res.status(400).json({
                status: 'error',
                validationError: JSON.parse(validation.error)
            })
        }
    })
    
    updateArticleName = asyncErrorHandler(async (req, res, next) => {
        // const { id, oldName, newName } = req.body
        const validation = this.validateArticle.nameChange(req.body)

        if(validation.success) {
            const result = await this.articleModel.updateArticleName(validation.data)
    
            res.status(200).json({
                status: 'success',
                result
            })
        } else {
            res.status(400).json({
                status: 'error',
                validationError: validation.error
            })
        }
    })
    
    updateArticlePublishState = asyncErrorHandler(async (req, res, next) => {
        // const { id, post, isPublish } = req.body
        const validation = this.validateArticle.publishState(req.body)

        if(validation.success) {
            const result = await this.articleModel.updateArticlePublishState(validation.data)
    
            res.status(200).json({
                status: 'success',
                result
            })
        } else {
            res.status(400).json({
                status: 'error',
                validationError: JSON.parse(validation.error)
            })
        }
    })

    deleteSection = asyncErrorHandler(async (req, res, next) => {
        // const { id, post, content, order } = req.body
        const validation = this.validateArticle.section(req.body)

        if(validation.success) {
            const result = await this.articleModel.deleteSection(validation.data)

            res.status(200).json({
                status: 'success',
                result
            })
        } else {
            res.status(400).json({
                status: 'error',
                validationError: JSON.parse(validation.error)
            })
        }
    })
    
    deleteArticle = asyncErrorHandler(async (req, res, next) => {
        // const { id, post } = req.body
        const validation = this.validateArticle.idPost(req.body)

        if(validation.success) {
            const result = await this.articleModel.deleteArticle(validation.data)
    
            res.status(200).json({
                status: 'success',
                result
            })
        } else {
            res.status(400).json({
                status: 'error',
                validationError: validation.error
            })
        }
    })
}

module.exports = Articles