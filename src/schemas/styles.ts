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
    width: z.string({
        required_error: 'Width style is required',
        invalid_type_error: 'Width style must be a string'
    }),
    height: z.string({
        required_error: 'Height style is required',
        invalid_type_error: 'Height style must be a string'
    }),
    font_size: z.string({
        required_error: 'Font size style is required',
        invalid_type_error: 'Font size style must be a string'
    }),
    font_weight: z.string({
        required_error: 'Font weight style is required',
        invalid_type_error: 'Font weight style must be a string'
    }), 
    font_family: z.string({
        required_error: 'Font family style is required',
        invalid_type_error: 'Font family style must be a string'
    }), 
    line_height: z.string({
        required_error: 'Line height style is required',
        invalid_type_error: 'Line height style must be a string'
    }),
    margin_top: z.string({
        required_error: 'Margin top style is required',
        invalid_type_error: 'Margin top style must be a string'
    }),
    text_align: z.string({
        required_error: 'Text align style is required',
        invalid_type_error: 'Text align style must be a string'
    }), 
    text_color: z.string({
        required_error: 'Text color style is required',
        invalid_type_error: 'Text color style must be a string'
    }), 
    border_radius: z.string({
        required_error: 'Border radius style is required',
        invalid_type_error: 'Border radius style must be a string'
    })
})

const data = styleTableSchema.omit({ id: true })
const partialData = styleTableSchema.omit({ id: true, section_id: true })

export const styleSchema = { data, partialData }