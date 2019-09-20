const Users = require('./users_model.js')
const db = require('../database/dbConfig.js')

describe('users_model', () => {
    let testUser = {username: 'armando', password: 'roman'}
     beforeEach(async () => {
        await db("users").truncate();
    });
    describe('add', () => {
        it('adds a new user', async () => {
            await Users.add(testUser)
            let users = await db('users')
            expect(users).toHaveLength(1)
        })
    })
    describe('removes', () => {
            it('removes a user', async() => {
                await Users.add(testUser)
                let users = await db('users')
                expect(users).toHaveLength(1);
                await Users.remove(users[0].id)
                users = await db('users')
                expect(users).toHaveLength(0);
            })
    })
})
