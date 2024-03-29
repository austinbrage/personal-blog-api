import { AsyncFunction, asyncErrorHandler } from '../services/errorHandler'
import { ArticlesValidation, type IArticlesValidation } from '../validations/Articles'
import { createOkResponse, createErrorResponse } from '../helpers/appResponse'
import type { Request, Response } from 'express'
import { type ArticleController } from '../types/articles'
import { type IArticle } from '../types/articles'
import { type ZodError } from 'zod'

export class Articles implements ArticleController {
    private articleModel: IArticle
    private validateArticle: IArticlesValidation

    constructor({ articleModel }: { articleModel: IArticle }) {
        this.articleModel = articleModel
        this.validateArticle = new ArticlesValidation()
    }    

    private validationErr(res: Response, validationError: ZodError<unknown>) {
        return res.status(400).json(createErrorResponse({
            message: 'Validation data error',
            error: validationError.format()
        }))
    }

    getKeywords = asyncErrorHandler(async (_req, res: Response) => {
        const result = await this.articleModel.getKeywords()

        return res.status(200).json(createOkResponse({
            message: 'Articles keywords requested',
            data: result
        }))
    })

    getByKeywords = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { keywords, perPage, currentPage, user_id } = req.query
        if(typeof req.query?.keywords === 'string') req.query.keywords = [req.query.keywords]

        const validation = this.validateArticle.allDataPagination({ ...req.query, user_id: req.userId?.id })

        if(!validation.success) return this.validationErr(res, validation.error)

        const perPage = parseInt(validation.data.perPage, 10)
        const currentPage = parseInt(validation.data.currentPage, 10)
        
        if(isNaN(perPage)) {
            return res.status(400).json(createErrorResponse({
                message: 'Items per page can not be transform into a number'
            }))      
        }
        if(isNaN(currentPage)) {
            return res.status(400).json(createErrorResponse({
                message: 'Current page can not be transform into a number'
            }))      
        }

        const result = await this.articleModel.getByKeyword({
            ...validation.data, 
            limit:  perPage, 
            offset: perPage * (currentPage - 1) 
        })

        return res.status(200).json(createOkResponse({
            message: 'Articles from user requested in pages',
            data: result
        }))
    })

    getAllByKeywords = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { keywords, perPage, currentPage } = req.query
        if(typeof req.query?.keywords === 'string') req.query.keywords = [req.query.keywords]

        const validation = this.validateArticle.noUserIdPagination(req.query)

        if(!validation.success) return this.validationErr(res, validation.error)

        const perPage = parseInt(validation.data.perPage, 10)
        const currentPage = parseInt(validation.data.currentPage, 10)
        
        if(isNaN(perPage)) {
            return res.status(400).json(createErrorResponse({
                message: 'Items per page can not be transform into a number'
            }))      
        }
        if(isNaN(currentPage)) {
            return res.status(400).json(createErrorResponse({
                message: 'Current page can not be transform into a number'
            }))      
        }

        const result = await this.articleModel.getAllByKeyword({
            ...validation.data, 
            limit:  perPage, 
            offset: perPage * (currentPage - 1) 
        })

        return res.status(200).json(createOkResponse({
            message: 'Filtered articles requested',
            data: result
        }))
    })

    getEverything = asyncErrorHandler(async (req, res: Response) => {
        // const { perPage, currentPage } = req.query
        const validation = this.validateArticle.paginationValues(req.query)

        if(!validation.success) return this.validationErr(res, validation.error)

        const perPage = parseInt(validation.data.perPage, 10)
        const currentPage = parseInt(validation.data.currentPage, 10)
        
        if(isNaN(perPage)) {
            return res.status(400).json(createErrorResponse({
                message: 'Items per page can not be transform into a number'
            }))      
        }
        if(isNaN(currentPage)) {
            return res.status(400).json(createErrorResponse({
                message: 'Current page can not be transform into a number'
            }))      
        }

        const result = await this.articleModel.getEverything({ 
            limit:  perPage, 
            offset: perPage * (currentPage - 1) 
        })

        return res.status(200).json(createOkResponse({
            message: 'All articles stored requested',
            data: result
        }))
    })

    getAll = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id } = req.query
        const validation = this.validateArticle.userId({ user_id: req.userId?.id })

        if(!validation.success) return this.validationErr(res, validation.error)
        
        const result = await this.articleModel.getAll(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Articles from user requested',
            data: result
        }))
    })

    changeData = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id, name, title, image, keywords, description } = req.body
        const validation = this.validateArticle.idData(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        await this.articleModel.changeData(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Article info changed successfully'
        }))
    })
    
    changePublishState = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id, is_publish } = req.body
        const validation = this.validateArticle.idPublishState(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        await this.articleModel.changePublishState(validation.data)
        
        return res.status(200).json(createOkResponse({
            message: 'Article publish state changed successfully'
        }))
    })

    addNew = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { user_id, name, title, image, keywords, description } = req.body
        const validation = this.validateArticle.userIdData({ ...req.body, user_id: req.userId?.id })

        if(!validation.success) return this.validationErr(res, validation.error)

        const result = await this.articleModel.getId(validation.data)
        
        if(result.length !== 0) {
            return res.status(401).json(createErrorResponse({
                message: 'Existing article name'
            }))
        }

        const newArticleInfo = await this.articleModel.addNew(validation.data)
        
        return res.status(201).json(createOkResponse({
            message: 'New article created successfully',
            data: [newArticleInfo]
        }))
    })

    remove = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id } = req.body
        const validation = this.validateArticle.id(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        await this.articleModel.remove(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Article removed successfully'
        }))
    })
}