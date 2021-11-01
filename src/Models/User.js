const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = mongoose.Schema({

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
    }

});

User.pre('save', async function() {
    passwordHash = bcrypt.hash(this.password, 8);
    this.password = passwordHash;
});

mongoose.model('Users', User);