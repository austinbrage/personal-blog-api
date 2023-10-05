const express = require('../controllers/Users')
const UserController = require('../controllers/Users')

const createUserRouter = ({ userModel }) => {
    const userRouter = express.Router()

    const userController = new UserController({ userModel })

    userRouter.get('/', userController.getUser)
    userRouter.get('/validate', userController.getUserPassword)

    userRouter.post('/', userController.insertNewUser)

    userRouter.delete('/', userController.deleteUser)
}

module.exports = createUserRouter