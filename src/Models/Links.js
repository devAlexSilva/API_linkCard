const mongoose = require('mongoose');


const LinksDb = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },

    title: {
        type: String,
        maxlength: 100
    },

    content: {
        type: String,
        
    },
    category: {
        type: String,
        required: true,
        lowercase: true,
        maxlength: 80
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Links', LinksDb);