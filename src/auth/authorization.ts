import { verify } from 'jsonwebtoken'
import { SECRET_KEY } from '../utils/config'
import { CustomError } from '../helpers/customError'
import { type JwtPayload } from '../types/custom'
import { type RequestHandler } from 'express'

const createAuthorization = () => {
    const authMiddleware: RequestHandler = async (req, _res, next) => {
        const authContent = req.headers.authorization

        if(!authContent) return next(new CustomError('Missing Authorization Header', 404))

        const token = authContent.split(' ')[1]

        if(!token) return next(new CustomError('Unauthorized, please login', 401))
        if(!SECRET_KEY) return next(new CustomError('Secret Key is not provided in the API', 500))
    
        try {
            const verifyUser = await verify(token, SECRET_KEY) as JwtPayload
            req.userId = { id: verifyUser.id }
            next()
        } catch(err) {
            return next(new CustomError('Invalid Token', 401))
        }
    }

    return authMiddleware
}

export default createAuthorization