import { z } from 'zod'
import { userSchema, userPasswordSchema } from '../schemas/users.ts'

export type userType = z.infer<typeof userSchema>
export type userPasswordType = z.infer<typeof userPasswordSchema>

export interface IUser {
    getUser({ user }: UserType): Promise<RowDataPacket[]>
    getUserPassword({ user, password }: UserPasswordType): Promise<RowDataPacket[]>
    insertNewUser({ user, password }: UserPasswordType): Promise<RowDataPacket[]>
    deleteUser({ user, password }: UserPasswordType): Promise<RowDataPacket[]>  
} 