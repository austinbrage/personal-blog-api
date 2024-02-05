import { type UserType } from "../types/users"
import { type ArticleType } from "../types/articles"
import { type SectionType } from "../types/sections"

type UserMock = {
    signUp: UserType['data']
    badData: UserType['namePassword']
    badUser: UserType['namePassword']
    badPassword: UserType['namePassword']
    rightData: UserType['namePassword']
    patchData: UserType['data']
    newRightData: UserType['namePassword']
    newData: Omit<UserType['data'], "password">
    userData: Omit<UserType['data'], "password">
}

type ArticleMock = {
    newData: (articleId: number) => ArticleType['idData']
    newArticle: Omit<ArticleType['idData'], "id">
    newArticleSet1: Omit<ArticleType['idData'], "id">[]
    newArticleSet2: Omit<ArticleType['idData'], "id">[]
    newArticleKeywords1: Omit<ArticleType['allDataPageQuery'], "user_id">
    newArticleKeywords2: ArticleType['noUserIdPageQuery']
    allArticles: ArticleType['limitOffsetPageQuery']
    newPublishState: (articleId: number) => ArticleType['idPublishState']
}

type SectionMock = {
    newSectionStyles: (articleId: number) => SectionType['articleIdData']
    changeStyles: (sectionId: number) => SectionType['idData']
    newTemplate: (articleId: number, size: number) => SectionType['articleIdData'][]
}

export const userMock: UserMock = {
    signUp: { 
        name: 'Usuario0', 
        password: '1234', 
        email: 'myEmail@gmail.com',
        author: 'Jack Smith',
    },
    userData: { 
        name: 'Usuario0', 
        email: 'myEmail@gmail.com',
        author: 'Jack Smith',
    },
    patchData: { 
        name: 'Usuario1', 
        password: '1235', 
        email: 'NewEmail@gmail.com',
        author: 'John Jackson',
    },
    newData: { 
        name: 'Usuario1', 
        email: 'NewEmail@gmail.com',
        author: 'John Jackson',
    },
    newRightData: {
        name: 'Usuario1', 
        password: '1235'
    },
    badUser: { 
        name: 'Usuarios0', 
        password: '1234' 
    },
    badPassword: { 
        name: 'Usuario0', 
        password: '1235' 
    },
    badData: { 
        name: 'Usuarios0', 
        password: '1235' 
    },
    rightData: { 
        name: 'Usuario0', 
        password: '1234' 
    }
}

export const artileMock: ArticleMock = {
    newArticle: {
        name: 'My Article Test',
        image: 'https://th.bing.com/th/id/OIP.jaWRCdx3lBfjZuK_dJ_jiwHaEK?rs=1&pid=ImgDetMain',
        title: 'My Title',
        keywords: 'My Keywords',
        description: 'My Description'
    },
    newData: (articleId) => ({
            id: articleId,
            name: 'New Article Name',
            image: 'https://th.bing.com/th/id/OIP.WQuVYA_rOsaqBTIK0TgsXwAAAA?w=280&h=235&rs=1&pid=ImgDetMain',
            title: 'New Article Title',
            keywords: 'New Article Keywords',
            description: 'New Article Description'
    }),
    newPublishState: (articleId) => {
        return {
            id: articleId,
            is_publish: true
        }
    },
    newArticleSet1: [
        {
            name: 'Article 1',
            image: 'https://th.bing.com/th/id/OIP.jaWRCdx3lBfjZuK_dJ_jiwHaEK?rs=1&pid=ImgDetMain',
            title: 'My Title',
            keywords: 'keyword1',
            description: 'My Description'
        },
        {
            name: 'Article 2',
            image: 'https://th.bing.com/th/id/OIP.jaWRCdx3lBfjZuK_dJ_jiwHaEK?rs=1&pid=ImgDetMain',
            title: 'My Title',
            keywords: 'keyword2',
            description: 'My Description'
        }
    ],
    newArticleSet2: [
        {
            name: 'Article 3',
            image: 'https://th.bing.com/th/id/OIP.jaWRCdx3lBfjZuK_dJ_jiwHaEK?rs=1&pid=ImgDetMain',
            title: 'My Title',
            keywords: 'keyword1, keyword2',
            description: 'My Description'
        },
        {
            name: 'Article 4',
            image: 'https://th.bing.com/th/id/OIP.jaWRCdx3lBfjZuK_dJ_jiwHaEK?rs=1&pid=ImgDetMain',
            title: 'My Title',
            keywords: 'keyword2, keyword3',
            description: 'My Description'
        }
    ],
    newArticleKeywords1: {
        limit_query: '10',
        offset_query: '0',
        keywords: ['keyword1']
    },
    newArticleKeywords2: {
        limit_query: '10',
        offset_query: '0',
        keywords: ['keyword2', 'keyword3']
    },
    allArticles: {
        limit_query: '10',
        offset_query: '0'
    }
}

export const sectionMock: SectionMock = {
    newSectionStyles: (articleId: number) => {
        return {
           article_id: articleId,
           content: 'New Article Section',
           content_type: 'paragraph',
           image_url: null,
           width: '90%',
           height: 'auto',
           font_family: 'Verdana',
           font_size: '1.5rem',
           font_weight: 'bold',
           line_height: '1rem',
           margin_top: '0.25rem',
           text_align: 'right',
           text_color: 'white',
           border_radius: '0rem',
        }
    },
    changeStyles: (sectionId: number) => {
        return {
           id: sectionId,
           content: 'Image alt text',
           content_type: 'image',
           image_url: 'https://th.bing.com/th/id/OIP.QI29d315w9fABt0BQCsIwwHaE8?rs=1&pid=ImgDetMain',
           width: '80%',
           height: '95%',
           font_family: 'Monospace',
           font_size: '1.25rem',
           font_weight: 'normal',
           line_height: '1.25rem',
           margin_top: '0.5rem',
           text_align: 'center',
           text_color: 'gray',
           border_radius: '0.25rem'
        }
    },
    newTemplate: (articleId: number, size: number) => {
        return Array.from({ length: size }, (_, index) => {
            return {
                article_id: articleId,
                content: `New Section ${index}`,
                content_type: 'paragraph',
                image_url: null,
                width: '90%',
                height: 'auto',
                font_family: 'Verdana',
                font_size: '1.5rem',
                font_weight: 'bold',
                line_height: '1rem',
                margin_top: '0.25rem',
                text_align: 'right',
                text_color: 'white',
                border_radius: '0rem',
            }
        })
    },
}