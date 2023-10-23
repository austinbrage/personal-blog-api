import { z } from 'zod'
import { articleSchema } from '../schemas/articles'
import { type RowDataPacket } from 'mysql2'
import { type AsyncFuntion } from '../services/errorHandler'

export type ArticleType = {
    id: z.infer<typeof articleSchema.id>
    userId: z.infer<typeof articleSchema.userId>
    idName: z.infer<typeof articleSchema.idName>
    userIdName: z.infer<typeof articleSchema.userIdName>
    idDescription: z.infer<typeof articleSchema.idDescription>
    idPublishState: z.infer<typeof articleSchema.idPublishState>
}

export interface IArticle {
    getAll({ user_id }: ArticleType['userId']): Promise<RowDataPacket[]>
    getId({ user_id, name }: ArticleType['userIdName']): Promise<RowDataPacket[]>
    changeName({ id, name }: ArticleType['idName']): Promise<RowDataPacket[]>
    changeDescription({ id, description }: ArticleType['idDescription']): Promise<RowDataPacket[]>
    changePublishState({ id, is_publish }: ArticleType['idPublishState']): Promise<RowDataPacket[]>
    addNew({ user_id, name }: ArticleType['userIdName']): Promise<RowDataPacket[]>
    remove({ id }: ArticleType['id']): Promise<RowDataPacket[]>
}

export interface ArticleController {
    getAll: AsyncFuntion
    changeName: AsyncFuntion
    changeDescription: AsyncFuntion
    changePublishState: AsyncFuntion
    addNew: AsyncFuntion
    remove: AsyncFuntion
}