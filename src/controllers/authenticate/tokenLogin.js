require('../../Models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = mongoose.model('Users');

module.exports = (app) => {

    app.post('/login', async (req, res) => {

        const { email, password } = req.body;


        
        const dataUser = await User.findOne({ email: email }).select('password');
        
        if(!dataUser) return res.status(401).json({ err: 'credenciais invalidas' });
            
            if(!await bcrypt.compare(password, dataUser.password)) 
            return res.status(401).json({ err: 'credenciais invalidas' });
        
            dataUser.password = undefined;

            const token = jwt.sign({id: dataUser._id}, process.env.AUTH_CONFIG, {
                expiresIn: '1h',
            
            });

            return res.json({
                dataUser,
                token,
            });

    });

}