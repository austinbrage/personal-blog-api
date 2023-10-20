import { type UserType } from "../types/users"
import { type ArticleType } from "../types/articles"

type UserMock = {
    signUp: UserType['data']
    newUser: UserType['namePassword']
    badUser: UserType['namePassword']
    badPassword: UserType['namePassword']
    badData: UserType['namePassword']
    rightData: UserType['namePassword']
}

type ArticleMock = {
    newArticle: ArticleType['userIdName']
}

export const userMock: UserMock = {
    signUp: { 
        name: 'Usuario2', 
        password: '5678', 
        email: 'myEmail@gmail.com',
        author: 'Jack Smith',
    },
    newUser: { 
        name: 'Usuario2', 
        password: '5678' 
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
        name: 'New Article Test',
        user_id: 1
    }
}