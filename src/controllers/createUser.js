const express = require('express');
require('../Models/User');
const mongoose = require('mongoose');

const User = mongoose.model('Users');

const router = express.Router();


router.post('/create', async (req, res)=>{
    try{
    const {name, email, password} = req.body;

    await User.create({
        name,
        email,
        password,
    })

    return res.status(201).json({ message: 'cadastrado' })
    }
    catch(err){
    
    return res.status(406).json({ err: 'verifique os dados inseridos' })
    }
});

module.exports = (app) => { app.use('/user', router) }