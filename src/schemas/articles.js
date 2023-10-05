const { z } = require('zod')

const articleNameSchema = z.string({
    required_error: 'Article post name is required',
    invalid_type_error: 'Article post name must be a string'
})

const articleNameChangeSchema = z.object({
    oldName: articleNameSchema,
    newName: z.string({
        required_error: 'Article post new name is required',
        invalid_type_error: 'Article post new name must be a string'
    })
})

const articleSchema = z.object({
    id: z.string({
        required_error: 'Article id is required',
        invalid_type_error: 'Article id must be a string'
    }),
    
    post: articleNameSchema,

    order: z.number({
        required_error: 'Article section order is required',
        invalid_type_error: 'Article section order must be a number'
    }),
    
    content: z.string({
        required_error: 'Article section content is required',
        invalid_type_error: 'Article section content must be a string'
    }),

    styles: z.string({
        required_error: 'Article section styles is required',
        invalid_type_error: 'Article section styles must be a string'
    }),

    isPublish: z.boolean({
        required_error: 'Article section isPublish is required',
        invalid_type_error: 'Article section isPublish must be a boolean'
    })
})

module.exports = {
    articleSchema,
    articleNameChangeSchema
}