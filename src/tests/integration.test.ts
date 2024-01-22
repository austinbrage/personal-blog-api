import { app, server, userPool, stylePool, articlePool, sectionPool } from '../server'
import { pool as connectionPool } from '../routes/connection'
import request from 'supertest'
import usersRouteTest from './users.test'
import articlesRouteTest from './articles.test'
import sectionsRouteTest from './sections.test'

const RESOURCE = '/personal-blog'

describe('Integration Tests', () => {

    describe('Setup test environment:', () => {
        
        test('should verify CONNECTION with the database', async () => {
            await request(app)
                .get(`${RESOURCE}/ping`)
                .expect(200)
        })
    
    })

    describe('Users Route:',    () => { usersRouteTest   (`${RESOURCE}/user`)    })
    describe('Articles Route:', () => { articlesRouteTest(`${RESOURCE}/article`) })
    describe('Sections Route:', () => { sectionsRouteTest(`${RESOURCE}/section`) })

    afterAll(async () => {
        await server.close()
        await userPool.end()
        await stylePool.end()
        await articlePool.end()
        await sectionPool.end()
        await connectionPool.end()
    })
})