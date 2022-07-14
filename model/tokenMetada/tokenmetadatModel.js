const mongoose = require('mongoose');
const TokenMetaDataSchema = new mongoose.Schema({
    tokenAddress: {
    type: String,
    required: [true, 'tokenAddress is required'],
   },
  Url: {
    type: String,
    required: [true, 'url is required'],
  },
});
const TokenMetaData = mongoose.model('TokenMetaData', TokenMetaDataSchema);
module.exports = TokenMetaData;