var express = require('express');
const  createVoucher = require('./voucher_services');
const router = express.Router();

router.post(
  createVoucher
);

module.exports =  router;
