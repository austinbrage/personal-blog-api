const asyncErrorHandler = require('../utils/errorHandler')

class Users {
    constructor({ userModel }) {
        this.userModel = userModel
    }

    getUser = asyncErrorHandler(async (req, res, next) => {
        const { user } = req.query

        const userName = await this.userModel.getUser({ user })

        res.satus(200).json({
            success: 'success',
            data: {
                userName
            }
        })
    })
    
    getUserPassword = asyncErrorHandler(async (req, res, next) => {
        const { user, password } = req.query

        const userName = await this.userModel.getUserPassword({ user, password })

        res.satus(200).json({
            success: 'success',
            data: {
                userName
            }
        })
    })

    insertNewUser = asyncErrorHandler(async (req, res, next) => {
        const { user, password } = req.body

        const result = await this.userModel.insertNewUser({ user, password })

        res.status(200).json({
            success: 'success',
            result
        })
    })

    deleteUser = asyncErrorHandler(async (req, res, next) => {
        const { user, password } = req.body

        const result = await this.userModel.deleteUser({ user, password })

        res.status(200).json({
            success: 'success',
            result
        })
    })
}