import { Router } from 'express'
import { createPoolConnection } from '../services/database'
import type { Request, Response } from 'express'

const connectionRouter = Router()

const pool = createPoolConnection()

connectionRouter.get('/', async (_req: Request, res: Response) => {
    const connection = await pool.getConnection()
    
    try {
        await connection.query('SELECT 1')
        res.status(200).send('pong')      
        
    } catch(err) {
        res.status(500).send(`Database connection error (${err})`)

    } finally {
        connection.release()

    }
})

export default connectionRouter