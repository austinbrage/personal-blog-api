import { type UserType } from "../types/users"

type UserMock = {
    signUp: UserType['data']
    newUser: UserType['namePassword']
    badUser: UserType['namePassword']
    badPassword: UserType['namePassword']
    badData: UserType['namePassword']
    rightData: UserType['namePassword']
}

export const userMock: UserMock = {
    signUp: { 
        name: 'Usuario2', 
        password: '5678', 
        email: 'myEmail@gmail.com',
        phone: '1234-5678',
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