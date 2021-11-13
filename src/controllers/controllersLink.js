require('../Models/Links');
const express = require('express');
const mongoose = require('mongoose');
const authAcess = require('../controllers/authenticate/middleware');

const links = mongoose.model('Links');


const router = express.Router();
router.use(authAcess);

router.post('/create', async (req, res) => {
    try {
        const { title, content, category } = req.body;

        await links.create({
            title,
            content,
            category,
            user: id_token,
        })
            

        return res.status(201).json({ message: 'cadastrado' })
    }
        catch (err) {
        return res.status(406).json({ err: 'verifique os dados inseridos' })
    }

});

//----------------- verificar a forma de envio do id do usuario-----------------//

router.get('/', async (req, res) => {
    
    try {
        const dataLink = await links.find({user: id_token});

        return res.status(200).json(dataLink);
    } catch (err) {

        return res.status(204).json({ err: 'sem links salvo' })
    }
})

router.get('/:id', async (req, res) => {
    
    const { id } = req.params
    try {
        const dataLink = await links.find({_id: id});

        return res.status(200).json(dataLink);
    } catch (err) {

        return res.status(204).json({ err: 'sem links salvo' })
    }
})
//-------------------------------------------------------------------//

router.get('/title/:title', async (req, res) => {

        const { title } = req.params;

        const dataLink = await links.find({ title: title })

        if(dataLink[0] == undefined) return res.status(204).json({ err: 'title not found' })
        
        return res.status(302).json(dataLink);
});


router.get('/category/:category', async (req, res) => {

        const { category } = req.params;
   
        const dataLink = await links.find({ category: category })
        

        if(!dataLink) return res.status(204).json({ err: 'sem categoria cadastrada' });
        
        return res.status(302).json(dataLink);
});


router.patch('/update/:id', async (req, res) => {
    
    try {

        const { id } = req.params;
        const { title, content, category } = req.body;

        await links.updateOne({ _id: id }, { 
            $set: {
                title: title,
                content: content,
                category: category, 
            },

            $currentDate: {
                lastModfied: true
            }
        });


        return res.status(202).json({message: "atualizado com sucesso"});
        } catch (err) {

        return res.status(304).json({ err: 'falha ao atualizar' })
        }
})



router.delete('/delete/:id', async (req, res) => {

    try {
        const { id } = req.params;

        const empty = await links.findOne({_id: id});
        if(!empty) return res.status(404).json({message: 'não encontrado'});

        await links.deleteOne({ _id: id });

        return res.status(200).json({ message: 'deletado com suceesso' });
    } catch (err) {

        return res.status(304).json({ err: 'falha ao deletar' })
    }
})




module.exports = (app) => { app.use('/links', router) };