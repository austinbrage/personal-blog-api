import app from '../server'
import http from 'http'
import request from 'supertest'
import usersRouteTest from './users.test'
import articlesRouteTest from './articles.test'
import sectionsRouteTest from './sections.test'

let server: http.Server
const RESOURCE = '/personal-blog'

describe('Integration Tests', () => {
    beforeAll(done => {
        server = app.listen(0, done)
    })
    
    describe('Connection Route:', () => {
        test('should VERIFY api and database connection', async () => {
            const response = await request(app).get(`${RESOURCE}/ping`)
                expect(response.status).toBe(200)
                expect(response.text).toBe('pong')
        })
    })

    describe.skip('Users Route:',    () => { usersRouteTest(`${RESOURCE}/user`)    })
    describe.skip('Articles Route:', () => { articlesRouteTest(`${RESOURCE}/article`) })
    describe.skip('Sections Route:', () => { sectionsRouteTest(`${RESOURCE}/section`) })

    afterAll(done => {
        server.close(done)
    })
})