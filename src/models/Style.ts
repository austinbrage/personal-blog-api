import type { RowDataPacket, Pool } from "mysql2/promise"
import type { StyleType, IStyle } from "../types/styles"
import { StyleQueries } from "../types/queries"
import { styleQueries } from "../utils/queries"

class Style implements IStyle {
    private pool 

    constructor({ stylePool }: { stylePool: Pool }) {
        this.pool = stylePool
    }

    changeStyles = async ({ 
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
    }: StyleType['data']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            styleQueries[StyleQueries.changeAll],
            [
                width,
                height, 
                font_size, 
                font_weight, 
                font_family, 
                line_height, 
                margin_top, 
                text_align, 
                text_color,
                border_radius,
                section_id 
            ]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    addNew = async ({ 
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
    }: StyleType['data']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            styleQueries[StyleQueries.addNew],
            [
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
            ]
        )

        connection.release()
        return rows as RowDataPacket[]
    }
}

export default Style