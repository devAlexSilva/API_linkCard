require('../../Models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('Users');

module.exports = (app) => {

    app.post('/login', async (req, res) => {

        const { email, password } = req.body;

        
            const dataUser = await User.findOne({ email: email, password: password });

            if(!dataUser) return res.status(401).json({ err: 'credenciais invalidas' });
        
            

            const token = jwt.sign({id: dataUser._id}, process.env.AUTH_CONFIG, {
                expiresIn: '1h',
            
            });

            res.json({
                dataUser,
                token,
            })

    });

}