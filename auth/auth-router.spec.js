const server = require('../api/server.js')
const request = require('supertest')
const db = require('../database/dbConfig.js')

describe('auth_routes', () => {
    let testUser = {username: 'armando', password: 'roman'}
    beforeEach(async () => {
        await db("users").truncate();
    });
    describe('POST /api/auth/register',() => {
        it('returns status 201', async () => {
            const results = await request(server).post('/api/auth/register').send(testUser)
            expect(results.status).toBe(201)
        });
        it('doesnt allow duplicate users', async () => {
            let results = await request(server).post('/api/auth/register').send(testUser)
            expect(results.status).toBe(201)
            results = await request(server).post('/api/auth/register').send(testUser)
            expect(results.status).toBe(400)
            expect(results.body).toEqual({message: 'The username is not available.'})
        });
    });
    describe('POST /api/auth/login',() => {
        it('returns status 200', async () => {
            await request(server).post('/api/auth/register').send(testUser)
            let results = await request(server).post('/api/auth/login').send(testUser)
            expect(results.status).toBe(200)
        });
        it('doesnt allow login with incorrect password', async () => {
            await request(server).post('/api/auth/register').send(testUser)
            testUser.password = 'thisWontLogin'
            let results = await request(server).post('/api/auth/login').send(testUser)
            expect(results.body.message).toBe('invalid credentials')
        });
    });
});