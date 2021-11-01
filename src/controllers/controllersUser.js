const express = require('express');
require('../Models/User');
const mongoose = require('mongoose');


const User = mongoose.model('Users');

const router = express.Router();


router.get('/', async (req, res) => {

    try {
        const dataUser = await User.find();

        return res.status(200).json(dataUser);
    } catch (err) {

        return res.status(204).json({ err: 'sem usuarios cadastrados' })
    }
})


router.get('/:id', async (req, res) => {

        const { id } = req.params;

        const dataUser = await User.findOne({ _id: id })

        if(!dataUser) return res.status(204).json({ err: 'sem usuarios cadastrados' });
        
        return res.status(302).json(dataUser);
});

router.patch('/:id/update', async (req, res) => {
    try {

        const { id } = req.params;
        const { name } = req.body;

        const dataUser = await User.findByIdAndUpdate({ _id: id }, { name: name });

        return res.status(202).json(dataUser);
    } catch (err) {

        return res.status(304).json({ err: 'falha ao atualizar' })
    }
})



router.delete('/:id/delete', async (req, res) => {
    try {
        const { id } = req.params;

        await User.deleteOne({ _id: id });

        return res.status(200).json({ message: 'deletado com suceesso' });
    } catch (err) {

        return res.status(304).json({ err: 'falha ao deletar' })
    }
})


module.exports = (app) => { app.use('/user', router) }