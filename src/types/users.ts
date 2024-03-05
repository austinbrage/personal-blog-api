import { z } from 'zod'
import { userSchema, authSchema } from '../schemas/users'
import { type AsyncFunction } from '../services/errorHandler'
import { type RowDataPacket, type ResultSetHeader } from 'mysql2'

export type UserType = {
    id: z.infer<typeof userSchema.id>
    data: z.infer<typeof userSchema.data>
    name: z.infer<typeof userSchema.name>
    email: z.infer<typeof userSchema.email>
    author: z.infer<typeof userSchema.author>
    apiKey: z.infer<typeof userSchema.apiKey>
    idName: z.infer<typeof userSchema.idName>
    idEmail: z.infer<typeof userSchema.idEmail>
    idAuthor: z.infer<typeof userSchema.idAuthor>
    idPassword: z.infer<typeof userSchema.idPassword>
    namePassword: z.infer<typeof userSchema.namePassword>
    authInfoData: z.infer<typeof authSchema.authInfoData>
    authEmail: z.infer<typeof userSchema.authEmail> 
    authData: z.infer<typeof userSchema.authData> 
    fullData: z.infer<typeof userSchema.fullData>
}

export interface IUser {
    getAll({ id }: UserType['id']): Promise<RowDataPacket[]>
    getName({ name }: UserType['name']): Promise<RowDataPacket[]>
    getEmail({ email }: UserType['email']): Promise<RowDataPacket[]>
    getAuthor({ author }: UserType['author']): Promise<RowDataPacket[]>
    getId({ api_key }: UserType['apiKey']): Promise<RowDataPacket[]>
    getByEmail({ email }: UserType['email']): Promise<RowDataPacket[]>
    getIdPassword({ name }: UserType['name']): Promise<RowDataPacket[]>
    getByExternalID({ auth_provider, external_id }: UserType['authData']): Promise<RowDataPacket[]>
    changeName({ id, name }: UserType['idName']): Promise<ResultSetHeader>
    changeEmail({ id, email }: UserType['idEmail']): Promise<ResultSetHeader>
    changeAuthor({ id, author }: UserType['idAuthor']): Promise<ResultSetHeader>
    changePassword({ id, password }: UserType['idPassword']): Promise<ResultSetHeader>
    changeExternalID({ auth_provider, external_id, email }: UserType['authEmail']): Promise<ResultSetHeader>
    addNew({ name, password, email, author, auth_provider, external_id }: UserType['fullData']): Promise<ResultSetHeader>
    remove({ id }: UserType['id']): Promise<ResultSetHeader>
}

export interface UserController {
    getId: AsyncFunction
    getAll: AsyncFunction
    getPassword: AsyncFunction
    changeName: AsyncFunction
    changeEmail: AsyncFunction
    changeAuthor: AsyncFunction
    changePassword: AsyncFunction
    remove: AsyncFunction
    addNew: AsyncFunction
    openAuth: AsyncFunction
}

export enum UserRoutes {
    DATA = '/data',
    NAME = '/name',
    EMAIL = '/email',
    AUTHOR = '/author',
    PASSWORD = '/password',
    REGISTER = '/register',
    LOGIN = '/login',
    OAUTH = '/oauth',
    KEY = '/key',
}