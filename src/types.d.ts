import { z } from 'zod'
import { userSchema, userPasswordSchema } from './schemas/users.ts'
import { articleSchema, articleNameChangeSchema } from './schemas/articles.ts'

// User Model Types 
export type userType = z.infer<typeof userSchema>
export type userPasswordType = z.infer<typeof userPasswordSchema>

// Article Model Types 
export type allArticleType = z.infer<typeof articleSchema>

export type partialArticleType = Omit< 
    z.infer<typeof articleSchema>, 
    "isPublish" 
>

export type idType = Pick< 
    z.infer<typeof articleSchema>, 
    "id" 
>

export type idPostType = Pick< 
    z.infer<typeof articleSchema>, 
    "id" | "post" 
>

export type sectionType = Pick<
    z.infer<typeof articleSchema>, 
    "id" | "post" | "content" | "order"
>

export type publishStateType = Pick<
    z.infer<typeof articleSchema>, 
    "id" | "post" | "isPublish" 
>

export type articleNameChangeType = 
    idType & 
    z.infer<typeof articleNameChangeSchema>