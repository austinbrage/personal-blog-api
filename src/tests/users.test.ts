import request from 'supertest'
import { app } from '../server'
import { userMock } from './mockData'

let token: string

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
            token = response.body.result.token
        })

        test('should READ new user', async () => {
            const userData = await request(app)
                .get(`${RESOURCE}/data`)
                .set('Authorization', `Bearer ${token}`)
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
                .set('Authorization', `Bearer ${token}`)
                .send({ email: userMock.patchData.email })
                .expect(200)
    
            await request(app)
                .patch(`${RESOURCE}/author`)
                .set('Authorization', `Bearer ${token}`)
                .send({ author: userMock.patchData.author })
                .expect(200)
            
            await request(app)
                .patch(`${RESOURCE}/name`)
                .set('Authorization', `Bearer ${token}`)
                .send({ name: userMock.patchData.name })
                .expect(200)
    
            await request(app)
                .patch(`${RESOURCE}/password`)
                .set('Authorization', `Bearer ${token}`)
                .send({ password: userMock.patchData.password })
                .expect(200)
        })

        test('should READ new data in user', async () => {
            const userData = await request(app)
                .get(`${RESOURCE}/data`)
                .set('Authorization', `Bearer ${token}`)
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

            token = response.body.result.token
        })
    })

    describe('Test successful logout', () => {
        
        test('should LOGOUT by cleaning token', async () => {
            token = ''
            expect(true)
        })

        test('should NOT READ data after signout', async () => {
            
            await request(app)
                .get(`${RESOURCE}/data`)
                .set('Authorization', `Bearer ${token}`)
                .expect(401)
        })

        test('should SIGN-IN new user again', async () => {
            const response = await request(app)
                .post(`${RESOURCE}/login`)
                .send(userMock.newRightData)
                .expect(200)
                
            token = response.body.result.token
        })
    })

    describe('Test delete new user', () => {
        
        test('should DELETE new user', async () => {
            await request(app)
                .delete(`${RESOURCE}/data`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
        })

        test('should READ no data on deleted user', async () => {
            const response = await request(app)
                .get(`${RESOURCE}/data`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200)

            expect(response.body.result.data).toHaveLength(0)
        })
    })
}