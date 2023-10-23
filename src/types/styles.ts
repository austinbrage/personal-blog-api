import { z } from 'zod'
import { styleSchema } from '../schemas/styles' 
import { type RowDataPacket } from 'mysql2'

export type StyleType = {
    data: z.infer<typeof styleSchema.data>
}

export interface IStyle {
    changeStyles({ 
        section_id, 
        font_size, 
        font_weight, 
        font_family,
        line_height,
        margin_top,
        text_align,
        text_color
    }: StyleType['data']): Promise<RowDataPacket[]>
    addNew({ 
        section_id, 
        font_size, 
        font_weight, 
        font_family,
        line_height,
        margin_top,
        text_align,
        text_color
    }: StyleType['data']): Promise<RowDataPacket[]>
}