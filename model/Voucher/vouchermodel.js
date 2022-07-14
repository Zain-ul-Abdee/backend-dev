const mongoose = require('mongoose');
const voucherSchema = new mongoose.Schema({
    walletaddress: {
    type: String,
    required: [true, 'walletaddress is required'],
  },
  amountInEather: {
    type: Number,
    required: [true, 'amountInEather is required'],
  },
  expireAt: {
    type: Number,
    required: [true, 'expireAt is required'],
  },
  signature: {
    type: String,
    required: [true, 'signature is required'],
  },
});
const voucherModel = mongoose.model('voucher', voucherSchema);
module.exports = voucherModel;