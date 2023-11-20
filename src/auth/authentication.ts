import bcript from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { CustomError } from '../helpers/customError'
import type { IUser, UserType } from '../types/users'
import type { Response, NextFunction } from 'express'
import { JWT_EXPIRE, SECRET_KEY } from '../utils/config'
import { createOkResponse, createErrorResponse } from '../helpers/appResponse'

type Data = {
    modelResult: UserType['idPassword']
    validatedData: UserType['namePassword']
}

const createAuthentication = ({ userModel }: { userModel: IUser }) => {

    const overwriteHash = async (data: UserType['idPassword'], res: Response) => {
        
        const salt = await bcript.genSalt(10)
        const hashPassword = await bcript.hash(data.password, salt)

        await userModel.changePassword({ id: data.id, password: hashPassword })

        return res.status(200).json(createOkResponse({
            message: 'User password changed successfully'
        }))
    }

    const registerHash = async (data: UserType['data'], res: Response, next: NextFunction) => {

        const salt = await bcript.genSalt(10)
        const hashPassword = await bcript.hash(data.password, salt)
       
        const newData: UserType['data'] = {
            ...data,
            password: hashPassword
        }

        if(!SECRET_KEY) return next(new CustomError('Secret key is not provided in the API', 500))

        const newId = await userModel.addNew(newData)
        const token = await sign({ id: newId }, SECRET_KEY, {
            expiresIn: JWT_EXPIRE
        })

        res.cookie("token", token, { maxAge: 259200000, sameSite: 'none', httpOnly: true, secure: true })

        return res.status(201).json(createOkResponse({
            message: 'User registered successfully'
        }))
    }

    const compareHash = async (data: Data, res: Response, next: NextFunction) => {

        const isPassowordMatched = await bcript.compare(
            data.validatedData.password,
            data.modelResult.password 
        )

        if(!isPassowordMatched) {
            return res.status(401).json(createErrorResponse({
                message: 'Incorrect password'
            }))
        }

        if(!SECRET_KEY) return next(new CustomError('Secret key is not provided in the API', 500))
        
        const token = sign({id: data.modelResult.id}, SECRET_KEY, {
            expiresIn: JWT_EXPIRE
        })

        res.cookie("token", token, { maxAge: 259200000, sameSite: 'none', httpOnly: true, secure: true })

        return res.status(200).json(createOkResponse({
            message: 'User validated successfully'
        }))
    }

    return { overwriteHash, registerHash, compareHash }
}

export default createAuthentication




