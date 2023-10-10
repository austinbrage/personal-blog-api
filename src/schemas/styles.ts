import { z } from 'zod'

const styleTableSchema = z.object({
    id: z.number({
        required_error: 'Style id is required',
        invalid_type_error: 'Style id must be a number'
    }),
    section_id: z.number({
        required_error: 'Section id for style is required',
        invalid_type_error: 'Section id for style must be a number'
    }),
    fontSize: z.string({
        required_error: 'Font size style is required',
        invalid_type_error: 'Font size style must be a string'
    }),
    fontWeight: z.string({
        required_error: 'Font weight style is required',
        invalid_type_error: 'Font weight style must be a string'
    }), 
    fontFamily: z.string({
        required_error: 'Font family style is required',
        invalid_type_error: 'Font family style must be a string'
    }), 
    lineHeight: z.string({
        required_error: 'Line height style is required',
        invalid_type_error: 'Line height style must be a string'
    }),
    marginTop: z.string({
        required_error: 'Margin top style is required',
        invalid_type_error: 'Margin top style must be a string'
    }),
    textAlign: z.string({
        required_error: 'Text align style is required',
        invalid_type_error: 'Text align style must be a string'
    }), 
    textColor: z.string({
        required_error: 'Text color style is required',
        invalid_type_error: 'Text color style must be a string'
    }), 
})

const data = styleTableSchema.omit({ id: true })
const partialData = styleTableSchema.omit({ id: true, section_id: true })

export const styleSchema = { data, partialData }