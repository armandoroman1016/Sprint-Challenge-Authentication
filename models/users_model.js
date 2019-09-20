const db = require('../database/dbConfig.js')

module.exports = {
    add,
    remove,
    findByUsername
}

function add(userData){
    return db('users')
        .insert(userData)
        .then(([id]) => {
            return db('users')
            .where({id:id})
            .first()
            .then(user => user)
            .catch(err => err)
        })
        .catch( err => err )
}

function remove(id){
    return db('users')
    .where({id: id})
    .first()
    .delete()
}

function findByUsername(username){
    return db('users')
    .where({username: username})
    .first()
    .then( user => user)
    .catch( err => err);
}