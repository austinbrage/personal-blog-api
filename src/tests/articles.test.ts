import request from 'supertest'
import { app } from '../server'
import { resolve } from 'path'
import { createReadStream } from 'fs'
import { UserRoutes as U } from '../types/users'
import { ArticleRoutes as A } from '../types/articles'
import { userMock, artileMock, USER, ARTICLE } from './mockData'

let articleId: number
let token: string

const imagePath = resolve(__dirname, '../../public/image-test.png')

export default () => {

    describe('Get access and user data for articles route', () => {
        
        test('should SIGN-UP new user', async () => {
            await request(app)
                .post(USER(U.REGISTER))
                .send(userMock.signUp)
                .expect(201)
        })

        test('should LOGIN to users account', async () => {
            const response = await request(app)
                .post(USER(U.LOGIN))
                .send(userMock.rightData)
                .expect(200)
            token = response.body.result.token
        })  
        
        test('should GET USER-ID from users account', async () => {
            await request(app)
                .get(USER(U.DATA))
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
        })  
    })

    describe('Test create and read new article post with url image', () => {
        
        test('should READ article keywords', async () => {
            await request(app)
                .get(ARTICLE(A.KEYWORDS))
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
        })

        test('should POST new article', async () => {
            await request(app)
                .post(ARTICLE(A.EMPTY))
                .set('Authorization', `Bearer ${token}`)
                .send(artileMock.newArticle)
                .expect(201)
        })
        
        test('should READ and GET ID from new article', async () => {
            const response = await request(app)
                .get(ARTICLE(A.EMPTY))
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
            articleId = response.body.result.data[0].id
                
            expect(response.body.result.data[0])
               .toMatchObject(artileMock.newArticle)
        })
    })

    describe('Test update new article post with url image', () => {
        
        test('should PATCH INFO of new article', async () => {
            await request(app)
                .patch(ARTICLE(A.DATA))
                .set('Authorization', `Bearer ${token}`)
                .send(artileMock.newData1(articleId))
                .expect(200)
        })

        test('should PATH PUBLISH STATE of new article', async () => {
            await request(app)
                .patch(ARTICLE(A.PUBLISHMENT))
                .set('Authorization', `Bearer ${token}`)
                .send(artileMock.newPublishState(articleId))
                .expect(200)
        })

        test('should READ changed data from changed article', async () => {
            const response = await request(app)
                .get(ARTICLE(A.EMPTY))
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
                
            expect(response.body.result.data[0])
               .toMatchObject({
                    ...artileMock.newData1(articleId),
                    id: articleId,
                    is_publish: 1
                })
        })
    })

    describe('Test create and read new article post with s3 image', () => {

        test('should POST new article with', async () => {
            await request(app)
                .post(ARTICLE(A.DATAS3))
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', `multipart/form-data`)
                .field('image_file', createReadStream(imagePath))
                .field('name', artileMock.newArticle.name)
                .field('title', artileMock.newArticle.title)
                .field('keywords', artileMock.newArticle.keywords)
                .field('description', artileMock.newArticle.description)
                .expect(201)
        })
        
        test('should READ and GET ID from new article', async () => {
            const response = await request(app)
                .get(ARTICLE(A.EMPTY))
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
            articleId = response.body.result.data[0].id
                
            expect(response.body.result.data[0]).toMatchObject(expect.objectContaining({
                id: articleId,
                name: expect.any(String),
                title: expect.any(String),
                keywords: expect.any(String),
                description: expect.any(String)
            }))
        })
    })

    describe('Test update new article post with s3 image', () => {
        
        test('should PATCH INFO of new article', async () => {
            await request(app)
                .patch(ARTICLE(A.DATAS3))
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', `multipart/form-data`)
                .field('image_file', createReadStream(imagePath))
                .field('id', artileMock.newData2(articleId).id)
                .field('name', artileMock.newData2(articleId).name)
                .field('title', artileMock.newData2(articleId).title)
                .field('keywords', artileMock.newData2(articleId).keywords)
                .field('description', artileMock.newData2(articleId).description)
                .expect(200)
        })

        test('should READ changed data from changed article', async () => {
            const response = await request(app)
                .get(ARTICLE(A.EMPTY))
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
                
            expect(response.body.result.data[0]).toMatchObject(expect.objectContaining({
                id: articleId,
                name: expect.any(String),
                title: expect.any(String),
                keywords: expect.any(String),
                description: expect.any(String)
            }))
        })
    })

    describe('Test delete new article post', () => {
       
        test('should DELETE new article', async () => {
            await request(app)
                .delete(ARTICLE(A.EMPTY))
                .set('Authorization', `Bearer ${token}`)
                .send({ id: articleId })
                .expect(200)
        })

        test('should READ no data from deleted article', async () => {
            const response = await request(app)
                .get(ARTICLE(A.EMPTY))
                .set('Authorization', `Bearer ${token}`)
                .expect(200)

            expect(response.body.result.data).toHaveLength(1)
        })        
    })

    describe('Test READ paginated articles', () => {
        
        test('should POST new article set', async () => {
            await request(app)
                .post(ARTICLE(A.EMPTY))
                .set('Authorization', `Bearer ${token}`)
                .send(artileMock.newArticleSet1[0])
                .expect(201)

            await request(app)
                .post(ARTICLE(A.EMPTY))
                .set('Authorization', `Bearer ${token}`)
                .send(artileMock.newArticleSet1[1])
                .expect(201)
        })

        test('Test update articles pusblish state', async () => {
            const response = await request(app)
                .get(ARTICLE(A.EMPTY))
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
            
            await request(app)
                .patch(ARTICLE(A.PUBLISHMENT))
                .set('Authorization', `Bearer ${token}`)
                .send(artileMock.newPublishState(response.body.result.data[0].id))
                .expect(200)
            
            await request(app)
                .patch(ARTICLE(A.PUBLISHMENT))
                .set('Authorization', `Bearer ${token}`)
                .send(artileMock.newPublishState(response.body.result.data[1].id))
                .expect(200)
        })

        test('should SIGN-UP and LOG-IN new user', async () => {
            await request(app)
                .post(USER(U.REGISTER))
                .send(userMock.patchData)
                .expect(201)

            const response = await request(app)
                .post(USER(U.LOGIN))
                .send(userMock.newRightData)
                .expect(200)
            token = response.body.result.token
        })
        
        test('should POST new article set in new user', async () => {
            await request(app)
                .post(ARTICLE(A.EMPTY))
                .set('Authorization', `Bearer ${token}`)
                .send(artileMock.newArticleSet2[0])
                .expect(201)
            
            await request(app)
                .post(ARTICLE(A.EMPTY))
                .set('Authorization', `Bearer ${token}`)
                .send(artileMock.newArticleSet2[1])
                .expect(201)
        })

        test('Test update articles pusblish state', async () => {
            const response = await request(app)
                .get(ARTICLE(A.EMPTY))
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
            
            await request(app)
                .patch(ARTICLE(A.PUBLISHMENT))
                .set('Authorization', `Bearer ${token}`)
                .send(artileMock.newPublishState(response.body.result.data[0].id))
                .expect(200)
            
            await request(app)
                .patch(ARTICLE(A.PUBLISHMENT))
                .set('Authorization', `Bearer ${token}`)
                .send(artileMock.newPublishState(response.body.result.data[1].id))
                .expect(200)
        })

        test('should READ paginated articles from new user', async () => {
            const response = await request(app)
                .get(ARTICLE(A.DUKEYWORDS))
                .set('Authorization', `Bearer ${token}`)
                .query(artileMock.newArticleKeywords1)
                .expect(200)

            expect(response.body.result.data).toHaveLength(1)

            expect(response.body.result.data[0]).toEqual(
                expect.objectContaining(artileMock.newArticleSet2[0])
            )                  
        })

        test('should READ paginated articles from all users', async () => {
            const response = await request(app)
                .get(ARTICLE(A.DKEYWORDS))
                .set('Authorization', `Bearer ${token}`)
                .query(artileMock.newArticleKeywords2)
                .expect(200)

            expect(response.body.result.data).toHaveLength(3)

            expect(response.body.result.data).toEqual(
                expect.arrayContaining([
                    expect.objectContaining(artileMock.newArticleSet1[1]),
                    expect.objectContaining(artileMock.newArticleSet2[0]),
                    expect.objectContaining(artileMock.newArticleSet2[1]),
                ])
            )
        })

        test('should READ all paginated articles from all users', async () => {
            const response = await request(app)
                .get(ARTICLE(A.DALL))
                .set('Authorization', `Bearer ${token}`)
                .query(artileMock.allArticles)
                .expect(200)

            expect(response.body.result.data).toHaveLength(5)
        })

    })

    describe('Delete new user for next tests', () => {

        test('should DELETE both users', async () => {
            await request(app)
                .delete(USER(U.DATA))
                .set('Authorization', `Bearer ${token}`)
                .expect(200)

            const response = await request(app)
                .post(USER(U.LOGIN))
                .send(userMock.rightData)
                .expect(200)

            await request(app)
                .delete(USER(U.DATA))
                .set('Authorization', `Bearer ${response.body.result.token}`)
                .expect(200)
        })
    })
}