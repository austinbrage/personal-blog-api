import { verify } from 'jsonwebtoken'
import { SECRET_KEY } from '../utils/config'
import { CustomError } from '../utils/customError'
import { type JwtPayload } from '../types/custom'
import { type UserType, type IUser } from '../types/users'
import { type RequestHandler } from 'express'

const createAuthorization = ({ userModel }: { userModel: IUser }) => {
    const authMiddleware: RequestHandler = async (req, _res, next) => {
        const { token }: { token?: string } = req.cookies
    
        if(!token) return next(new CustomError('Unauthorized, please login', 401))
        if(!SECRET_KEY) return next(new CustomError('Secret Key is not provided in the API', 500))
    
        const verifyUser = await verify(token, SECRET_KEY) as JwtPayload
        const userModelData = await userModel.getAll({id: verifyUser.id})
    
        const userData: UserType['data'] = {
            name: userModelData[0].name,
            password: userModelData[0].password,
            author: userModelData[0].author,
            email: userModelData[0].email,
            phone: userModelData[0].phone
        }

        req.currentUser = userData

        next()
    }

    return authMiddleware
}

export default createAuthorization