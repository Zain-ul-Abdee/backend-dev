const Web3 = require('web3');
const  LazyMinter   = require( "./voucher_utilities");
const web3 = new Web3(Web3.givenProvider);
const MilisecondsPerDay = 86400000;
var currentConf = require('../blockchain/address')
const {BigNumber} =  require ("@ethersproject/bignumber");
// create voucher
const createVoucher = async (
  req,
  res,
  next
) => {
  const { walletAddress, valueInEther } = req.body;

  try {
    
  const expiryTime= Math.floor(new Date().getTime() /1000) + 600

    const WDICMinter = new LazyMinter(currentConf.contract_address );


    const valueInWei= web3.utils.toWei(valueInEther.toString(), "ether");

    const WeiPerEther = BigNumber.from(valueInWei);

    console.log("Wei per Ether",WeiPerEther);

    const {voucher,signature} = await WDICMinter.createVoucher(WeiPerEther,expiryTime)

    console.log("Vocher",voucher);
    console.log("Signature",signature);
    
   

    //  create voucher
    const voucherObj = {
      walletAddress, 
      amountInEther,  
      expireAt, 
      signature ,

    }
     await createVoucherService(voucherObj);


    res.status(200).json({
      success: true,
      data: {
        voucher:voucher,
        signature: signature,
        amountInEther: valueInEther
        
      },
    });
  } catch (error) {
    next(error);
  }
};

module.export  = { createVoucher };
