import { SafeParseReturnType } from 'zod'
import { articleSchema, articleNameChangeSchema } from '../schemas/articles'
import type { 
    idType, 
    idPostType, 
    sectionType, 
    allArticleType, 
    publishStateType,
    partialArticleType,
    articleNameChangeType 
} from '../types/articles'

export interface IArticlesValidation {
    all(data: unknown): SafeParseReturnType<unknown, allArticleType>
    partial(data: unknown): SafeParseReturnType<unknown, partialArticleType>
    id(data: unknown): SafeParseReturnType<unknown, idType>
    idPost(data: unknown): SafeParseReturnType<unknown, idPostType>
    section(data: unknown): SafeParseReturnType<unknown, sectionType>
    publishState(data: unknown): SafeParseReturnType<unknown, publishStateType>
    nameChange(data: unknown): SafeParseReturnType<unknown, articleNameChangeType>
}

export class ArticlesValidation implements IArticlesValidation {
    private articleSchema: typeof articleSchema
    private articleNameChangeSchema: typeof articleNameChangeSchema
    
    constructor() {
        this.articleSchema = articleSchema
        this.articleNameChangeSchema = articleNameChangeSchema
    }

    all(data: unknown) {
        return this.articleSchema.safeParse(data)
    }

    partial(data: unknown) {
        return this.articleSchema.omit({ 
            isPublish: true 
        }).safeParse(data)
    }

    id(data: unknown) {
        return this.articleSchema.pick({ 
            id: true 
        }).safeParse(data)
    }
    
    idPost(data: unknown) {
        return this.articleSchema.pick({ 
            id: true, 
            post: true 
        }).safeParse(data)
    }

    section(data: unknown) {
        return this.articleSchema.pick({ 
            id: true, 
            post: true, 
            content: true, 
            order: true 
        }). safeParse(data)
    }

    publishState(data: unknown) {
        return this.articleSchema.pick({ 
            id: true, 
            post: true, 
            isPublish: true 
        }).safeParse(data)
    }

    nameChange(data: unknown) {
        return this.articleSchema.pick({
            id: true
        }).merge(this.articleNameChangeSchema).safeParse(data)
    }
}