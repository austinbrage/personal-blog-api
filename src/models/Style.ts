import { createPoolConnection } from "../utils/config"
import { type RowDataPacket } from "mysql2/promise"
import { IStyle, type StyleType } from "../types/styles"
import { StyleQueries } from "../types/queries"
import { styleQueries } from "../utils/queries"

class Style implements IStyle {
    private pool 

    constructor() {
        this.pool = createPoolConnection({
            waitForConnection: true,
            connectionLimit: 10,
            queueLimit: 0
        })
    }

    changeStyles = async ({ 
        section_id, 
        fontSize, 
        fontWeight, 
        fontFamily, 
        lineHeight, 
        marginTop, 
        textAlign, 
        textColor 
    }: StyleType['data']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            styleQueries[StyleQueries.changeAll],
            [
                section_id, 
                fontSize, 
                fontWeight, 
                fontFamily, 
                lineHeight, 
                marginTop, 
                textAlign, 
                textColor
            ]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    addNew = async ({ 
        section_id, 
        fontSize, 
        fontWeight, 
        fontFamily, 
        lineHeight, 
        marginTop, 
        textAlign, 
        textColor 
    }: StyleType['data']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            styleQueries[StyleQueries.addNew],
            [
                section_id, 
                fontSize, 
                fontWeight, 
                fontFamily, 
                lineHeight, 
                marginTop, 
                textAlign, 
                textColor
            ]
        )

        connection.release()
        return rows as RowDataPacket[]
    }
}

export default Style