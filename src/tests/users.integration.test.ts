import request from 'supertest'
import app from '../server'
import { userMock } from './userMock'

let cookies: string
const RESOURCE = '/personal-blog/user'

describe('Connection Route', () => {
    
    test('should get api and database connection', async () => {
        const response = await request(app).get(`${RESOURCE}/ping`)
        expect(response.status).toBe(200)
        expect(response.text).toBe('pong')
    })
})

describe.skip('Users Route: Test register and delete user', () => {

    test('should SIGN-UP new user', async () => {
        await request(app)
            .post(`${RESOURCE}/register`)
            .send(userMock.signUp)
            .expect(201)    
    })
    
    test.skip('should SIGN-IN and DELETE new user', async () => {
        const response1 = await request(app)
            .post(`${RESOURCE}/login`)
            .send(userMock.newUser)
            .expect(200)
        cookies = response1.headers['set-cookie']

        await request(app)
            .get(`${RESOURCE}/data`)
            .set('Cookie', cookies)
            .expect(200)

        await request(app)
            .delete(`${RESOURCE}/data`)
            .set('Cookie', cookies)
            .expect(200)
    })

})

describe.skip('Users Route: Test successful and unseccessful login', () => {

    test('should NOT LOGIN if username is incorrect', async () => {
        await request(app)
            .post(`${RESOURCE}/login`)
            .send(userMock.badUser)
            .expect(401)
    })

    test('should NOT LOGIN if password is incorrect', async () => {
        await request(app)
            .post(`${RESOURCE}/login`)
            .send(userMock.badPassword)
            .expect(401)
    })

    test('should NOT LOGIN if username and password are incorrect', async () => {
        await request(app)
            .post(`${RESOURCE}/login`)
            .send(userMock.badData)
            .expect(401)
    })

    test('should LOGIN if username and password are correct', async () => {
        await request(app)
            .post(`${RESOURCE}/login`)
            .send(userMock.rightData)
            .expect(200)
    })
})

describe.skip('Users Route: Test resources after a successful login', () => {
   
    beforeAll(async () => {
        const response = await request(app)
            .post(`${RESOURCE}/login`)
            .send(userMock.rightData)
            .expect(200)
        cookies = response.headers['set-cookie']
    })

    test('should PATCH the user data', async () => {
        await request(app)
            .patch(`${RESOURCE}/email`)
            .set('Cookie', cookies)
            .send({ email: 'fakeEmail@gmail.com' })
            .expect(200)

        await request(app)
            .patch(`${RESOURCE}/phone`)
            .set('Cookie', cookies)
            .send({ phone: '5678-1234' })
            .expect(200)

        await request(app)
            .patch(`${RESOURCE}/author`)
            .set('Cookie', cookies)
            .send({ author: 'John Jackson' })
            .expect(200)
        
        await request(app)
            .patch(`${RESOURCE}/name`)
            .set('Cookie', cookies)
            .send({ name: 'Usuario0' })
            .expect(200)

        await request(app)
            .patch(`${RESOURCE}/password`)
            .set('Cookie', cookies)
            .send({ password: '1234' })
            .expect(200)
    })
})

describe.skip('Users Route: Test resources with bad requests', () => {
   
    beforeAll(async () => {
        const response = await request(app)
            .post(`${RESOURCE}/login`)
            .send(userMock.rightData)
            .expect(200)
        cookies = response.headers['set-cookie']
    })

    test('should DENY bad requests', async () => {
        await request(app)
            .post(`${RESOURCE}/login`)
            .send({ name: 'Usuario0' })
            .expect(400)

        await request(app)
            .patch(`${RESOURCE}/email`)
            .set('Cookie', cookies)
            .send({ emails: 'fakeEmail@gmail.com' })
            .expect(400)
            
        await request(app)
            .patch(`${RESOURCE}/phone`)
            .set('Cookie', cookies)
            .send({ phone: 56781234 })
            .expect(400)

        await request(app)
            .patch(`${RESOURCE}/author`)
            .set('Cookie', cookies)
            .send({ author: true })
            .expect(400)

        await request(app)
            .patch(`${RESOURCE}/name`)
            .set('Cookie', cookies)
            .send({ email: 'Usuario0' })
            .expect(400)

        await request(app)
            .patch(`${RESOURCE}/password`)
            .set('Cookie', cookies)
            .expect(400)
    })
})
