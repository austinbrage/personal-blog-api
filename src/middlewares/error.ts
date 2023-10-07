import { ErrorRequestHandler } from "express"

const globalErrorMiddleware: ErrorRequestHandler = (error, _req, res, _next) => {
    error.statusCode = error.statusCode || 500 
    error.status = error.status || 'error'
    
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
    })
}

export default globalErrorMiddleware