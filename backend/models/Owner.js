const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
    }
}
);

const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;
