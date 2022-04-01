const express = require('express');
const router = express.Router();
const User= require('../models/User.js')


// const { verifyToken } = require('../middleware/auth');

// users index route
router.get('/', async (req, res) => {
    try {
        const users = await User.all
        res.json(users)
    } catch(err) {
        res.status(500).json({err})
    }
})
router.post('/', async (req, res)=> {
    try {
        const users = await User.findByUsername(req.body.username)
        res.json(users)
    } catch(err) {
        res.status(500).json({err})
    }
})



module.exports =  router
