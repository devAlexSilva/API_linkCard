const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const User = new mongoose.Schema({

    name: {
        type: String,
        maxlength: 50,
        require: true,
    },

    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,
        maxlength: 100
    },

    password: {
        type: String,
        require: true,
        select: false,
        trim: true,
        maxlength: 100
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

User.pre('save', async function () {
    passwordHash = await bcrypt.hash(this.password, 8);
    this.password = passwordHash;
});

mongoose.model('Users', User);