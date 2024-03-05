import request from 'supertest'
import usersRouteTest from './users.test'
import articlesRouteTest from './articles.test'
import sectionsRouteTest from './sections.test'
import { pool as connectionPool } from '../routes/connection'
import { AppRoutes as APP, ResourceRoutes as RESOURCES } from '../types/api'
import { app, server, userPool, stylePool, articlePool, sectionPool } from '../server'

describe('Integration Tests', () => {

    describe('Setup test environment:', () => {
        
        test('should verify CONNECTION with the database', async () => {
            await request(app)
                .get(`${APP.VERSION_1}${RESOURCES.PING}`)
                .expect(200)
        })
    
    })

    describe('Users Route:',    () => { usersRouteTest() })
    describe('Articles Route:', () => { articlesRouteTest() })
    describe('Sections Route:', () => { sectionsRouteTest() })

    afterAll(async () => {
        await server.close()
        await userPool.end()
        await stylePool.end()
        await articlePool.end()
        await sectionPool.end()
        await connectionPool.end()
    })
})