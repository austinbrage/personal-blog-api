import { z } from 'zod'
import { sectionSchema } from '../schemas/sections'
import { type RowDataPacket } from 'mysql2'
import { type AsyncFuntion } from '../utils/errorHandler'

export type SectionType = {
    id: z.infer<typeof sectionSchema.id>
    articleId: z.infer<typeof sectionSchema.articleId>
    idContent: z.infer<typeof sectionSchema.idContent>
    articleIdContent: z.infer<typeof sectionSchema.articleIdContent>
}
