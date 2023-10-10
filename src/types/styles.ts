import { z } from 'zod'
import { styleSchema } from '../schemas/styles' 
import { type RowDataPacket } from 'mysql2'

export type StyleType = {
    data: z.infer<typeof styleSchema.data>
}

export interface IStyle {
    changeStyles({ 
        section_id, 
        fontSize, 
        fontWeight, 
        fontFamily,
        lineHeight,
        marginTop,
        textAlign,
        textColor
    }: StyleType['data']): Promise<RowDataPacket[]>
    addNew({ 
        section_id, 
        fontSize, 
        fontWeight, 
        fontFamily,
        lineHeight,
        marginTop,
        textAlign,
        textColor
    }: StyleType['data']): Promise<RowDataPacket[]>
}