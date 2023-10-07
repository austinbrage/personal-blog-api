const request = require('supertest')
const app = require('../server')
import { type idPostType } from "../types"
import { ARTICLES } from "./articleMock"

describe('Article-Route: Create, Update, Read and Delete articles and article sections', () => {
    const RESOURCE = '/blogApi/article'

    //! Post Method on /article 

    describe('Get Method on /article', () => {
        
        describe('Given existing id name and post name', () => {
            const articleData: idPostType = { id: '1', post: 'Artículo 1' }

            test('should return all the sections of the article selected', async () => {
                const response = await request(app).get(RESOURCE).query(articleData)
                expect(response.statusCode).toBe(200)
                expect(response.body.data).toMatchObject(ARTICLES)
            })
        })
    })

    //! Put Method on /article 

    //! Get Method on /article 

    //! Delete Method on /article 

    //! Get Method on /article 

})