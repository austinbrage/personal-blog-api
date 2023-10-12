import request from 'supertest'
import app from '../server'
import { type UserType } from "../types/users"

let id: number
let cookies: string
const RESOURCE = '/personal-blog/user'

describe.skip('Users Route: Test register and delete user', () => {

    test('should register new user', async () => {
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
    
    test('should login and delete new user', async () => {
        const response1 = await request(app)
            .post(`${RESOURCE}/login`)
            .send({ name: 'Usuario1', password: '5678' })
            .expect(200)
        cookies = response1.headers['set-cookie']

        const response2 = await request(app)
            .get(`${RESOURCE}/data`)
            .set('Cookie', cookies)
            .expect(200)
        id = response2.body.data.id

        await request(app)
            .delete(`${RESOURCE}/data`)
            .set('Cookie', cookies)
            .send({ id: id })
            .expect(200)
    })

})

describe.skip('Users Route: Test successful and unseccessful login', () => {

    test('should reject login if username is incorrect', async () => {
        await request(app)
            .post(`${RESOURCE}/login`)
            .send({ name: 'Usuarios0', password: '1234' })
            .expect(401)
    })

    test('should reject login if password is incorrect', async () => {
        await request(app)
            .post(`${RESOURCE}/login`)
            .send({ name: 'Usuario0', password: '1235' })
            .expect(401)
    })

    test('should reject login if username and password are incorrect', async () => {
        await request(app)
            .post(`${RESOURCE}/login`)
            .send({ name: 'Usuarios0', password: '1235' })
            .expect(401)
    })

    test('should accept login if username and password are correct', async () => {
        await request(app)
            .post(`${RESOURCE}/login`)
            .send({ name: 'Usuario0', password: '1234' })
            .expect(401)
    })
})

describe.skip('Users Route: Test resources after a successful login', () => {
   
    beforeAll(async () => {
        const existingUser: UserType['namePassword'] = { name: 'Usuario0', password: '1234' }

        const response1 = await request(app)
            .post(`${RESOURCE}/login`)
            .send(existingUser)
            .expect(200)
        cookies = response1.headers['set-cookie']

        const response2 = await request(app)
            .get(`${RESOURCE}/data`)
            .set('Cookie', cookies)
            .expect(200)
        id = response2.body.data.id
    })

    test('should PATCH the user email', async () => {
        await request(app)
            .patch(`${RESOURCE}/email`)
            .set('Cookie', cookies)
            .send({ id: id, email: 'fakeEmail@gmail.com' })
            .expect(200)
    })

    test('should PATCH the user phone', async () => {
        await request(app)
            .patch(`${RESOURCE}/phone`)
            .set('Cookie', cookies)
            .send({ id: id, phone: '5678-1234' })
            .expect(200)
    })

    test('should PATCH the user author', async () => {
        await request(app)
            .patch(`${RESOURCE}/author`)
            .set('Cookie', cookies)
            .send({ id: id, author: 'John Jackson' })
            .expect(200)
    })

    test('should PATCH the user name', async () => {
        await request(app)
            .patch(`${RESOURCE}/name`)
            .set('Cookie', cookies)
            .send({ id: id, email: 'Usuario0' })
            .expect(200)
    })

    test('should PATCH the user password', async () => {
        await request(app)
            .patch(`${RESOURCE}/name`)
            .set('Cookie', cookies)
            .send({ id: id, password: '1234' })
            .expect(200)
    })
})