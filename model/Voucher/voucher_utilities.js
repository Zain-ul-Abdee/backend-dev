
const {ethers, FixedNumber }  = require( "ethers");
const { TypedDataUtils }  =  require ("ethers-eip712");
const Web3 = require('web3');

var currentConf = require('../blockchain/address')
// const web3 = new Web3(Web3.givenProvider);
web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));



const SIGNING_DOMAIN_NAME = "LazyNFT-Voucher"
const SIGNING_DOMAIN_VERSION = "1"

class LazyMinter {
    contractAddress;
    types;
    _domain;
  constructor( contractAddress ) {
    this.contractAddress = contractAddress;

    this.types = {
      EIP712Domain: [
        {name: "name", type: "string"},
        {name: "version", type: "string"},
        {name: "chainId", type: "uint256"},
        {name: "verifyingContract", type: "address"},
      ],
      NFTVoucher: [
        {name: "minPrice", type: "uint256"},
        {name: "expire_at", type: "uint256"},
      ]
    }
  }

  async _signingDomain() {
    if (this._domain != null) {
      return this._domain
    }
    const chainId = 4;
    this._domain = {
      name: SIGNING_DOMAIN_NAME,
      version: SIGNING_DOMAIN_VERSION,
      verifyingContract: this.contractAddress,
      chainId,
    }
    return this._domain
  }

  async _formatVoucher(voucher) {
    const domain = await this._signingDomain()
    return {
      domain,
      types: this.types,
      primaryType: 'NFTVoucher',
      message: voucher,
    }
  }

  async createVoucher(minPrice, expire_at) {
    const signer = new ethers.Wallet(currentConf.ether_private_key);
    const voucher = { minPrice ,expire_at};
    const typedData = await this._formatVoucher(voucher);
    const digest = TypedDataUtils.encodeDigest(typedData);
   
    const signature=await signer.signMessage(digest)


    return {
      voucher,
      signature,  
      digest,
    }
  }
}


module.export = {
    LazyMinter
};