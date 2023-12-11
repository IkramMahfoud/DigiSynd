const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    apartement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Apartement",
      required: true
    },
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12
    }
}
);

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;