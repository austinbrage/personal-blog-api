import request from 'supertest'
import { app } from '../server'
import { userMock } from './mockData'

let cookies: string

export default (RESOURCE: string) => {
    describe('Test register new user', () => {
    
        test('should SIGN-UP new user', async () => {
            await request(app)
                .post(`${RESOURCE}/register`)
                .send(userMock.signUp)
                .expect(201)
        })
        
        test('should SIGN-IN new user', async () => {
            const response = await request(app)
                .post(`${RESOURCE}/login`)
                .send(userMock.rightData)
                .expect(200)
            cookies = response.headers['set-cookie']
        })

        test('should READ new user', async () => {
            const userData = await request(app)
                .get(`${RESOURCE}/data`)
                .set('Cookie', cookies)
                .expect(200)

            expect(userData.body.result.data[0])
                .toMatchObject(userMock.userData)
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
    
    describe('Test update user data', () => {
  
        test('should PATCH the user data', async () => {
            await request(app)
                .patch(`${RESOURCE}/email`)
                .set('Cookie', cookies)
                .send({ email: userMock.patchData.email })
                .expect(200)
    
            await request(app)
                .patch(`${RESOURCE}/author`)
                .set('Cookie', cookies)
                .send({ author: userMock.patchData.author })
                .expect(200)
            
            await request(app)
                .patch(`${RESOURCE}/name`)
                .set('Cookie', cookies)
                .send({ name: userMock.patchData.name })
                .expect(200)
    
            await request(app)
                .patch(`${RESOURCE}/password`)
                .set('Cookie', cookies)
                .send({ password: userMock.patchData.password })
                .expect(200)
        })

        test('should READ new data in user', async () => {
            const userData = await request(app)
                .get(`${RESOURCE}/data`)
                .set('Cookie', cookies)
                .expect(200)

            expect(userData.body.result.data[0])
                .toMatchObject(userMock.newData)
        })

        test('should SIGN-IN only with new data in user', async () => {
            await request(app)
                .post(`${RESOURCE}/login`)
                .send(userMock.rightData)
                .expect(401)

            const response = await request(app)
                .post(`${RESOURCE}/login`)
                .send(userMock.newRightData)
                .expect(200)
            cookies = response.headers['set-cookie']
        })
    })

    describe('Test successful logout', () => {
        
        test('should SIGN-OUT new user', async () => {
            const response = await request(app)
                .post(`${RESOURCE}/logout`)
                .set('Cookie', cookies)
                .expect(200)

            expect(response.headers['set-cookie'])
                .toEqual(['token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'])

            cookies = response.headers['set-cookie']
        })

        test('should NOT READ data after signout', async () => {
            await request(app)
                .get(`${RESOURCE}/data`)
                .set('Cookie', cookies)
                .expect(401)
        })

        test('should SIGN-IN new user again', async () => {
            const response = await request(app)
                .post(`${RESOURCE}/login`)
                .send(userMock.newRightData)
                .expect(200)
                
            cookies = response.headers['set-cookie']
        })
    })

    describe('Test delete new user', () => {
        
        test('should DELETE new user', async () => {
            await request(app)
                .delete(`${RESOURCE}/data`)
                .set('Cookie', cookies)
                .expect(200)
        })

        test('should READ no data on deleted user', async () => {
            const response = await request(app)
                .get(`${RESOURCE}/data`)
                .set('Cookie', cookies)
                .expect(200)

            expect(response.body.result.data).toHaveLength(0)
        })
    })
}