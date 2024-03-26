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
        required_error: 'Article image URL / NAME is required',
        invalid_type_error: 'Article image URL / NAME must be a string'
    }),
    image_type: z.string({
        required_error: 'Article image type is required',
        invalid_type_error: 'Article image type must be a string'
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
const image = articleTableSchema.pick({ image: true })
const userId = articleTableSchema.pick({ user_id: true })
const imageSet = articleTableSchema.pick({ image: true }).array()
const userIdName = articleTableSchema.pick({ user_id: true, name: true })
const userIdData = articleTableSchema.omit({ id: true, is_publish: true })
const idData = articleTableSchema.omit({ user_id: true, is_publish: true })
const userIdDataNoType = articleTableSchema.omit({ id: true, is_publish: true, image_type: true })
const idDataNoType = articleTableSchema.omit({ user_id: true, is_publish: true, image_type: true })
const userIdDataNoImage = articleTableSchema.omit({ id: true, is_publish: true, image: true, image_type: true })
const idDataNoImage = articleTableSchema.omit({ user_id: true, is_publish: true, image: true, image_type: true })
const idPublishState = articleTableSchema.pick({ id: true, is_publish: true })

export const articleSchema = {
    id,
    image,
    userId,
    idData,
    imageSet,
    userIdName,
    userIdData,
    idDataNoType,
    idDataNoImage,
    idPublishState,
    userIdDataNoType,
    userIdDataNoImage
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
    perPage: z.string({
        required_error: 'Items per page is required',
        invalid_type_error: 'Items per page must be a string'
    }),
    currentPage: z.string({
        required_error: 'Current page is required',
        invalid_type_error: 'Current page must be a string'
    })
})

const allData = articleTablePaginationSchema.omit({ perPage: true, currentPage: true })
const noUserId = articleTablePaginationSchema.omit({ perPage: true, currentPage: true, user_id: true })
const pageValues = articleTablePaginationSchema.pick({ perPage: true, currentPage: true })
const limitOffset = articleTablePaginationSchema.pick({ limit: true, offset: true })
const allDataQuery = articleTablePaginationSchema.omit({ limit: true, offset: true})
const noUserIdQuery = articleTablePaginationSchema.omit({ limit: true, offset: true, user_id: true })

export const articlePaginationSchema = {
    allData,
    noUserId,
    pageValues,
    limitOffset,
    allDataQuery,
    noUserIdQuery
}