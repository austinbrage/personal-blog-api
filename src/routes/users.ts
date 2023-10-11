import { Router } from 'express'
import { Users as UserController } from '../controllers/Users'
import createAuthorization from '../auth/authorization'
import { type IUser } from '../types/users'

const createUserRouter = ({ userModel }: { userModel: IUser }) => {
    const userRouter = Router()

    const userAuth = createAuthorization({ userModel })
    const userController = new UserController({ userModel })
    
    userRouter.get('/all', userAuth, userController.getAll)
    userRouter.get('/validate', userController.getPassword)

    userRouter.patch('/name', userAuth, userController.changeName)
    userRouter.patch('/email', userAuth, userController.changeEmail)
    userRouter.patch('/phone', userAuth, userController.changePhone)
    userRouter.patch('/author', userAuth, userController.changeAuthor)
    userRouter.patch('/password', userAuth, userController.changePassword)

    userRouter.post('/', userController.addNew)
    userRouter.delete('/', userAuth, userController.remove)

    return userRouter
}

export default createUserRouter