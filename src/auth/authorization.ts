import { verify } from 'jsonwebtoken'
import { SECRET_KEY } from '../utils/config'
import { CustomError } from '../utils/customError'
import { type UserType } from '../types/users'
import { type JwtPayload } from '../types/custom'
import { type RequestHandler } from 'express'

const createAuthorization = () => {
    const authMiddleware: RequestHandler = async (req, _res, next) => {
        const { token }: { token?: string } = req.cookies
    
        if(!token) return next(new CustomError('Unauthorized, please login', 401))
        if(!SECRET_KEY) return next(new CustomError('Secret Key is not provided in the API', 500))
    
        const verifyUser = await verify(token, SECRET_KEY) as JwtPayload
        // const userModelData = await userModel.getAll({id: verifyUser.id})
    
        const userData: UserType['id'] = {
            id: verifyUser.id,
            // name: userModelData[0].name,
        }

        req.userId = userData

        next()
    }

    return authMiddleware
}

export default createAuthorization