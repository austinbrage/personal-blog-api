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
}

module.exports = Articles