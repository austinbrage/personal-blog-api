import { userQueries, articleQueries, sectionQueries, styleQueries } from '../utils/queries'
import { UserQueries, ArticleQueries, SectionQueries, StyleQueries } from '../types/queries'

describe('Test all SQL queries get by the queries utility', () => {
    
    describe('When the utility get the users table sql queries', () => {
        let allQueriesChecked: boolean = true

        for (const query of Object.keys(userQueries)) {
            if(!(query in UserQueries)) {
                console.error(`Error: The query ${query} does not exist on users sql queries`)
                allQueriesChecked = false
            } 
        }

        test('should all be present in the users queries enum type', () => {
            expect(allQueriesChecked).toBe(true)
        })
    })
    
    describe('When the utility get the articles table sql queries', () => {
        let allQueriesChecked: boolean = true

        for (const query of Object.keys(articleQueries)) {
            if(!(query in ArticleQueries)) {
                console.error(`Error: The query ${query} does not exist on articles sql queries`)
                allQueriesChecked = false
            } 
        }

        test('should all be present in the articles queries enum type', () => {
            expect(allQueriesChecked).toBe(true)
        })
    })
    
    describe('When the utility get the sections table sql queries', () => {
        let allQueriesChecked: boolean = true

        for (const query of Object.keys(sectionQueries)) {
            if(!(query in SectionQueries)) {
                console.error(`Error: The query ${query} does not exist on section sql queries`)
                allQueriesChecked = false
            } 
        }

        test('should all be present in the sections queries enum type', () => {
            expect(allQueriesChecked).toBe(true)
        })
    })
    
    describe('When the utility get the styles table sql queries', () => {
        let allQueriesChecked: boolean = true

        for (const query of Object.keys(styleQueries)) {
            if(!(query in StyleQueries)) {
                console.error(`Error: The query ${query} does not exist on styles sql queries`)
                allQueriesChecked = false
            } 
        }

        test('should all be present in the styles queries enum type', () => {
            expect(allQueriesChecked).toBe(true)
        })
    })
})