import { articleSchema } from '../schemas/articles'
import { type ArticleType } from '../types/articles'
import { type SafeParseReturnType } from 'zod'

export interface IArticlesValidation {
    id(data: unknown): SafeParseReturnType<unknown, ArticleType['id']>
    userId(data: unknown): SafeParseReturnType<unknown, ArticleType['userId']>
    idName(data: unknown): SafeParseReturnType<unknown, ArticleType['idName']>
    userIdName(data: unknown): SafeParseReturnType<unknown, ArticleType['userIdName']>
    idDescription(data: unknown): SafeParseReturnType<unknown, ArticleType['idDescription']>
    idPublishState(data: unknown): SafeParseReturnType<unknown, ArticleType['idPublishState']>
}

export class ArticlesValidation implements IArticlesValidation {
    private articleSchema: typeof articleSchema

    constructor() {
        this.articleSchema = articleSchema
    }

    id = (data: unknown) => this.articleSchema.id.safeParse(data)
    userId = (data: unknown) => this.articleSchema.userId.safeParse(data)
    idName = (data: unknown) => this.articleSchema.idName.safeParse(data)
    userIdName = (data: unknown) => this.articleSchema.userIdName.safeParse(data)
    idDescription = (data: unknown) => this.articleSchema.idDescription.safeParse(data)
    idPublishState = (data: unknown) => this.articleSchema.idPublishState.safeParse(data)
}