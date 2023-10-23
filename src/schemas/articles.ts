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
const idName = articleTableSchema.pick({ id: true, name: true })
const userIdName = articleTableSchema.pick({ user_id: true, name: true })
const idDescription = articleTableSchema.pick({ id: true, description: true })
const idPublishState = articleTableSchema.pick({ id: true, is_publish: true })

export const articleSchema = {
    id,
    userId,
    idName,
    userIdName,
    idDescription,
    idPublishState
}