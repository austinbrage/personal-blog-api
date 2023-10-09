import { z } from 'zod'
import { articleSchema } from '../schemas/articles'
import { type RowDataPacket } from 'mysql2'
import { type AsyncFuntion } from '../utils/errorHandler'

export type ArticleType = {
    id: z.infer<typeof articleSchema.id>
    userId: z.infer<typeof articleSchema.userId>
    idName: z.infer<typeof articleSchema.idName>
    userIdName: z.infer<typeof articleSchema.userIdName>
    idPublishState: z.infer<typeof articleSchema.idPublishState>
}

export interface IArticle {
    getAll({ id }: ArticleType['id']): Promise<RowDataPacket[]>
    addNew({ user_id, name }: ArticleType['userIdName']): Promise<RowDataPacket[]>
    changeName({ id, name }: ArticleType['idName']): Promise<RowDataPacket[]>
    changePublishState({ id, is_publish }: ArticleType['idPublishState']): Promise<RowDataPacket[]>
    remove({ id }: ArticleType['id']): Promise<RowDataPacket[]>
}

export interface ArticleController {
    getAll: AsyncFuntion
    addNew: AsyncFuntion
    changeName: AsyncFuntion
    changePublishState: AsyncFuntion
    remove: AsyncFuntion
}

// export interface IArticle {
//     getArticle({ id, post }: IdPostType): Promise<RowDataPacket[]>
//     getAllArticles({ id }: IdType): Promise<RowDataPacket[]>
//     createArticle({
//         id,
//         post,
//         order,
//         content,
//         styles,
//         isPublish,
//     }: AllArticleType): Promise<RowDataPacket[]>
//     updateArticle({
//         id,
//         post,
//         order,
//         content,
//         styles,
//     }: PartialArticleType): Promise<RowDataPacket[]>
//     updateArticleName({
//         id,
//         oldName,
//         newName,
//     }: ArticleNameChangeType): Promise<RowDataPacket[]>
//     updateArticlePublishState({
//         id,
//         post,
//         isPublish,
//     }: PublishStateType): Promise<RowDataPacket[]>
//     deleteSection({
//         id,
//         post,
//         content,
//         order,
//     }: SectionType): Promise<RowDataPacket[]>
//     deleteArticle({ id, post }: IdPostType): Promise<RowDataPacket[]>
// }