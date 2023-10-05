const { z } = require('zod')

const articleSchema = z.object({
    id: z.string({
        required_error: 'Article id is required',
        invalid_type_error: 'Article id must be a string'
    }),
    
    post: z.string({
        required_error: 'Article post is required',
        invalid_type_error: 'Article post must be a string'
    }),

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

module.exports = articleSchema