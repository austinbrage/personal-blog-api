import { SafeParseReturnType } from 'zod';
import { userSchema, userPasswordSchema } from '../schemas/users'
import { type userType, type userPasswordType } from '../types/users';

export interface IUsersValidation {
    name(data: unknown): SafeParseReturnType<unknown, userType>
    nameAndPassword(data: unknown): SafeParseReturnType<unknown, userPasswordType>
}

export class UsersValidation implements IUsersValidation {
    private userSchema: typeof userSchema
    private userPasswordSchema: typeof userPasswordSchema

    constructor() {
        this.userSchema = userSchema
        this.userPasswordSchema = userPasswordSchema
    }

    name(data: unknown) {
        return this.userSchema.safeParse(data)
    }

    nameAndPassword(data: unknown) {
        return this.userPasswordSchema.safeParse(data)
    }
}