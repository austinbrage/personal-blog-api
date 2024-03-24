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
    idSequence: z.infer<typeof sectionSchema.idSequence>
    idDataNoIMG: z.infer<typeof sectionSchema.idDataNoIMG>
    idSequenceData: z.infer<typeof sectionSchema.idSequenceData>
    articleIdData: z.infer<typeof sectionSchema.articleIdData>
    articleIdDatas: z.infer<typeof sectionSchema.articleIdDatas>
    articleIdQuery: z.infer<typeof sectionSchema.articleIdQuery>
    articleIdContent: z.infer<typeof sectionSchema.articleIdContent>
    articleIdDataNoSQC: z.infer<typeof sectionSchema.articleIdDataNoSQC>
    templateData: z.infer<typeof sectionSchema.templateData>
}

export interface ISection {
    getAll({ article_id }: SectionType['articleId']): Promise<RowDataPacket[]>
    getImage({ id }: SectionType['id']): Promise<RowDataPacket[]>
    getLastSequence({ article_id }: SectionType['articleId']): Promise<RowDataPacket[]>
    changeSequence({ id, sequence }: SectionType['idSequence']): Promise<ResultSetHeader>
    changeContent({ id, content, content_type, image }: SectionType['idContent']): Promise<ResultSetHeader>
    addNew({ article_id, content, content_type, image, sequence }: SectionType['articleIdContent']): Promise<ResultSetHeader>
    remove({ id }: SectionType['id']): Promise<ResultSetHeader>
}

export interface SectionController {
    getAll: AsyncFunction
    changeAll: AsyncFunction
    changeAllWithS3: AsyncFunction
    changeSequence: AsyncFunction
    addNew: AsyncFunction
    addNewWithS3: AsyncFunction
    addMultiple: AsyncFunction
    addTemplate: AsyncFunction
    remove: AsyncFunction
}

export enum SectionRoutes {
    EMPTY = '/',
    DATAS3 = '/s3',
    SEQUENCE = '/sequence',
    MULTIPLE = '/multiple',
    TEMPLATE = '/template'
}