import { ErrorRequestHandler } from "express"
import { type ErrorResponse } from "../types/custom"

const globalErrorMiddleware: ErrorRequestHandler = (error, _req, res, _next) => {
    error.statusCode = error.statusCode || 500 
    error.status = error.status || 'error'
    
    const response: ErrorResponse = {
        success: false,
        error: {
            status: error.status,
            message: error.message,
            validationError: null
        }
    }

    return res.status(error.statusCode).json(response)
}

export default globalErrorMiddleware