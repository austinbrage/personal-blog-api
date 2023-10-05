const express = require('../controllers/Users')
const UserController = require('../controllers/Users')

const createUserRouter = ({ userModel }) => {
    const userRouter = express.Router()

    const userController = new UserController({ userModel })

    userRouter.get('/user', userController.getUser)
    userRouter.get('/user/validate', userController.getUserPassword)

    userRouter.post('/user', userController.insertNewUser)

    userRouter.delete('/user', userController.deleteUser)
}

module.exports = createUserRouter