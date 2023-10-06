const request = require('supertest')
const app = require('../server')
import type { userPasswordType } from "../types"

describe('User-Route: Validate log-in, Make registrations and delete counts', () => {
    const RESOURCE = '/blogApi/user'
    
    describe('Get Method on /user', () => {

        describe('Given both correct username and password', () => {
            const userData: userPasswordType = { user: 'Usuario0', password: '1234' }

            test('should validate log-in', async () => {
                const response = await request(app).get(RESOURCE).query(userData)
                expect(response.statusCode).toBe(200)
                expect(response.body.message).toBe('User validated successfully')
            })
        })
        
        describe('Given correct username and wrong password', () => {
            const userData: userPasswordType = { user: 'Usuario0', password: '1235' }

            test('should reject log-in', async () => {
                const response = await request(app).get(RESOURCE).query(userData)
                expect(response.statusCode).toBe(401)
                expect(response.body.message).toBe('Incorrect password')
            })
        })
        
        describe('Given wrong username and correct password', () => {
            const userData: userPasswordType = { user: 'usuario0', password: '1234' }

            test('should reject log-in', async () => {
                const response = await request(app).get(RESOURCE).query(userData)
                expect(response.statusCode).toBe(401)
                expect(response.body.message).toBe('Incorrect username')
            })
        })
        
        describe('Given both wrong username and password', () => {
            const userData: userPasswordType = { user: 'usuario0', password: '1235' }

            test('should reject log-in', async () => {
                const response = await request(app).get(RESOURCE).query(userData)
                expect(response.statusCode).toBe(401)
                expect(response.body.message).toBe('Incorrect username and password')
            })
        })
    })


    describe('Post Method on /user', () => {

        describe('Given a new user and password', () => {
            const userData: userPasswordType = { user: 'Usuario10', password: '1234' }

            test('should create a new user', async () => {
                const response = await request(app).post(RESOURCE).send(userData)
                expect(response.statusCode).toBe(201)
                expect(response.body.message).toBe('User added successfully')
            })
        })
        
        describe('Given a new user that already exists', () => {
            const userData: userPasswordType = { user: 'Usuario10', password: '1234' }

            test('should warn the potential user', async () => {
                const response = await request(app).post(RESOURCE).send(userData)
                expect(response.statusCode).toBe(401)
                expect(response.body.message).toBe('Existing user')
            })
        })
    
    })


    describe('Delete Method on /user', () => {
        
        describe('Given an existing user with its password', () => {
            const userData: userPasswordType = { user: 'Usuario10', password: '1234' }

            test('should create a new user', async () => {
                const response = await request(app).delete(RESOURCE).send(userData)
                expect(response.statusCode).toBe(200)
                expect(response.body.message).toBe('User removed successfully')
            })
        })
    })

})