import { createPoolConnection } from "../utils/config"
import { ResultSetHeader, type RowDataPacket } from "mysql2/promise"
import { type SectionType } from "../types/sections"
import { type ISection } from "../types/sections"
import { SectionQueries } from "../types/queries"
import { sectionQueries } from "../utils/queries"

class Section implements ISection {
    private pool

    constructor() {
        this.pool = createPoolConnection({
            waitForConnection: true,
            connectionLimit: 10,
            queueLimit: 0
        })
    }

    getAll = async ({ article_id }: SectionType['articleId']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            sectionQueries[SectionQueries.getAll],
            [article_id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    changeContent = async ({ id, content }: SectionType['idContent']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            sectionQueries[SectionQueries.changeContent],
            [id, content]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    addNew = async ({ article_id, content }: SectionType['articleIdContent']) => {
        const connection = await this.pool.getConnection()

        const [results] = await connection.execute(
            sectionQueries[SectionQueries.addNew],
            [article_id, content]
        ) as ResultSetHeader[]

        const newId = results.insertId

        connection.release()
        return newId as number
    }

    remove = async ({ id }: SectionType['id']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            sectionQueries[SectionQueries.remove],
            [id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }
}