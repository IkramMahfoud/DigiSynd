const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    isPayed: {
        type: Boolean,
        default: false,
    },
    apartement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Apartement",
      required: true
    },
    month: {
      type: String,
      required: true
  }
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;