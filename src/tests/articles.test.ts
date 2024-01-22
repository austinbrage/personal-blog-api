import request from 'supertest'
import { app} from '../server'
import { userMock, artileMock } from './mockData'

let userId: number
let articleId: number
let token: string

export default (RESOURCE: string) => {
    const USER_RESOURCE = RESOURCE.replace('/article', '/user')

    describe('Get access and user data for articles route', () => {
        
        test('should SIGN-UP new user', async () => {
            await request(app)
                .post(`${USER_RESOURCE}/register`)
                .send(userMock.signUp)
                .expect(201)
        })

        test('should LOGIN to users account', async () => {
            const response = await request(app)
                .post(`${USER_RESOURCE}/login`)
                .send(userMock.rightData)
                .expect(200)
            token = response.body.result.token
        })  
        
        test('should GET USER-ID from users account', async () => {
            const response = await request(app)
                .get(`${USER_RESOURCE}/data`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
            userId = response.body.result.data[0].id
        })  
    })

    describe('Test create and read new article post', () => {
        
        test('should READ article keywords', async () => {
            await request(app)
                .get(`${RESOURCE}/keywords`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
        })

        test('should POST new article', async () => {
            await request(app)
                .post(RESOURCE)
                .set('Authorization', `Bearer ${token}`)
                .send(artileMock.newArticle)
                .expect(201)
        })
        
        test('should READ and GET ID from new article', async () => {
            const response = await request(app)
                .get(RESOURCE)
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
            articleId = response.body.result.data[0].id
                
            expect(response.body.result.data[0])
               .toMatchObject(artileMock.newArticle)
        })
    })

    describe('Test update new article post', () => {
        
        test('should PATCH INFO of new article', async () => {
            await request(app)
                .patch(`${RESOURCE}/data`)
                .set('Authorization', `Bearer ${token}`)
                .send(artileMock.newData(articleId))
                .expect(200)
        })

        test('should PATH PUBLISH STATE of new article', async () => {
            await request(app)
                .patch(`${RESOURCE}/publishment`)
                .set('Authorization', `Bearer ${token}`)
                .send(artileMock.newPublishState(articleId))
                .expect(200)
        })

        test('should READ changed data from changed article', async () => {
            const response = await request(app)
                .get(RESOURCE)
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
                
            expect(response.body.result.data[0])
               .toMatchObject({
                    ...artileMock.newData(articleId),
                    id: articleId,
                    is_publish: 1
                })
        })
    })

    describe('Test delete new article post', () => {
       
        test('should DELETE new article', async () => {
            await request(app)
                .delete(RESOURCE)
                .set('Authorization', `Bearer ${token}`)
                .send({ id: articleId })
                .expect(200)
        })

        test('should READ no data from deleted article', async () => {
            const response = await request(app)
                .get(RESOURCE)
                .set('Authorization', `Bearer ${token}`)
                .expect(200)

            expect(response.body.result.data).toHaveLength(0)
        })        
    })

    describe('Delete new user for next tests', () => {

        test('should DELETE new user', async () => {
            await request(app)
                .delete(`${USER_RESOURCE}/data`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
        })
    })
}