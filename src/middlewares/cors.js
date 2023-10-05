const cors = require('cors')

const ACCEPTED_ORIGINS = [
    'http://localhost:3000'
]

const corsMiddleware = ({
    acceptedOrigins = ACCEPTED_ORIGINS,
    acceptedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    acceptedHeader = ['Content-Type', 'Authorization'],
    allowCredentials = true
} = {}) => cors({
    origin: (origin, callback) => {
        if(acceptedOrigins.includes(origin) || !origin) {
            return callback(null, true)
        }

        return callback(new Error('Not allowed by CORS'))
    },
    methods: acceptedMethods,
    allowedHeaders: acceptedHeader,
    credentials: allowCredentials
})

module.exports = corsMiddleware