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
    phone: z.string({
        required_error: 'User phone number is required',
        invalid_type_error: 'User phone number must be a string'
    })
})

const id = userTableSchema.pick({ id: true })
const data = userTableSchema.omit({ id: true })
const name = userTableSchema.pick({ name: true })
const idName = userTableSchema.pick({ id: true, name: true })
const idEmail = userTableSchema.pick({ id: true, email: true })
const idPhone = userTableSchema.pick({ id: true, phone: true })
const idAuthor = userTableSchema.pick({ id: true, author: true })
const idPassword = userTableSchema.pick({ id: true, password: true })
const namePassword = userTableSchema.pick({ name: true, password: true })

export const userSchema = {
    id,
    data,
    name,
    idName,
    idEmail,
    idPhone,
    idAuthor,
    idPassword,
    namePassword
}