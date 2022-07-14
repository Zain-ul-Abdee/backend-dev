const { voucherModel } = require('./vouchermodel');

const createVoucherService = async (voucher) => {
  return voucherModel.create(voucher);
};

module.export = {
  createVoucherService
};
