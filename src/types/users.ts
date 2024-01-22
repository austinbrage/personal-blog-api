import { z } from 'zod'
import { userSchema } from '../schemas/users'
import { type RowDataPacket } from 'mysql2'
import { type AsyncFunction } from '../services/errorHandler'

export type UserType = {
    id: z.infer<typeof userSchema.id>,
    data: z.infer<typeof userSchema.data>,
    name: z.infer<typeof userSchema.name>,
    email: z.infer<typeof userSchema.email>,
    apiKey: z.infer<typeof userSchema.apiKey>,
    idName: z.infer<typeof userSchema.idName>,
    idEmail: z.infer<typeof userSchema.idEmail>,
    idAuthor: z.infer<typeof userSchema.idAuthor>,
    idPassword: z.infer<typeof userSchema.idPassword>,
    namePassword: z.infer<typeof userSchema.namePassword>
}

export interface IUser {
    getAll({ id }: UserType['id']): Promise<RowDataPacket[]>
    getName({ name }: UserType['name']): Promise<RowDataPacket[]>
    getId({ api_key }: UserType['apiKey']): Promise<RowDataPacket[]>
    getEmail({ email }: UserType['email']): Promise<RowDataPacket[]>
    getIdPassword({ name }: UserType['name']): Promise<RowDataPacket[]>
    changeName({ id, name }: UserType['idName']): Promise<RowDataPacket[]>
    changeEmail({ id, email }: UserType['idEmail']): Promise<RowDataPacket[]>
    changeAuthor({ id, author }: UserType['idAuthor']): Promise<RowDataPacket[]>
    changePassword({ id, password }: UserType['idPassword']): Promise<RowDataPacket[]>
    addNew({ name, password, email, author }: UserType['data']): Promise<number>
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
}