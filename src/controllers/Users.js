const asyncErrorHandler = require('../utils/errorHandler')
const userValidation = require('../validations/Users')

class Users {
    constructor({ userModel }) {
        this.userModel = userModel
        this.validateUser = new userValidation()
    }

    getUser = asyncErrorHandler(async (req, res, next) => {
        // const { user } = req.query
        const validation = this.validateUser.name(req.query)

        if(validation.success) {
            const userName = await this.userModel.getUser(validation.data)
    
            res.satus(200).json({
                success: 'success',
                data: {
                    userName
                }
            })
        } else {
            res.status(400).json({
                success: 'error',
                validationError: validation.error
            })
        }
    })
    
    getUserPassword = asyncErrorHandler(async (req, res, next) => {
        // const { user, password } = req.query
        const validation = this.validateUser.nameAndPassword(req.query)

        if(validation.success) {
            const userName = await this.userModel.getUserPassword(validation.data)
    
            res.satus(200).json({
                success: 'success',
                data: {
                    userName
                }
            })
        } else {
            res.status(400).json({
                success: 'error',
                validationError: validation.error
            })
        }
    })

    insertNewUser = asyncErrorHandler(async (req, res, next) => {
        // const { user, password } = req.body
        const validation = this.validateUser.nameAndPassword(req.query)

        if(validation.success) {
            const result = await this.userModel.insertNewUser(validation.data)
    
            res.status(200).json({
                success: 'success',
                result
            })
        } else {
            res.status(400).json({
                success: 'error',
                validationError: validation.error
            })
        }
    })

    deleteUser = asyncErrorHandler(async (req, res, next) => {
        // const { user, password } = req.body
        const validation = this.validateUser.nameAndPassword(req.query)

        if(validation.success) {
            const result = await this.userModel.deleteUser(validation.data)
    
            res.status(200).json({
                success: 'success',
                result
            })
        } else {
            res.status(400).json({
                success: 'error',
                validationError: validation.error
            })
        }
    })
}