import { z } from 'zod'

const userTableSchema = z.object({
    id: z.number({
        required_error: 'User id is required',
        invalid_type_error: 'User id must be a number'
    }),
    name: z.string({
        required_error: 'User name is required',
        invalid_type_error: 'User name must be a string'
    }),
    password: z.string({
        required_error: 'User password is required',
        invalid_type_error: 'User password must be a string'
    }),
    author: z.string({
        required_error: 'User author name is required',
        invalid_type_error: 'User author name must be a string'
    }),
    email: z.string({
        required_error: 'User email address is required',
        invalid_type_error: 'User email address must be a string'
    }),
    api_key: z.string({
        required_error: 'User api key is required',
        invalid_type_error: 'User api key must be a string'
    })
})

const id = userTableSchema.pick({ id: true })
const name = userTableSchema.pick({ name: true })
const email = userTableSchema.pick({ email: true })
const author = userTableSchema.pick({ author: true })
const apiKey = userTableSchema.pick({ api_key: true })
const idName = userTableSchema.pick({ id: true, name: true })
const data = userTableSchema.omit({ id: true, api_key: true })
const idEmail = userTableSchema.pick({ id: true, email: true })
const idAuthor = userTableSchema.pick({ id: true, author: true })
const idPassword = userTableSchema.pick({ id: true, password: true })
const namePassword = userTableSchema.pick({ name: true, password: true })

export const userSchema = {
    id,
    data,
    name,
    email,
    author,
    apiKey,
    idName,
    idEmail,
    idAuthor,
    idPassword,
    namePassword
}