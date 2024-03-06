import { z } from 'zod'
import { sectionSchema } from '../schemas/sections'
import { type AsyncFunction } from '../services/errorHandler'
import { type RowDataPacket, type ResultSetHeader } from 'mysql2'

export type SectionType = {
    id: z.infer<typeof sectionSchema.id>
    idData: z.infer<typeof sectionSchema.idData>
    noIdData: z.infer<typeof sectionSchema.noIdData>
    articleId: z.infer<typeof sectionSchema.articleId>
    idContent: z.infer<typeof sectionSchema.idContent>
    articleIdData: z.infer<typeof sectionSchema.articleIdData>
    articleIdDatas: z.infer<typeof sectionSchema.articleIdDatas>
    articleIdQuery: z.infer<typeof sectionSchema.articleIdQuery>
    articleIdContent: z.infer<typeof sectionSchema.articleIdContent>
    templateData: z.infer<typeof sectionSchema.templateData>
}

export interface ISection {
    getAll({ article_id }: SectionType['articleId']): Promise<RowDataPacket[]>
    getLastSequence({ article_id }: SectionType['articleId']): Promise<RowDataPacket[]>
    changeContent({ id, content, content_type, image_url }: SectionType['idContent']): Promise<ResultSetHeader>
    addNew({ article_id, content, content_type, image_url, sequence }: SectionType['articleIdContent']): Promise<ResultSetHeader>
    remove({ id }: SectionType['id']): Promise<ResultSetHeader>
}

export interface SectionController {
    getAll: AsyncFunction
    changeAll: AsyncFunction
    addNew: AsyncFunction
    addMultiple: AsyncFunction
    addTemplate: AsyncFunction
    remove: AsyncFunction
}

export enum SectionRoutes {
    EMPTY = '/',
    MULTIPLE = '/multiple',
    TEMPLATE = '/template'
}