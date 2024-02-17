import { z } from 'zod'
import { userSchema, authSchema } from '../schemas/users'
import { type RowDataPacket } from 'mysql2'
import { type AsyncFunction } from '../services/errorHandler'

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
    authData: z.infer<typeof userSchema.authData> 
    fullData: z.infer<typeof userSchema.fullData>
}

export interface IUser {
    getAll({ id }: UserType['id']): Promise<RowDataPacket[]>
    getName({ name }: UserType['name']): Promise<RowDataPacket[]>
    getEmail({ email }: UserType['email']): Promise<RowDataPacket[]>
    getAuthor({ author }: UserType['author']): Promise<RowDataPacket[]>
    getId({ api_key }: UserType['apiKey']): Promise<RowDataPacket[]>
    getIdPassword({ name }: UserType['name']): Promise<RowDataPacket[]>
    getByExternalID({ auth_provider, external_id }: UserType['authData']): Promise<RowDataPacket[]>
    changeName({ id, name }: UserType['idName']): Promise<RowDataPacket[]>
    changeEmail({ id, email }: UserType['idEmail']): Promise<RowDataPacket[]>
    changeAuthor({ id, author }: UserType['idAuthor']): Promise<RowDataPacket[]>
    changePassword({ id, password }: UserType['idPassword']): Promise<RowDataPacket[]>
    addNew({ name, password, email, author, auth_provider, external_id }: UserType['fullData']): Promise<number>
    remove({ id }: UserType['id']): Promise<RowDataPacket[]>
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