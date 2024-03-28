import { v4 as uuidv4 } from 'uuid'
import { s3, bucketName } from '../services/bucket'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { loadJSON } from "../utils/templates"
import { SIGNED_URL_EXPIRE } from '../utils/config'
import { AsyncFunction, asyncErrorHandler } from "../services/errorHandler"
import { SectionValidation, type ISectionsValidation } from "../validations/Sections"
import { createOkResponse, createErrorResponse } from "../helpers/appResponse"
import type { Request, Response } from 'express'
import { SectionType, type SectionController } from "../types/sections"
import { type ISection } from "../types/sections"
import { type IStyle } from "../types/styles"
import { type RowDataPacket } from "mysql2"
import { type ZodError } from "zod"

type ModelsType = {
    styleModel: IStyle
    sectionModel: ISection
}

export class Sections implements SectionController {
    private loadJSON
    private styleModel: IStyle
    private sectionModel: ISection
    private validateSection: ISectionsValidation

    constructor({ sectionModel, styleModel }: ModelsType) {
        this.loadJSON = loadJSON
        this.styleModel = styleModel
        this.sectionModel = sectionModel
        this.validateSection = new SectionValidation()
    }

    private validationErr(res: Response, validationError: ZodError<unknown>) {
        return res.status(400).json(createErrorResponse({
            message: 'Validation data error',
            error: validationError.format()
        }))
    }

    private async uploadImage(imageName: string, imageFile: Express.Multer.File) {
        const command = new PutObjectCommand({
            Key: imageName,
            Bucket: bucketName,
            Body: imageFile.buffer,
            ContentType: imageFile.mimetype
        })

        await s3.send(command)
    }

