const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
    required: true
  },
  etage:{
    type: String,
    required: true
  },
  number:{
    type: String,
    required: true
  }
});

const Apartment = mongoose.model('Apartment', apartmentSchema);

module.exports = Apartment;