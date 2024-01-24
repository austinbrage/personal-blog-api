import { z } from 'zod'

const articleTableSchema = z.object({
    id: z.number({
        required_error: 'Article id is required',
        invalid_type_error: 'Article id must be a number'
    }),
    user_id: z.number({
        required_error: 'User id for article is required',
        invalid_type_error: 'User id for article must be a number'
    }),
    name: z.string({
        required_error: 'Article name is required',
        invalid_type_error: 'Article name must be a string'
    }),
    title: z.string({
        required_error: 'Article title is required',
        invalid_type_error: 'Article title must be a string'
    }),
    image: z.string({
        required_error: 'Article image URL is required',
        invalid_type_error: 'Article image URL must be a string'
    }),
    keywords: z.string({
        required_error: 'Article keywords is required',
        invalid_type_error: 'Article keywords must be a string'
    }),
    description: z.string({
        required_error: 'Article description is required',
        invalid_type_error: 'Article description must be a string'
    }),
    is_publish: z.boolean({
        required_error: 'Article publishment state is required',
        invalid_type_error: 'Article publishment state must be a boolean'
    }),
})

const id = articleTableSchema.pick({ id: true })
const userId = articleTableSchema.pick({ user_id: true })
const userIdName = articleTableSchema.pick({ user_id: true, name: true })
const userIdData = articleTableSchema.omit({ id: true, is_publish: true })
const idData = articleTableSchema.omit({ user_id: true, is_publish: true })
const idPublishState = articleTableSchema.pick({ id: true, is_publish: true })

export const articleSchema = {
    id,
    userId,
    idData,
    userIdName,
    userIdData,
    idPublishState,
}

const articleTablePaginationSchema = z.object({
    user_id: z.number({
        required_error: 'User id for article is required',
        invalid_type_error: 'User id for article must be a number'
    }),
    keywords: z.string({
        required_error: 'Article keywords array is required',
        invalid_type_error: 'Article keywords array must be include strings'
    }).array(),
    limit: z.number({
        required_error: 'Limit pagination is required',
        invalid_type_error: 'Limit pagination must be a number'
    }),
    offset: z.number({
        required_error: 'Offset pagination is required',
        invalid_type_error: 'Offset pagination must be a number'
    }),
})

const allData = articleTablePaginationSchema
const noUserId = articleTablePaginationSchema.omit({ user_id: true })

export const articlePaginationSchema = {
    noUserId,
    allData
}