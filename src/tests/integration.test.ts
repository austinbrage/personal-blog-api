import { app, server, userPool, stylePool, articlePool, sectionPool } from '../server'
import { pool as connectionPool } from '../routes/connection'
import request from 'supertest'
import usersRouteTest from './users.test'
import articlesRouteTest from './articles.test'
import sectionsRouteTest from './sections.test'

const RESOURCE = '/personal-blog'

describe('Integration Tests', () => {
    
    describe('Connection Route:', () => {
        test('should VERIFY api and database connection', async () => {
            const response = await request(app).get(`${RESOURCE}/ping`)
                expect(response.status).toBe(200)
                expect(response.text).toBe('pong')
        })
    })

    describe('Users Route:',    () => { usersRouteTest(`${RESOURCE}/user`)    })
    describe.skip('Articles Route:', () => { articlesRouteTest(`${RESOURCE}/article`) })
    describe.skip('Sections Route:', () => { sectionsRouteTest(`${RESOURCE}/section`) })

    afterAll(done => {
        server.close(done)
        userPool.end()
        stylePool.end()
        articlePool.end()
        sectionPool.end()
        connectionPool.end()
    })
})