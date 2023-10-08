import { Router } from 'express'
import { Users as UserController } from '../controllers/Users'
import { type IUser } from '../types/users'

const createUserRouter = ({ userModel }: { userModel: IUser }) => {
    const userRouter = Router()

    const userController = new UserController({ userModel })

    userRouter.get('/all', userController.getAll)
    userRouter.get('/validate', userController.getPassword)

    userRouter.patch('/name', userController.changeName)
    userRouter.patch('/email', userController.changeEmail)
    userRouter.patch('/phone', userController.changePhone)
    userRouter.patch('/author', userController.changeAuthor)
    userRouter.patch('/password', userController.changePassword)

    userRouter.post('/', userController.addNew)
    userRouter.delete('/', userController.remove)

    return userRouter
}

export default createUserRouter