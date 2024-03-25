import request from 'supertest'
import { app } from '../server'
import { resolve } from 'path'
import { createReadStream } from 'fs'
import { loadJSON } from '../utils/templates'
import { UserRoutes as U } from '../types/users'
import { ArticleRoutes as A } from '../types/articles'
import { SectionRoutes as S } from '../types/sections'
import { userMock, artileMock, sectionMock, USER, ARTICLE, SECTION } from './mockData'
import { type SectionType } from '../types/sections'

let sequenceData: SectionType['idSequenceData']
let sectionData: SectionType['id'][]
let sectionIdS3: number
let sectionId: number
let articleId: number
let imageName: string
let token: string

const imagePath = resolve(__dirname, '../../public/image-test.png')

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

    describe('Test create new section in article post with url image', () => {

        test('should POST new section', async () => {
            await request(app)
                .post(SECTION(S.EMPTY))
                .set('Authorization', `Bearer ${token}`)
                .send(sectionMock.newSectionStyles1(articleId))
                .expect(201)
        })

        test('should READ changes and GET SECTION-ID from new section', async () => {
            const response = await request(app)
                .get(SECTION(S.EMPTY))
                .query({ article_id_query: articleId })
                .expect(200)
            sectionId = response.body.result.data[0].id

            expect(response.body.result.data[0])
                .toMatchObject(sectionMock.newSectionStyles1(articleId))
        })
    })

    describe('Test update new section in article post with url image', () => {
       
        test('should PUT data of new section', async () => {
            await request(app)
                .put(SECTION(S.EMPTY))
                .set('Authorization', `Bearer ${token}`)
                .send(sectionMock.changeStyles1(sectionId))
                .expect(200)
        })

        test('should READ data from changed section', async () => {
            const response = await request(app)
                .get(SECTION(S.EMPTY))
                .query({ article_id_query: articleId })
                .expect(200)

            expect(response.body.result.data[0])
                .toMatchObject(sectionMock.changeStyles1(sectionId))
        })
    })

    describe('Test create new section in article post with s3 image', () => {

        test('should POST new section', async () => {
            await request(app)
                .post(SECTION(S.DATAS3))
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', `multipart/form-data`)
                .field('image', createReadStream(imagePath))
                .field('article_id', sectionMock.newSectionStyles2(articleId).article_id)
                .field('content', sectionMock.newSectionStyles2(articleId).content)
                .field('width', sectionMock.newSectionStyles2(articleId).width)
                .field('height', sectionMock.newSectionStyles2(articleId).height)
                .field('font_family', sectionMock.newSectionStyles2(articleId).font_family)
                .field('font_size', sectionMock.newSectionStyles2(articleId).font_size)
                .field('font_weight', sectionMock.newSectionStyles2(articleId).font_weight)
                .field('line_height', sectionMock.newSectionStyles2(articleId).line_height)
                .field('margin_top', sectionMock.newSectionStyles2(articleId).margin_top)
                .field('text_align', sectionMock.newSectionStyles2(articleId).text_align)
                .field('text_color', sectionMock.newSectionStyles2(articleId).text_color)
                .field('border_radius', sectionMock.newSectionStyles2(articleId).border_radius)
                .expect(201)
        })

        test('should READ changes and GET SECTION-ID from new section', async () => {
            const response = await request(app)
                .get(SECTION(S.EMPTY))
                .query({ article_id_query: articleId })
                .expect(200)
            sectionIdS3 = response.body.result.data[1].id
            imageName = response.body.result.data[1].image

            expect(response.body.result.data[1]).toMatchObject(expect.objectContaining({
                ...sectionMock.newSectionStyles2(articleId),
                image: expect.anything(),
                content_type: 'image_s3'
            }))
        })

        test('should READ image signed URL', async () => {
            const response = await request(app)
                .get(SECTION(S.DATAS3))
                .set('Authorization', `Bearer ${token}`)
                .query({ image: imageName })
                .expect(200)

            expect(response.body?.result?.data[0]?.imageSignedUrl).toMatch(/^https:/)
        })
    })

    describe('Test update new section in article post with s3 image', () => {
       
        test('should PUT data of new section', async () => {
            await request(app)
                .put(SECTION(S.DATAS3))
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', `multipart/form-data`)
                .field('image', createReadStream(imagePath))
                .field('id', sectionMock.changeStyles2(sectionIdS3).id)
                .field('content', sectionMock.changeStyles2(sectionIdS3).content)
                .field('width', sectionMock.changeStyles2(sectionIdS3).width)
                .field('height', sectionMock.changeStyles2(sectionIdS3).height)
                .field('font_family', sectionMock.changeStyles2(sectionIdS3).font_family)
                .field('font_size', sectionMock.changeStyles2(sectionIdS3).font_size)
                .field('font_weight', sectionMock.changeStyles2(sectionIdS3).font_weight)
                .field('line_height', sectionMock.changeStyles2(sectionIdS3).line_height)
                .field('margin_top', sectionMock.changeStyles2(sectionIdS3).margin_top)
                .field('text_align', sectionMock.changeStyles2(sectionIdS3).text_align)
                .field('text_color', sectionMock.changeStyles2(sectionIdS3).text_color)
                .field('border_radius', sectionMock.changeStyles2(sectionIdS3).border_radius)
                .expect(200)
        })

        test('should READ data from changed section', async () => {
            const response = await request(app)
                .get(SECTION(S.EMPTY))
                .query({ article_id_query: articleId })
                .expect(200)

            expect(response.body.result.data[1]).toMatchObject(expect.objectContaining({
                ...sectionMock.changeStyles2(sectionIdS3),
                image: expect.anything(),
                content_type: 'image_s3'
            }))
        })
    })

    describe('Test delete new section in article post', () => {
        
        test('should DELETE new url section', async () => {
            await request(app)
                .delete(SECTION(S.EMPTY))
                .set('Authorization', `Bearer ${token}`)
                .send({ id: sectionId })
                .expect(200)
        })
        
        test('should DELETE new s3 section', async () => {
            await request(app)
                .delete(SECTION(S.EMPTY))
                .set('Authorization', `Bearer ${token}`)
                .send({ id: sectionIdS3 })
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