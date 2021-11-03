const express = require('express');
require('../Models/User');
require('../Models/Links');
const mongoose = require('mongoose');
const authAcess = require('../controllers/authenticate/middleware');


const User = mongoose.model('Users');
const Links = mongoose.model('Links');

const router = express.Router();
router.use(authAcess);



router.get('/', async (req, res) => {


        const dataUser = await User.findOne({ _id: id_token })

        if(!dataUser) return res.status(204).json({ err: 'sem usuarios cadastrados' });
        
        return res.status(302).json(dataUser);
});

router.patch('/update', async (req, res) => {
    try {

        const { name } = req.body;

        const dataUser = await User.findByIdAndUpdate({ _id: id_token }, { name: name });

        return res.status(202).json(dataUser);
    } catch (err) {

        return res.status(304).json({ err: 'falha ao atualizar' })
    }
})



router.delete('/delete', async (req, res) => {
    try {
        
        await User.deleteOne({ _id: id_token });

        await Links.deleteMany({
            user: id_token,
        });

        return res.status(200).json({ message: 'deletado com suceesso' });
    } catch (err) {

        return res.status(304).json({ err: 'falha ao deletar' })
    }
})


module.exports = (app) => { app.use('/user', router) }