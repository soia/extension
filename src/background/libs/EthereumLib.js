let Web3 = require('web3');
let EthereumTx  = require('ethereumjs-tx');
const NonceService = require('../core/services/NonceService');
const BigNumberHelper = require('../core/helpers/BigNumberHelper');
const EthAddressHelper = require('../core/helpers/EthAddressHelper');
const WeiConverter = require('../core/helpers/WeiConverter');

class EthereumLibClass{
    constructor(wallet){
        this.generateAddAndPriv = wallet.generateAddressAndPrivkey;
        this.web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/d67bf7aef71d46d0b519e7941174ef9f'));
        this.logger = wallet.logger;
        this.validator = wallet.validator;
        this.nonceService = new NonceService(this.web3,this.validator,this.logger);
        this.httpService = wallet.httpService;
    }

    getBalance(raw=true){
        return new Promise(async(resolve,reject)=>{
            try{
                let address = await this.generateAddAndPriv.generateAddress("ETH");
                let balance = await this.web3.eth.getBalance(address);
                if(!raw){
                    balance = this.toDecimals(balance);
                }
                return resolve(balance);
            }catch (e) {
                return reject(e);
            }
        });
    }

    sendTransaction(to,value,gasPrice){
        return new Promise(async(resolve,reject)=>{
            try{
                let userAddress = await this.generateAddAndPriv.generateAddress("ETH");
                let userPrivateKey = await this.generateAddAndPriv.generatePrivKey("ETH");
                if(userAddress===to){
                    throw new Error('To and From Addresses are the same');
                }
                var data = this.formatTransactionParams(userAddress,to,userPrivateKey,value,gasPrice);
                return resolve(await this.makeTransaction(data));
            }catch (e) {
                return reject(e)
            }
        })
    }

    createAddress(){
        return new Promise(async(resolve,reject)=>{
            try{
                let result = await this.web3.eth.accounts.create('');
                return resolve(result.address)
            }catch (e) {
                return reject(e);
            }

        })
    }

    formatTransactionParams(_from,_to,_privkey,_value='0',_gasPrice,_gasLimit=21000,_data=''){
        if(!_gasPrice){
            _gasPrice="10";
        }
        this.validator.validateEthAddress(_from,'_From Address');
        this.validator.validateEthAddress(_to,'_To Address');
        this.validator.validateString(_privkey,'Private Key',true);
        try{
            this.validator.validateString(_value,'Value');            
        }catch(e){
            _value = _value.toString();
            this.validator.validateString(_value,'Value');
        }
        try{
            this.validator.validateString(_gasLimit,'Gas Limit');            
        }catch(e){
            _gasLimit = _gasLimit.toString();
            this.validator.validateString(_gasLimit,'Gas Limit');            
        }
        try{
            this.validator.validateString(_gasPrice,'Gas Price');
        }catch(e){
            _gasPrice = _gasPrice.toString();
            this.validator.validateString(_gasPrice,'Gas Price');
        }
        return {
            from:_from,
            to:_to,
            privateKey:_privkey,
            gasLimit:parseInt(_gasLimit),
            gasPrice:this.web3.utils.numberToHex(this.web3.utils.toWei(_gasPrice, 'gwei')),
            data:_data,
            value:this.web3.utils.numberToHex(this.web3.utils.toWei(_value))
        }
    }

    makeTransaction(params){
        return new Promise(async (resolve,reject)=>
        {
            try{
                let privKeyBuffer = new Buffer.from(params.privateKey,'hex');
                let nonce = await this.nonceService.getNextNonce(params.from);
                let txParams = {
                    nonce: nonce,
                    gasPrice: params.gasPrice,
                    gasLimit: params.gasLimit,
                    to: params.to,
                    value: params.value,
                    data: params.data,
                };
                let tx = new EthereumTx(txParams);
                tx.sign(privKeyBuffer);
                let raw = '0x' + tx.serialize().toString('hex');
                let result = await this.sendTransactionWithHash(raw);
                return resolve(result);
            }catch(e){
                return reject(e);
            }
        });
    }

    sendTransactionWithHash(raw_tx){
        return new Promise(async (resolve,reject)=>{
            await this.web3.eth.sendSignedTransaction(raw_tx).on('transactionHash', (hash)=>{
                return resolve(hash);
            }).on('error',(data)=>{
                return reject(data);
            });
        })
    }
    fetchRecommendedGasPrice(){
        return new Promise(async(resolve,reject)=>{
            try{
                let url = `https://ethgasstation.info/json/ethgasAPI.json`;
                let result = await this.httpService.getRequest(url,).then(response=>response.json())
                result = result.fast/10
                return resolve(result);
            }catch(e){
                return reject(e)
            }
        })
    }
    toDecimals(amount){
        return WeiConverter.formatToDecimals(amount);
    }
    fromDecimals(amount){
        return WeiConverter.formatFromDecimals(amount);
    }    
}
module.exports = EthereumLibClass;