const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const User = new mongoose.Schema({

    //_id: mongoose.Schema.Types.ObjectId,


    name: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        require: true,
        select: false,
    },

    links: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Links',
    }]

});

User.pre('save', async function () {
    passwordHash = await bcrypt.hash(this.password, 8);
    this.password = passwordHash;
});

mongoose.model('Users', User);