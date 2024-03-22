import type { ResultSetHeader, RowDataPacket, Pool } from "mysql2/promise"
import type { SectionType, ISection } from "../types/sections"
import { SectionQueries } from "../types/queries"
import { sectionQueries } from "../utils/queries"

class Section implements ISection {
    private pool

    constructor({ sectionPool }: { sectionPool: Pool }) {
        this.pool = sectionPool
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

    getImage = async ({ id }: SectionType['id']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            sectionQueries[SectionQueries.getImage],
            [id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    getLastSequence = async ({ article_id }: SectionType['articleId']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            sectionQueries[SectionQueries.getLastSequence],
            [article_id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    changeSequence = async ({ id, sequence }: SectionType['idSequence']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            sectionQueries[SectionQueries.changeSequence],
            [sequence, id]
        )

        connection.release()
        return rows as ResultSetHeader
    }

    changeContent = async ({ id, content, content_type, image_url }: SectionType['idContent']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            sectionQueries[SectionQueries.changeContent],
            [content, content_type, image_url, id]
        )

        connection.release()
        return rows as ResultSetHeader
    }

    addNew = async ({ article_id, content, content_type, image_url, sequence }: SectionType['articleIdContent']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            sectionQueries[SectionQueries.addNew],
            [article_id, content, content_type, image_url, sequence]
        ) 

        connection.release()
        return rows as ResultSetHeader
    }

    remove = async ({ id }: SectionType['id']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            sectionQueries[SectionQueries.remove],
            [id]
        )

        connection.release()
        return rows as ResultSetHeader
    }
}

export default Section