import request from 'supertest'
import app from '../server'
import { type UserType } from "../types/users"

let cookies: string
const RESOURCE = '/personal-blog/user'

describe.skip('Users Route: Test register and delete user', () => {

    test('should SIGN-UP new user', async () => {
        await request(app)
            .post(`${RESOURCE}/register`)
            .send({ 
                name: 'Usuario1', 
                password: '5678', 
                email: 'myEmail@gmail.com',
                phone: '1234-5678',
                author: 'Jack Smith',
            })
            .expect(201)    
    })
    
    test('should SIGN-IN and DELETE new user', async () => {
        const response1 = await request(app)
            .post(`${RESOURCE}/login`)
            .send({ name: 'Usuario1', password: '5678' })
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
            .send({ name: 'Usuarios0', password: '1234' })
            .expect(401)
    })

    test('should NOT LOGIN if password is incorrect', async () => {
        await request(app)
            .post(`${RESOURCE}/login`)
            .send({ name: 'Usuario0', password: '1235' })
            .expect(401)
    })

    test('should NOT LOGIN if username and password are incorrect', async () => {
        await request(app)
            .post(`${RESOURCE}/login`)
            .send({ name: 'Usuarios0', password: '1235' })
            .expect(401)
    })

    test('should LOGIN if username and password are correct', async () => {
        await request(app)
            .post(`${RESOURCE}/login`)
            .send({ name: 'Usuario0', password: '1234' })
            .expect(200)
    })
})

describe.skip('Users Route: Test resources after a successful login', () => {
   
    beforeAll(async () => {
        const existingUser: UserType['namePassword'] = { name: 'Usuario0', password: '1234' }

        const response = await request(app)
            .post(`${RESOURCE}/login`)
            .send(existingUser)
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
        const existingUser: UserType['namePassword'] = { name: 'Usuario0', password: '1234' }

        const response = await request(app)
            .post(`${RESOURCE}/login`)
            .send(existingUser)
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
