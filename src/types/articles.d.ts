import { z } from 'zod'
import { articleSchema, articleNameChangeSchema } from '../schemas/articles.ts'

export type allArticleType = z.infer<typeof articleSchema>

export type partialArticleType = Omit< 
    z.infer<typeof articleSchema>, 
    "isPublish" 
>

export type idType = Pick< 
    z.infer<typeof articleSchema>, 
    "id" 
>

export type idPostType = Pick< 
    z.infer<typeof articleSchema>, 
    "id" | "post" 
>

export type sectionType = Pick<
    z.infer<typeof articleSchema>, 
    "id" | "post" | "content" | "order"
>

export type publishStateType = Pick<
    z.infer<typeof articleSchema>, 
    "id" | "post" | "isPublish" 
>

export type articleNameChangeType = 
    idType & 
    z.infer<typeof articleNameChangeSchema>

    
export interface IArticle {
    getArticle({ id, post }: IdPostType): Promise<RowDataPacket[]>
    getAllArticles({ id }: IdType): Promise<RowDataPacket[]>
    createArticle({
        id,
        post,
        order,
        content,
        styles,
        isPublish,
    }: AllArticleType): Promise<RowDataPacket[]>
    updateArticle({
        id,
        post,
        order,
        content,
        styles,
    }: PartialArticleType): Promise<RowDataPacket[]>
    updateArticleName({
        id,
        oldName,
        newName,
    }: ArticleNameChangeType): Promise<RowDataPacket[]>
    updateArticlePublishState({
        id,
        post,
        isPublish,
    }: PublishStateType): Promise<RowDataPacket[]>
    deleteSection({
        id,
        post,
        content,
        order,
    }: SectionType): Promise<RowDataPacket[]>
    deleteArticle({ id, post }: IdPostType): Promise<RowDataPacket[]>
}