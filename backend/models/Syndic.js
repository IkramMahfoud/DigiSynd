const mongoose = require('mongoose');

const syndicSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
});

const Syndic = mongoose.model('Syndic', syndicSchema);

module.exports = Syndic;
