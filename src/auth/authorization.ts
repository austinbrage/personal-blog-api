import { verify } from 'jsonwebtoken'
import { SECRET_KEY } from '../utils/config'
import { CustomError } from '../utils/customError'
import { type JwtPayload } from '../types/custom'
import { type IUser } from '../types/users'
import type { Request, NextFunction } from 'express'

const createAuthorization = ({ userModel }: { userModel: IUser }) => {
    const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
        const { token }: { token?: string } = req.cookies
    
        if(!token) return next(new CustomError('Unauthorized, please login', 401))
        if(!SECRET_KEY) return next(new CustomError('Secret Key is not provided in the API', 500))
    
        const verifyUser = await verify(token, SECRET_KEY) as JwtPayload
        req.userData = await userModel.getAll({id: verifyUser.id})
    
        next()
    }

    return authMiddleware
}

export default createAuthorization