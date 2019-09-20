const server = require('../api/server.js')
const request = require('supertest')
const db = require('../database/dbConfig.js')

describe('jokes_route', () => {
    let testUser = {username: 'armando', password: 'roman'}
     beforeEach(async () => {
        await db("users").truncate();
    });
    describe('GET /api/jokes', () => {
        it('doesnt return jokes without auth', async () => {
            let results = await request(server).get('/api/jokes')
            expect(results.status).toBe(401)
            expect(results.body.you).toBe('shall not pass!')
        })
        it('returns jokes with auth', async () => {
            let registerResults = await request(server).post('/api/auth/register').send(testUser)
            let token = registerResults.body.token
            let jokesResults = await request(server).get('/api/jokes').set('authorization', token)
            expect(jokesResults.status).toBe(200)
        })
    })
})