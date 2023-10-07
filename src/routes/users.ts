import { Router } from '../controllers/Users'
import UserController from '../controllers/Users'

const createUserRouter = ({ userModel }) => {
    const userRouter = Router()

    const userController = new UserController({ userModel })

    userRouter.get('/', userController.getUserPassword)
    userRouter.post('/', userController.insertNewUser)
    userRouter.delete('/', userController.deleteUser)

    return userRouter
}

export default createUserRouter