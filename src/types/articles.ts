import { z } from 'zod'
import { articleSchema } from '../schemas/articles'
import { type RowDataPacket } from 'mysql2'
import { type AsyncFunction } from '../services/errorHandler'

export type ArticleType = {
    id: z.infer<typeof articleSchema.id>
    idData: z.infer<typeof articleSchema.idData>
    userId: z.infer<typeof articleSchema.userId>
    userIdName: z.infer<typeof articleSchema.userIdName>
    userIdData: z.infer<typeof articleSchema.userIdData>
    idPublishState: z.infer<typeof articleSchema.idPublishState>
}

export interface IArticle {
    getKeywords(): Promise<RowDataPacket[]>
    getAll({ user_id }: ArticleType['userId']): Promise<RowDataPacket[]>
    getId({ user_id, name }: ArticleType['userIdName']): Promise<RowDataPacket[]>
    changePublishState({ id, is_publish }: ArticleType['idPublishState']): Promise<RowDataPacket[]>
    changeData({ id, name, title, image, keywords, description }: ArticleType['idData']): Promise<RowDataPacket[]>
    addNew({ user_id, name, title, image, keywords, description }: ArticleType['userIdData']): Promise<RowDataPacket[]>
    remove({ id }: ArticleType['id']): Promise<RowDataPacket[]>
}

export interface ArticleController {
    getKeywords: AsyncFunction
    getAll: AsyncFunction
    changeData: AsyncFunction
    changePublishState: AsyncFunction
    addNew: AsyncFunction
    remove: AsyncFunction
}