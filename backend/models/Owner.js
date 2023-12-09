const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    aparetment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "apartement",
      required: true
    }
},
{
  timestamps: true,
}
);

const Syndic = mongoose.model('Owner', ownerSchema);

module.exports = Owner;
