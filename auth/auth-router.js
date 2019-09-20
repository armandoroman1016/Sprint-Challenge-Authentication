const router = require('express').Router();
const Users = require('../models/users_model.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')

router.post('/register', (req, res) => {
  // implement registration
  let userData = req.body
  const hash = bcrypt.hashSync(userData.password, 14)
  userData.password = hash;

  Users.add(userData)
    .then( user => {
      if(user.errno){
        res.status(400).json({message: 'The username is not available.'})
      }else{
        const token = generateToken(user)
        res.status(201).json({newUser: user, token: token})
      }
      })
    .catch( err => {
        res.status(500).json({message: 'couldnt create user at this time', err})
      });
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body;
  Users.findByUsername(username)
    .then( user => {
      if(user && bcrypt.compareSync(password, user.password)){
        const token = generateToken(user)
        res.status(200).json({message:'Login Successful', token: token})
      }else{
        res.status(401).json({message: 'invalid credentials'})
      }
    })
    .catch( err => res.status(500).json(err) )
});

function generateToken(user){
  const payload = {
    user:user.username
  }
  const options = {
    expiresIn: '1d'
  }
  return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;
