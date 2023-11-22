import request from 'supertest'
import { app} from '../server'
import { userMock, artileMock } from './mockData'

let userId: number
let articleId: number
let cookies: string

export default (RESOURCE: string) => {
    const USER_RESOURCE = RESOURCE.replace('/article', '/user')
    
    describe('Clean test environment', () => {
        
        test('should CLEANUP database tables', async () => {
            await request(app)
                .delete(`${USER_RESOURCE}/cleanup`)
                .expect(200)
        })
    })

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
           cookies = response.headers['set-cookie']
        })  
        
        test('should GET USER-ID from users account', async () => {
            const response = await request(app)
                .get(`${USER_RESOURCE}/data`)
                .set('Cookie', cookies)
                .expect(200)
            userId = response.body.result.data[0].id
        })  
    })

    describe('Test create and read new article post', () => {
        
        test('should POST new article', async () => {
            await request(app)
                .post(RESOURCE)
                .set('Cookie', cookies)
                .send(artileMock.newArticle(userId))
                .expect(201)
        })
        
        test('should READ and GET ID from new article', async () => {
            const response = await request(app)
                .get(RESOURCE)
                .set('Cookie', cookies)
                .expect(200)
            articleId = response.body.result.data[0].id
                
            expect(response.body.result.data[0])
               .toMatchObject(artileMock.newArticle(userId))
        })
    })

    describe('Test update new article post', () => {
        
        test('should PATCH INFO of new article', async () => {
            await request(app)
                .patch(`${RESOURCE}/data`)
                .set('Cookie', cookies)
                .send(artileMock.newData(articleId))
                .expect(200)
        })

        test('should PATH PUBLISH STATE of new article', async () => {
            await request(app)
                .patch(`${RESOURCE}/publishment`)
                .set('Cookie', cookies)
                .send(artileMock.newPublishState(articleId))
                .expect(200)
        })

        test('should READ changed data from changed article', async () => {
            const response = await request(app)
                .get(RESOURCE)
                .set('Cookie', cookies)
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
                .set('Cookie', cookies)
                .send({ id: articleId })
                .expect(200)
        })

        test('should READ no data from deleted article', async () => {
            const response = await request(app)
                .get(RESOURCE)
                .set('Cookie', cookies)
                .expect(200)

            expect(response.body.result.data).toHaveLength(0)
        })        
    })
}