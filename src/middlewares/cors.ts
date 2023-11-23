import cors from 'cors'

const ACCEPTED_ORIGINS = [
    'http://localhost:3001',
    'http://localhost:5173'
]

const corsMiddleware = ({
    acceptedOrigins = ACCEPTED_ORIGINS,
    acceptedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    acceptedHeader = ['Content-Type', 'Authorization'],
    allowCredentials = true
} = {}) => cors({
    origin: (origin, callback) => {
        if(origin && acceptedOrigins.includes(origin) || !origin) {
            return callback(null, true)
        }

        return callback(new Error('Not allowed by CORS'))
    },
    methods: acceptedMethods,
    allowedHeaders: acceptedHeader,
    credentials: allowCredentials
})

export default corsMiddleware