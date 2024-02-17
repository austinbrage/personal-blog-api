import bcript from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { CustomError } from '../helpers/customError'
import type { IUser, UserType } from '../types/users'
import type { Response, NextFunction } from 'express'
import { OAuth2Client } from 'google-auth-library'
import { CLIENT_ID, CLIENT_SECRET, ENVIRONMENT } from '../utils/config'
import { JWT_EXPIRE, SECRET_KEY } from '../utils/config'
import { createOkResponse, createErrorResponse } from '../helpers/appResponse'

type Data = {
    modelResult: UserType['idPassword']
    validatedData: UserType['namePassword']
}

const createAuthentication = ({ userModel }: { userModel: IUser }) => {
    
    const googleClient = new OAuth2Client(CLIENT_ID, CLIENT_SECRET)

    const fakeSignOAuth = async (data: UserType['authInfoData'], res: Response, next: NextFunction) => {
       
        const userData = {
            id:        data.code,
            author:   'Fake email author name', 
            email:    'Fake email address', 
            name:     'Fake email name', 
            password:  Math.random().toString(36).substring(7),
            auth_provider: data.auth_provider,
            external_id: data.code
        }

        const result = await userModel.getByExternalID({
            auth_provider: data.auth_provider,
            external_id: userData.id
        })

        if(result.length > 0) return signWithoutHash(result[0].id, res, next)

        return registerHash(userData, res, next)     
    }

    const overwriteHash = async (data: UserType['idPassword'], res: Response) => {
        
        const salt = await bcript.genSalt(10)
        const hashPassword = await bcript.hash(data.password, salt)

        await userModel.changePassword({ id: data.id, password: hashPassword })

        return res.status(200).json(createOkResponse({
            message: 'User password changed successfully'
        }))
    }

    const registerHash = async (data: UserType['fullData'], res: Response, next: NextFunction) => {

        const salt = await bcript.genSalt(10)
        const hashPassword = await bcript.hash(data.password, salt)
       
        const newData: UserType['fullData'] = {
            ...data,
            password: hashPassword
        }

        if(!SECRET_KEY) return next(new CustomError('Secret key is not provided in the API', 500))

        const newId = await userModel.addNew(newData)
        const token = await sign({ id: newId }, SECRET_KEY, {
            expiresIn: JWT_EXPIRE
        })

        return res.status(201).json(createOkResponse({
            message: 'User registered successfully',
            token: token
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

        return res.status(200).json(createOkResponse({
            message: 'User validated successfully',
            token: token
        }))
    }

    const signWithoutHash = async (userId: UserType['id'], res: Response, next: NextFunction) => {

        if(!SECRET_KEY) return next(new CustomError('Secret key is not provided in the API', 500))

        const token = sign({id: userId}, SECRET_KEY, {
            expiresIn: JWT_EXPIRE
        })

        return res.status(200).json(createOkResponse({
            message: 'User validated successfully',
            token: token
        }))
    }

    const signWithGoogleID = async (data: UserType['authInfoData'], res: Response, next: NextFunction) => {
       
        if(ENVIRONMENT === 'test') return fakeSignOAuth(data, res, next)

        const { tokens } = await googleClient.getToken({ 
            code: data.code,
            redirect_uri: 'http://localhost:3001'
        })
    
        if(!tokens.id_token) return next(new CustomError('Could not get Google ID Token', 500))

        const ticket = await googleClient.verifyIdToken({
            idToken: tokens.id_token,
            audience: CLIENT_ID,
        })

        const payload = ticket.getPayload()
        
        if(!payload) return next(new CustomError('Could not get Google Data Payload', 500))
        if(!payload.name) return next(new CustomError('Could not get Google Email Name', 500))
        if(!payload.email) return next(new CustomError('Could not get Google Email Address', 500))

        const userData = {
            id:       payload.sub,
            email:    payload.email, 
            author:   payload.name.replace(/\s/g, "-") + '_' + Math.random().toString(36).substring(2, 10), 
            name:     payload.name.replace(/\s/g, "-") + '_' + Math.random().toString(36).substring(2, 10), 
            password: Math.random().toString(36).substring(7),
            auth_provider: data.auth_provider,
            external_id: payload.sub
        }

        const result = await userModel.getByExternalID({
            auth_provider: data.auth_provider,
            external_id: userData.id
        })

        if(result.length > 0) {
            return signWithoutHash(result[0].id, res, next)
        }

        const emailResult = await userModel.getByEmail({ email: userData.email })

        if(emailResult.length > 0) {
            await userModel.changeExternalID(userData)
            return signWithoutHash(emailResult[0].id, res, next)
        }

        return registerHash(userData, res, next)
    }
    
    return { overwriteHash, registerHash, compareHash, signWithoutHash, signWithGoogleID }
}

export default createAuthentication
