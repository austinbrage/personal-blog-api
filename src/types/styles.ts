import { z } from 'zod'
import { styleSchema } from '../schemas/styles' 
import { type ResultSetHeader } from 'mysql2'

export type StyleType = {
    data: z.infer<typeof styleSchema.data>
}

export interface IStyle {
    changeStyles({ 
        section_id,
        width,
        height,
        font_size, 
        font_weight, 
        font_family,
        line_height,
        margin_top,
        text_align,
        text_color,
        border_radius
    }: StyleType['data']): Promise<ResultSetHeader>
    addNew({ 
        section_id, 
        width,
        height,
        font_size, 
        font_weight, 
        font_family,
        line_height,
        margin_top,
        text_align,
        text_color,
        border_radius
    }: StyleType['data']): Promise<ResultSetHeader>
}