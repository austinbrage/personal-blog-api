import { z } from 'zod'
import { articleSchema, articlePaginationSchema } from '../schemas/articles'
import { type AsyncFunction } from '../services/errorHandler'
import { type RowDataPacket, type ResultSetHeader } from 'mysql2'

export type ArticleType = {
    id: z.infer<typeof articleSchema.id>
    idData: z.infer<typeof articleSchema.idData>
    userId: z.infer<typeof articleSchema.userId>
    userIdName: z.infer<typeof articleSchema.userIdName>
    userIdData: z.infer<typeof articleSchema.userIdData>
    idDataNoType: z.infer<typeof articleSchema.idDataNoType>
    idDataNoImage: z.infer<typeof articleSchema.idDataNoImage>
    idPublishState: z.infer<typeof articleSchema.idPublishState>
    userIdDataNoType: z.infer<typeof articleSchema.userIdDataNoType>
    userIdDataNoImage: z.infer<typeof articleSchema.userIdDataNoImage>

    allDataPage: z.infer<typeof articlePaginationSchema.allData>
    pageValues: z.infer<typeof articlePaginationSchema.pageValues>
    noUserIdPage: z.infer<typeof articlePaginationSchema.noUserId>
    limitOffsetPage: z.infer<typeof articlePaginationSchema.limitOffset>
    allDataPageQuery: z.infer<typeof articlePaginationSchema.allDataQuery>
    noUserIdPageQuery: z.infer<typeof articlePaginationSchema.noUserIdQuery>
}

export interface IArticle {
    getKeywords(): Promise<RowDataPacket[]>
    getImageById({ id }: ArticleType['id']): Promise<RowDataPacket[]>
    getAll({ user_id }: ArticleType['userId']): Promise<RowDataPacket[]>
    getId({ user_id, name }: ArticleType['userIdName']): Promise<RowDataPacket[]>
    getAllByKeyword({ keywords, limit, offset }: ArticleType['noUserIdPage']): Promise<RowDataPacket[]>
    getByKeyword({ keywords, limit, offset, user_id }: ArticleType['allDataPage']): Promise<RowDataPacket[]>
    getEverything({ limit, offset }: ArticleType['limitOffsetPage']): Promise<RowDataPacket[]>
    changePublishState({ id, is_publish }: ArticleType['idPublishState']): Promise<ResultSetHeader>
    changeData({ id, name, title, image, image_type, keywords, description }: ArticleType['idData']): Promise<ResultSetHeader>
    addNew({ user_id, name, title, image, image_type, keywords, description }: ArticleType['userIdData']): Promise<ResultSetHeader>
    remove({ id }: ArticleType['id']): Promise<ResultSetHeader>
}

export interface ArticleController {
    getKeywords: AsyncFunction
    getEverything: AsyncFunction
    getByKeywords: AsyncFunction
    getAllByKeywords: AsyncFunction
    getAll: AsyncFunction
    changeData: AsyncFunction
    changeDataWithS3: AsyncFunction
    changePublishState: AsyncFunction
    addNewWithS3: AsyncFunction
    addNew: AsyncFunction
    remove: AsyncFunction
}

export enum ArticleRoutes {
    KEYWORDS = '/keywords',
    DALL = '/data/all',
    DKEYWORDS = '/data/keywords',
    DUKEYWORDS = '/data/user/keywords',
    PUBLISHMENT = '/publishment',
    DATA = '/data',
    DATAS3 = '/data/s3',
    EMPTY = '/',
}