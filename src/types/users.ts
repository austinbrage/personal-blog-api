import { z } from 'zod'
import { userSchema } from '../schemas/users'
import { RowDataPacket } from 'mysql2'

export type UserType = {
    id: z.infer<typeof userSchema.id>,
    data: z.infer<typeof userSchema.data>,
    name: z.infer<typeof userSchema.name>,
    idName: z.infer<typeof userSchema.idName>,
    idEmail: z.infer<typeof userSchema.idEmail>,
    idPhone: z.infer<typeof userSchema.idPhone>,
    idAuthor: z.infer<typeof userSchema.idAuthor>,
    idPassword: z.infer<typeof userSchema.idPassword>,
}

export interface IUser {
    getAll({ id }: UserType['id']): Promise<RowDataPacket[]>
    getPassword({ name }: UserType['name']): Promise<RowDataPacket[]>
    
    changeName({ id, name }: UserType['idName']): Promise<RowDataPacket[]>
    changeEmail({ id, email }: UserType['idEmail']): Promise<RowDataPacket[]>
    changePhone({ id, phone }: UserType['idPhone']): Promise<RowDataPacket[]>
    changeAuthor({ id, author }: UserType['idAuthor']): Promise<RowDataPacket[]>
    changePassword({ id, password }: UserType['idPassword']): Promise<RowDataPacket[]>
    
    remove({ id }: UserType['id']): Promise<RowDataPacket[]>
    addNew({ name, password, author, email, phone }: UserType['data']): Promise<RowDataPacket[]>
}