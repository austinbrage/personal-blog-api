import { z } from 'zod'

export const userSchema = z.object({
    user: z.string({
        required_error: 'User name is required',
        invalid_type_error: 'User name must be a string'
    })
})

const passwordSchema = z.object({
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string'
    }) 
})

export const userPasswordSchema = userSchema.merge(passwordSchema)