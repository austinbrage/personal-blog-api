import { z } from 'zod'
import { styleSchema } from './styles'

const sectionTableSchema = z.object({
    id: z.number({
        required_error: 'Section id is required',
        invalid_type_error: 'Section id must be a number'
    }),
    article_id: z.number({
        required_error: 'Article id for section is required',
        invalid_type_error: 'Article id for section must be a number'
    }),
    article_id_query: z.string({
        required_error: 'Article id on query for section is required',
        invalid_type_error: 'Article id on query for section must be a string'
    }),
    sequence: z.number({
        required_error: 'Sequence section is required',
        invalid_type_error: 'Sequence section must be a number'
    }),
    content: z.string({
        required_error: 'Content section is required',
        invalid_type_error: 'Content section must be a string'
    }),
    content_type: z.string({
        required_error: 'Content section type is required',
        invalid_type_error: 'Content section type must be a string'
    }),
    image_url: z.string({
        required_error: 'Content image url is required',
        invalid_type_error: 'Content image url must be a string'
    }).nullable()
})

const id = sectionTableSchema.pick({ id: true })
const articleId = sectionTableSchema.pick({ article_id: true })
const articleIdQuery = sectionTableSchema.pick({ article_id_query: true })
const data = sectionTableSchema.pick({ content: true, content_type: true, image_url: true })
const idContent = sectionTableSchema.pick({ id: true, content: true, content_type: true, image_url: true })
const articleIdContent = sectionTableSchema.pick({ article_id: true, content: true, content_type: true, image_url: true })

const articleIdData = articleIdContent.merge(styleSchema.partialData)
const noIdData = data.merge(styleSchema.partialData).array()
const idData = idContent.merge(styleSchema.partialData)


const options: [string, ...string[]] = ['basic', 'test']

const templateData = articleId.merge(z.object({ 
    template_option: z.enum(options, {
        required_error: 'Template option is required',
        invalid_type_error: `Template option must be one of ${options.join(' ')}`
    }) 
}))

export const sectionSchema = {
    id,
    idData,
    noIdData,
    articleId,
    idContent,
    templateData,
    articleIdData,
    articleIdQuery,
    articleIdContent,
}