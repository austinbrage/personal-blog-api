import request from 'supertest'
import { app } from '../server'
import { loadJSON } from '../utils/templates'
import { userMock, artileMock, sectionMock } from './mockData'
import { type SectionType } from '../types/sections'

let userId: number
let articleId: number
let sectionId: number
let token: string

export default (RESOURCE: string) => {
    const USER_RESOURCE = RESOURCE.replace('/section', '/user')  
    const ARTICLE_RESOURCE = RESOURCE.replace('/section', '/article')  

    describe('Get access and user, article data for sections route', () => {
        
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
        
        test('should GET ID from users account', async () => {
            const response = await request(app)
                .get(`${USER_RESOURCE}/data`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
            userId = response.body.result.data[0].id
        })  

        test('should GET ARTICLE-ID from new article user', async () => {
            await request(app)
                .post(ARTICLE_RESOURCE)
                .set('Authorization', `Bearer ${token}`)
                .send(artileMock.newArticle)
                .expect(201)
            
            const response = await request(app)
                .get(ARTICLE_RESOURCE)
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
            articleId = response.body.result.data[0].id
        })
    })

    describe('Test create new section in article post', () => {

        test('should POST new section', async () => {
            await request(app)
                .post(RESOURCE)
                .set('Authorization', `Bearer ${token}`)
                .send(sectionMock.newSectionStyles(articleId))
                .expect(201)
        })

        test('should READ changes and GET SECTION-ID from new section', async () => {
            const response = await request(app)
                .get(RESOURCE)
                .query({ article_id_query: articleId })
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
            sectionId = response.body.result.data[0].id

            expect(response.body.result.data[0])
               .toMatchObject(sectionMock.newSectionStyles(articleId))
        })
    })

    describe('Test update new section in article post', () => {
       
        test('should PUT data of new section', async () => {
            await request(app)
                .put(RESOURCE)
                .set('Authorization', `Bearer ${token}`)
                .send(sectionMock.changeStyles(sectionId))
                .expect(200)
        })

        test('should READ data from changed section', async () => {
            const response = await request(app)
                .get(RESOURCE)
                .query({ article_id_query: articleId })
                .set('Authorization', `Bearer ${token}`)
                .expect(200)

            expect(response.body.result.data[0])
               .toMatchObject(sectionMock.changeStyles(sectionId))
        })
    })

    describe('Test delete new section in article post', () => {
        
        test('should DELETE new section', async () => {
            await request(app)
                .delete(RESOURCE)
                .set('Authorization', `Bearer ${token}`)
                .send({ id: sectionId })
                .expect(200)
        })

        test('should READ no data from deleted section', async () => {
            const response = await request(app)
                .get(RESOURCE)
                .query({ article_id_query: articleId })
                .set('Authorization', `Bearer ${token}`)
                .expect(200)

            expect(response.body.result.data).toHaveLength(0)
        })
    })

    describe('Test new section template in article post', () => {
        
        const templateName = 'test'

        test('should POST new template', async () => {
            await request(app)
                .post(`${RESOURCE}/template`)
                .set('Authorization', `Bearer ${token}`)
                .send({ article_id: articleId, template_option: templateName })
                .expect(201)
        })

        test('should READ new sections added', async () => {
            const response = await request(app)
                .get(RESOURCE)
                .query({ article_id_query: articleId })
                .set('Authorization', `Bearer ${token}`)
                .expect(200)

            const templateTest = await loadJSON(templateName) as SectionType['noIdData']

            expect(response.body.result.data).toHaveLength(templateTest.length)

            templateTest.forEach((elem, index) => {
                expect(response.body.result.data[index])
                    .toMatchObject({ article_id: articleId, ...elem })
            })
        })
    })

    describe('Test setup new fresh article for the next test', () => {
        
        test('should DELETE new article', async () => {
            await request(app)
                .delete(ARTICLE_RESOURCE)
                .set('Authorization', `Bearer ${token}`)
                .send({ id: articleId })
                .expect(200)
        })

        test('should GET ARTICLE-ID from new article user', async () => {
            await request(app)
                .post(ARTICLE_RESOURCE)
                .set('Authorization', `Bearer ${token}`)
                .send(artileMock.newArticle)
                .expect(201)
            
            const response = await request(app)
                .get(ARTICLE_RESOURCE)
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
            articleId = response.body.result.data[0].id
        })
    })
    
    describe('Test new multiple sections in article post', () => {
        
        test('should POST new multiple sections', async () => {
            await request(app)
                .post(`${RESOURCE}/multiple`)
                .set('Authorization', `Bearer ${token}`)
                .send(sectionMock.newMultpleSections(articleId))
                .expect(201)
        })

        test('should READ new sections added', async () => {
            const response = await request(app)
                .get(RESOURCE)
                .query({ article_id_query: articleId })
                .set('Authorization', `Bearer ${token}`)
                .expect(200)

            const newSections = sectionMock.newMultpleSections(articleId)

            expect(response.body.result.data).toHaveLength(newSections.length)

            newSections.forEach((elem, index) => {
                expect(response.body.result.data[index]).toMatchObject(elem)
            })
        })
    })
    
    describe('Delete new article and user for next tests', () => {

        test('should DELETE new article', async () => {
            await request(app)
                .delete(ARTICLE_RESOURCE)
                .set('Authorization', `Bearer ${token}`)
                .send({ id: articleId })
                .expect(200)
        })

        test('should DELETE new user', async () => {
            await request(app)
                .delete(`${USER_RESOURCE}/data`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
        })
    })
}