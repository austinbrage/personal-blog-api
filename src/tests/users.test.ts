import request from 'supertest'
import { app } from '../server'
import { userMock } from './mockData'

let cookies: string

export default (RESOURCE: string) => {
    describe('Test register and delete user', () => {
    
        test.skip('should SIGN-UP new user', async () => {
            await request(app)
                .post(`${RESOURCE}/register`)
                .send(userMock.signUp)
                .expect(201)
        })
        
        test.skip('should SIGN-IN, READ and DELETE new user', async () => {
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
    
    describe('Test successful and unseccessful login', () => {
    
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
    
    describe.skip('Test resources after a successful login', () => {
       
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
    
    describe.skip('Test resources with bad requests', () => {
       
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
}

