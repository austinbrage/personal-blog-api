import request from 'supertest'
import { app } from '../server'
import { loadJSON } from '../utils/templates'
import { UserRoutes as U } from '../types/users'
import { ArticleRoutes as A } from '../types/articles'
import { SectionRoutes as S } from '../types/sections'
import { userMock, artileMock, sectionMock, USER, ARTICLE, SECTION } from './mockData'
import { type SectionType } from '../types/sections'

let sequenceData: SectionType['idSequenceData']
let sectionData: SectionType['id'][]
let articleId: number
let sectionId: number
let token: string

export default () => {

    describe('Get access and user, article data for sections route', () => {
        
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
        
        test('should GET ID from users account', async () => {
            await request(app)
                .get(USER(U.DATA))
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
        })  

        test('should GET ARTICLE-ID from new article user', async () => {
            await request(app)
                .post(ARTICLE(A.EMPTY))
                .set('Authorization', `Bearer ${token}`)
                .send(artileMock.newArticle)
                .expect(201)
            
            const response = await request(app)
                .get(ARTICLE(A.EMPTY))
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
            articleId = response.body.result.data[0].id
        })
    })

    describe('Test create new section in article post', () => {

        test('should POST new section', async () => {
            await request(app)
                .post(SECTION(S.EMPTY))
                .set('Authorization', `Bearer ${token}`)
                .send(sectionMock.newSectionStyles(articleId))
                .expect(201)
        })

        test('should READ changes and GET SECTION-ID from new section', async () => {
            const response = await request(app)
                .get(SECTION(S.EMPTY))
                .query({ article_id_query: articleId })
                .expect(200)
            sectionId = response.body.result.data[0].id

            expect(response.body.result.data[0])
               .toMatchObject(sectionMock.newSectionStyles(articleId))
        })
    })

    describe('Test update new section in article post', () => {
       
        test('should PUT data of new section', async () => {
            await request(app)
                .put(SECTION(S.EMPTY))
                .set('Authorization', `Bearer ${token}`)
                .send(sectionMock.changeStyles(sectionId))
                .expect(200)
        })

        test('should READ data from changed section', async () => {
            const response = await request(app)
                .get(SECTION(S.EMPTY))
                .query({ article_id_query: articleId })
                .expect(200)

            expect(response.body.result.data[0])
               .toMatchObject(sectionMock.changeStyles(sectionId))
        })
    })

    describe('Test delete new section in article post', () => {
        
        test('should DELETE new section', async () => {
            await request(app)
                .delete(SECTION(S.EMPTY))
                .set('Authorization', `Bearer ${token}`)
                .send({ id: sectionId })
                .expect(200)
        })

        test('should READ no data from deleted section', async () => {
            const response = await request(app)
                .get(SECTION(S.EMPTY))
                .query({ article_id_query: articleId })
                .expect(200)

            expect(response.body.result.data).toHaveLength(0)
        })
    })

    describe('Test new section template in article post', () => {
        
        const templateName = 'test'

        test('should POST new template', async () => {
            await request(app)
                .post(SECTION(S.TEMPLATE))
                .set('Authorization', `Bearer ${token}`)
                .send({ article_id: articleId, template_option: templateName })
                .expect(201)
        })

        test('should READ new sections added', async () => {
            const response = await request(app)
                .get(SECTION(S.EMPTY))
                .query({ article_id_query: articleId })
                .expect(200)
            sectionData = response.body.result.data

            const templateTest = await loadJSON(templateName) as SectionType['noIdData']

            expect(response.body.result.data).toHaveLength(templateTest.length)

            templateTest.forEach((elem, index) => {
                expect(response.body.result.data[index])
                    .toMatchObject({ article_id: articleId, ...elem })
            })
        })
    })

    describe('Test update section sequence data', () => {

        test('should PUT sequence value of all new sections', async () => {
            sequenceData = sectionMock.changeSequence(sectionData)

            await request(app)
                .put(SECTION(S.SEQUENCE))
                .set('Authorization', `Bearer ${token}`)
                .send(sequenceData)
                .expect(200)
        })

        test('should READ changes on new sections', async () => {
            const response = await request(app)
                .get(SECTION(S.EMPTY))
                .query({ article_id_query: articleId })
                .expect(200)

            expect(response.body.result.data).toEqual(
                expect.arrayContaining(
                    sequenceData.map(data => expect.objectContaining(data))
                )
            )
        })

    })

    describe('Test setup new fresh article for the next test', () => {
        
        test('should DELETE new article', async () => {
            await request(app)
                .delete(ARTICLE(A.EMPTY))
                .set('Authorization', `Bearer ${token}`)
                .send({ id: articleId })
                .expect(200)
        })

        test('should GET ARTICLE-ID from new article user', async () => {
            await request(app)
                .post(ARTICLE(A.EMPTY))
                .set('Authorization', `Bearer ${token}`)
                .send(artileMock.newArticle)
                .expect(201)
            
            const response = await request(app)
                .get(ARTICLE(A.EMPTY))
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
            articleId = response.body.result.data[0].id
        })
    })
    
    describe('Test new multiple sections in article post', () => {
        
        test('should POST new multiple sections', async () => {
            await request(app)
                .post(SECTION(S.MULTIPLE))
                .set('Authorization', `Bearer ${token}`)
                .send(sectionMock.newMultpleSections(articleId))
                .expect(201)
        })

        test('should READ new sections added', async () => {
            const response = await request(app)
                .get(SECTION(S.EMPTY))
                .query({ article_id_query: articleId })
                .expect(200)

            const newSections = sectionMock.newMultpleSections(articleId)

            expect(response.body.result.data).toHaveLength(newSections.length)

            newSections.forEach((elem, index) => {
                expect(response.body.result.data[index]).toMatchObject(elem)
            })
        })
    })
    
    describe('Delete new user for next tests', () => {

        test('should DELETE new user', async () => {
            await request(app)
                .delete(USER(U.DATA))
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
        })
    })
}