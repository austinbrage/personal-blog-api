import { articleSchema, articlePaginationSchema } from '../schemas/articles'
import { type ArticleType } from '../types/articles'
import { SafeParseSuccess, type SafeParseReturnType } from 'zod'

export interface IArticlesValidation {
    id(data: unknown): SafeParseReturnType<unknown, ArticleType['id']>
    idData(data: unknown): SafeParseReturnType<unknown, ArticleType['idData']>
    userId(data: unknown): SafeParseReturnType<unknown, ArticleType['userId']>
    userIdName(data: unknown): SafeParseReturnType<unknown, ArticleType['userIdName']>
    userIdData(data: unknown): SafeParseReturnType<unknown, ArticleType['userIdData']>
    idPublishState(data: unknown): SafeParseReturnType<unknown, ArticleType['idPublishState']>
    allDataPagination(data: unknown): SafeParseReturnType<unknown, ArticleType['allDataPageQuery']>
    noUserIdPagination(data: unknown): SafeParseReturnType<unknown, ArticleType['noUserIdPageQuery']>
    limitOffsetPagination(data: unknown): SafeParseReturnType<unknown, ArticleType['limitOffsetPageQuery']>
}

export class ArticlesValidation implements IArticlesValidation {
    private articleSchema: typeof articleSchema
    private articlePaginationSchema: typeof articlePaginationSchema

    constructor() {
        this.articleSchema = articleSchema
        this.articlePaginationSchema = articlePaginationSchema
    }

    id = (data: unknown) => this.articleSchema.id.safeParse(data)
    idData = (data: unknown) => this.articleSchema.idData.safeParse(data)
    userId = (data: unknown) => this.articleSchema.userId.safeParse(data)
    userIdName = (data: unknown) => this.articleSchema.userIdName.safeParse(data)
    userIdData = (data: unknown) => this.articleSchema.userIdData.safeParse(data)
    idPublishState = (data: unknown) => this.articleSchema.idPublishState.safeParse(data)
    allDataPagination = (data: unknown) => this.articlePaginationSchema.allDataQuery.safeParse(data)
    noUserIdPagination = (data: unknown) => this.articlePaginationSchema.noUserIdQuery.safeParse(data)
    limitOffsetPagination = (data: unknown) => this.articlePaginationSchema.limitOffsetQuery.safeParse(data)
}