    private async removeImage(imageName: string) {
        const command = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: imageName
        })

        await s3.send(command)
    }

    private async readImage(imageName: string) {
        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: imageName
        })

        return await getSignedUrl(s3, command, { expiresIn: +SIGNED_URL_EXPIRE })
    }

    getSignedUrl = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { image } = req.query
        const validation = this.validateSection.image(req.query)

        if(!validation.success) return this.validationErr(res, validation.error)

        if(!validation.data.image) return res.status(400).json(createErrorResponse({
            message: 'Validation data error, image value cannot be null'
        }))

        const result = await this.readImage(validation.data.image)

        return res.status(200).json(createOkResponse({
            message: 'Article image url requested',
            data: [{ imageSignedUrl: result }] as RowDataPacket[]
        }))
    })

    getAll = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { article_id_query } = req.query 
        const validation = this.validateSection.articleIdQuery(req.query)
        
        if(!validation.success) return this.validationErr(res, validation.error)

        const article_id = parseInt(validation.data.article_id_query, 10)
        
        if(isNaN(article_id)) {
            return res.status(400).json(createErrorResponse({
                message: 'Article Id can not be transform into a number'
            }))      
        }

        const result = await this.sectionModel.getAll({ article_id: article_id })

        for (let i = 0; i < result.length; i++) {
            if (result[i]?.content_type === 'image_s3' && result[i]?.image) {
                const imageURL = await this.readImage(result[i].image)
                result[i].image = imageURL
            }
        }        

        return res.status(200).json(createOkResponse({
            message: 'Sections from article requested',
            data: result
        }))
    })

    changeAll = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id, content, content_type, image, width, height, font_size, font_weight, font_family, line_height, margin_top, text_align`, text_color, border_radius } = req.body
        const validation = this.validateSection.idData(req.body) 

        if(!validation.success) return this.validationErr(res, validation.error)

        const sectionData = await this.sectionModel.getImage({ id: validation.data.id })

        const currentType = validation.data.content_type
        const wasImageS3 = sectionData[0]?.content_type === 'image_s3' && currentType !== 'image_s3'
        const imageName = sectionData[0]?.image

        if(wasImageS3 && imageName) await this.removeImage(imageName)

        await this.sectionModel.changeContent({
            ...validation.data,
            image: currentType === 'image_s3' ? imageName : validation.data.image
        })

        await this.styleModel.changeStyles({
            ...validation.data,
            section_id: validation.data.id
        })

        return res.status(200).json(createOkResponse({
            message: 'Section content and styles changed successfully'
        }))
    })

    changeAllWithS3 = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id, content, width, height, font_size, font_weight, font_family, line_height, margin_top, text_align`, text_color, border_radius } = req.body
        const id = +req.body?.id ?? ''
        const validation = this.validateSection.idDataNoIMG({ ...req.body, id }) 

        if(!validation.success) return this.validationErr(res, validation.error)

        const sectionData = await this.sectionModel.getImage({ id: validation.data.id })

        const newImageName = 'sectionImg: ' + uuidv4()
        const isImageS3 = sectionData[0]?.content_type === 'image_s3'
        const imageName = sectionData[0]?.image ?? newImageName

        if(isImageS3) {
            await this.uploadImage(imageName, req.file as Express.Multer.File)

            await this.sectionModel.changeContent({
                ...validation.data,
                image: imageName,
                content_type: 'image_s3'
            })
        } else {
            await this.uploadImage(newImageName, req.file as Express.Multer.File)

            await this.sectionModel.changeContent({
                ...validation.data,
                image: newImageName,
                content_type: 'image_s3'
            })
        }

        await this.styleModel.changeStyles({
            ...validation.data,
            section_id: validation.data.id
        })

        return res.status(200).json(createOkResponse({
            message: 'Section content and styles changed successfully'
        }))
    })

    changeSequence = asyncErrorHandler(async (req: Request, res: Response) => {
        // const [{ id, sequence }] = req.body
        const validation = this.validateSection.idSequenceData(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        const changeData = async (item: SectionType['idSequence']) => {
            await this.sectionModel.changeSequence(item)
        }

        await validation.data.reduce((acc, curr) => acc.then(() => {
            return changeData(curr)
        }), Promise.resolve())

        return res.status(200).json(createOkResponse({
            message: 'Section sequences changed successfully'
        }))
    })

    addNew = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { article_id, content, content_type, image, width, height, font_size, font_weight, font_family, line_height, margin_top, text_align`, text_color, border_radius } = req.body
        const validation = this.validateSection.articleIdDataNoSQC(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        const resultSequence = await this.sectionModel.getLastSequence({ 
            article_id: validation.data.article_id 
        })

        const result = await this.sectionModel.addNew({
            ...validation.data,
            sequence: resultSequence[0]?.sequence + 1 ?? 1
        })

        await this.styleModel.addNew({
            ...validation.data,
            section_id: result.insertId
        })

        return res.status(201).json(createOkResponse({
            message: 'New section content and styles created successfully'
        }))
    })

    addNewWithS3 = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { article_id, content, width, height, font_size, font_weight, font_family, line_height, margin_top, text_align`, text_color, border_radius } = req.body
        const article_id = +req.body?.article_id ?? ''
        const validation = this.validateSection.articleIdDataNoIMG({ ...req.body, article_id })

        if(!validation.success) return this.validationErr(res, validation.error)

        const newImageName = 'sectionImg: ' + uuidv4()
        await this.uploadImage(newImageName, req.file as Express.Multer.File)

        const resultSequence = await this.sectionModel.getLastSequence({ 
            article_id: validation.data.article_id 
        })

        const result = await this.sectionModel.addNew({
            ...validation.data,
            image: newImageName,
            content_type: 'image_s3',
            sequence: resultSequence[0]?.sequence + 1 ?? 1
        })

        await this.styleModel.addNew({
            ...validation.data,
            section_id: result.insertId
        })

        return res.status(201).json(createOkResponse({
            message: 'New section content and styles created successfully'
        }))
    })

    addMultiple = asyncErrorHandler(async (req: Request, res: Response) => {
        // const [{ article_id, content, content_type, image, width, height, font_size, font_weight, font_family, line_height, margin_top, text_align`, text_color, border_radius }] = req.body
        const validation = this.validateSection.articleIdDatas(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        if(validation.data.length > 5) return res.status(400).json(createErrorResponse({
            message: 'Not allowed to add more than 5 sections at once'
        }))      

        const insertData = async (item: Omit<SectionType['articleIdData'], "article_id">) => {
            const result = await this.sectionModel.addNew({
                ...item,
                article_id: validation.data[0].article_id,
            })

            await this.styleModel.addNew({
                ...item,
                section_id: result.insertId
            })
        }       
        
        await validation.data.reduce((acc, curr) => acc.then(() => {
            return insertData(curr)
        }), Promise.resolve())

        return res.status(201).json(createOkResponse({
            message: 'New multiple sections created successfully'
        }))
    })
    
    addTemplate = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { article_id, template_option } = req.body
        const validation = this.validateSection.templateData(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)
        
        const insertData = async (item: Omit<SectionType['articleIdData'], "article_id">) => {
            const result = await this.sectionModel.addNew({
                ...item,
                article_id: validation.data.article_id,
            })

            await this.styleModel.addNew({
                ...item,
                section_id: result.insertId
            })
        }

        const templateJSON = await this.loadJSON(validation.data.template_option)
        const validationJSON = this.validateSection.noIdData(templateJSON)

        if(!validationJSON.success) return this.validationErr(res, validationJSON.error)
 
        await validationJSON.data.reduce((acc, curr) => acc.then(() => {
            return insertData(curr)
        }), Promise.resolve())

        return res.status(201).json(createOkResponse({
            message: 'New template of sections created successfully'
        }))
    })

    removeS3 = asyncErrorHandler(async (req: Request, res: Response) => {
        // const [{ image }] = req.body
        const validation = this.validateSection.imageSet(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        await validation.data.reduce((acc, curr) => acc.then(() => {
            if(!curr.image) return Promise.resolve()
            return this.removeImage(curr.image)
        }), Promise.resolve())

        return res.status(200).json(createOkResponse({
            message: 'Section images removed from bucket successfully'
        }))
    })

    remove = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id } = req.body
        const validation = this.validateSection.id(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        const sectionData = await this.sectionModel.getImage({ id: validation.data.id })

        const isImageS3 = sectionData[0]?.content_type === 'image_s3'
        const imageName = sectionData[0]?.image

        if(isImageS3 && imageName) await this.removeImage(imageName)

        await this.sectionModel.remove(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Section content and styles removed successfully'
        }))
    })
}