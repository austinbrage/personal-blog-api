const { articleSchema, articleNameChangeSchema } = require('../schemas/article')

class Article {
    constructor() {
        this.articleSchema = articleSchema
    }

    all(data) {
        return this.articleSchema.safeParse(data)
    }

    partial(data) {
        return this.articleSchema.omit({ 
            isPublish: true 
        }).safeParse(data)
    }

    id(data) {
        return this.articleSchema.pick({ 
            id: true 
        }).safeParse(data)
    }
    
    idPost(data) {
        return this.articleSchema.pick({ 
            id: true, 
            post: true 
        }).safeParse(data)
    }

    section(data) {
        return this.articleSchema.pick({ 
            id: true, 
            post: true, 
            content: true, 
            order: true 
        }). safeParse(data)
    }

    publishState(data) {
        return this.articleSchema.pick({ 
            id: true, 
            post: true, 
            isPublish: true 
        }).safeParse(data)
    }

    nameChange(data) {
        return this.articleSchema.pick({
            id: true
        }).merge(articleNameChangeSchema).safeParse(data)
    }
}

module.exports = Article