import { z } from 'zod'
import { userSchema } from '../schemas/users'
import { type RowDataPacket } from 'mysql2'
import { AsyncFuntion } from '../utils/errorHandler'

export type UserType = {
    id: z.infer<typeof userSchema.id>,
    data: z.infer<typeof userSchema.data>,
    idName: z.infer<typeof userSchema.idName>,
    idEmail: z.infer<typeof userSchema.idEmail>,
    idPhone: z.infer<typeof userSchema.idPhone>,
    idAuthor: z.infer<typeof userSchema.idAuthor>,
    idPassword: z.infer<typeof userSchema.idPassword>,
    namePassword: z.infer<typeof userSchema.namePassword>
}

export interface IUser {
    getAll({ id }: UserType['id']): Promise<RowDataPacket[]>
    getPassword({ name, password }: UserType['namePassword']): Promise<RowDataPacket[]>
    changeName({ id, name }: UserType['idName']): Promise<RowDataPacket[]>
    changeEmail({ id, email }: UserType['idEmail']): Promise<RowDataPacket[]>
    changePhone({ id, phone }: UserType['idPhone']): Promise<RowDataPacket[]>
    changeAuthor({ id, author }: UserType['idAuthor']): Promise<RowDataPacket[]>
    changePassword({ id, password }: UserType['idPassword']): Promise<RowDataPacket[]>
    remove({ id }: UserType['id']): Promise<RowDataPacket[]>
    addNew({ name, password, email, phone, author }: UserType['data']): Promise<RowDataPacket[]>
}

export interface UserController {
    getAll: AsyncFuntion
    getPassword: AsyncFuntion
    changeName: AsyncFuntion
    changeEmail: AsyncFuntion
    changePhone: AsyncFuntion
    changeAuthor: AsyncFuntion
    changePassword: AsyncFuntion
    remove: AsyncFuntion
    addNew: AsyncFuntion
}