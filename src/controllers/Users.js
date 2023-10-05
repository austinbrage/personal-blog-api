const asyncErrorHandler = require('../utils/errorHandler')
const userValidation = require('../validations/Users')

class Users {
    constructor({ userModel }) {
        this.userModel = userModel
        this.validateUser = new userValidation()
    }
    
    getUserPassword = asyncErrorHandler(async (req, res, next) => {
        // const { user, password } = req.query
        const validation = this.validateUser.nameAndPassword(req.query)

        if(validation.success) {
            const result = await this.userModel.getUserPassword(validation.data)
    
            if(result.length === 0) {
                res.satus(401).json({
                    status: 'error',
                    message: 'Incorrect username' 
                })
            } else if(result[0].password !== validation.data.password) {
                res.satus(401).json({
                    status: 'error',
                    message: 'Incorrect password' 
                })
            } else {
                res.satus(200).json({
                    status: 'success',
                    message: 'User validated successfully' 
                })
            }

        } else {
            res.status(400).json({
                status: 'error',
                validationError: validation.error
            })
        }
    })

    insertNewUser = asyncErrorHandler(async (req, res, next) => {
        // const { user, password } = req.body
        const validation = this.validateUser.nameAndPassword(req.query)

        if(validation.success) {
            const userName = await this.userModel.getUser(validation.data.user)
            
            if(userName.length === 0) {
                res.satus(401).json({
                    status: 'error',
                    message: 'Existing user' 
                })
            } else {
                const _result = await this.userModel.insertNewUser(validation.data)
        
                res.status(201).json({
                    status: 'success',
                    message: 'User added successfully'
                })
            }
        } else {
            res.status(400).json({
                status: 'error',
                validationError: validation.error
            })
        }
    })

    deleteUser = asyncErrorHandler(async (req, res, next) => {
        // const { user, password } = req.body
        const validation = this.validateUser.nameAndPassword(req.query)

        if(validation.success) {
            const _result = await this.userModel.deleteUser(validation.data)
    
            res.status(200).json({
                status: 'success',
                message: 'User removed successfully'
            })
        } else {
            res.status(400).json({
                status: 'error',
                validationError: validation.error
            })
        }
    })
}