import { verify } from 'jsonwebtoken'
import { SECRET_KEY } from '../utils/config'
import { CustomError } from '../helpers/customError'
import type { RequestHandler } from 'express'
import type { UserRoles, JwtPayload } from '../types/api'

const createAuthorization = (requiredPermission: UserRoles) => {
    
    const authMiddleware: RequestHandler = async (req, _res, next) => {
        const authContent = req.headers.authorization

        if(!authContent) return next(new CustomError('Missing Authorization Header', 401))

        const token = authContent.split(' ')[1]

        if(!token) return next(new CustomError('Unauthorized, please login', 401))
        if(!SECRET_KEY) return next(new CustomError('Secret Key is not provided in the API', 500))
    
        try {
            const verifyUser = await verify(token, SECRET_KEY) as JwtPayload

            if(!verifyUser?.id || isNaN(verifyUser?.id)) {
                return next(new CustomError('Token does not contain a valid user ID', 401))
            }

            if (!verifyUser?.roles || !verifyUser?.roles.includes(requiredPermission)) {
                return next(new CustomError('Unauthorized, insufficient privileges', 403));
            }

            req.userId = { id: verifyUser.id }
            next()
        } catch(err) {
            return next(new CustomError('Invalid Token', 401))
        }
    }

    return authMiddleware
}

export default createAuthorization