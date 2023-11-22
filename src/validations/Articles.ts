import { articleSchema } from '../schemas/articles'
import { type ArticleType } from '../types/articles'
import { type SafeParseReturnType } from 'zod'

export interface IArticlesValidation {
    id(data: unknown): SafeParseReturnType<unknown, ArticleType['id']>
    idData(data: unknown): SafeParseReturnType<unknown, ArticleType['idData']>
    userId(data: unknown): SafeParseReturnType<unknown, ArticleType['userId']>
    userIdName(data: unknown): SafeParseReturnType<unknown, ArticleType['userIdName']>
    userIdData(data: unknown): SafeParseReturnType<unknown, ArticleType['userIdData']>
    idPublishState(data: unknown): SafeParseReturnType<unknown, ArticleType['idPublishState']>
}

export class ArticlesValidation implements IArticlesValidation {
    private articleSchema: typeof articleSchema

    constructor() {
        this.articleSchema = articleSchema
    }

    id = (data: unknown) => this.articleSchema.id.safeParse(data)
    idData = (data: unknown) => this.articleSchema.idData.safeParse(data)
    userId = (data: unknown) => this.articleSchema.userId.safeParse(data)
    userIdName = (data: unknown) => this.articleSchema.userIdName.safeParse(data)
    userIdData = (data: unknown) => this.articleSchema.userIdData.safeParse(data)
    idPublishState = (data: unknown) => this.articleSchema.idPublishState.safeParse(data)
}