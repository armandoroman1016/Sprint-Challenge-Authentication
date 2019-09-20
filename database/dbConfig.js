const knex = require('knex');

const enviroment = process.env.DB_ENV || 'development'

const knexConfig = require('../knexfile.js');

module.exports = knex(knexConfig[enviroment]);
