import { Router } from 'express'
import { Users as UserController } from '../controllers/Users'
import createAuthorization from '../auth/authorization'
import { UserRoutes as U, type IUser } from '../types/users'

const createUserRouter = ({ userModel }: { userModel: IUser }) => {
    const userRouter = Router()

    const adminAuth = createAuthorization('ADMIN')
    const userController = new UserController({ userModel })
    
    userRouter.get(U.DATA,       adminAuth, userController.getAll)
    
    userRouter.patch(U.NAME,     adminAuth, userController.changeName)
    userRouter.patch(U.EMAIL,    adminAuth, userController.changeEmail)
    userRouter.patch(U.AUTHOR,   adminAuth, userController.changeAuthor)
    userRouter.patch(U.PASSWORD, adminAuth, userController.changePassword)
    
    userRouter.post(U.REGISTER,  userController.addNew)
    userRouter.post(U.LOGIN,     userController.getPassword)
    userRouter.post(U.OAUTH,     userController.openAuth)
    userRouter.post(U.KEY,       userController.getId)

    userRouter.delete(U.DATA,    adminAuth, userController.remove)

    return userRouter
}

export default createUserRouter