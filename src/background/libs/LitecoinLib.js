const WeiConverter = require('../core/helpers/WeiConverter');
const bitcoin = require('bitcoinjs-lib');
let token = 'dfd8006109664a708db0efc9b704c107';
const LTCDECIMALS = 8;

class LitecoinLibClass{
    constructor(wallet){
        this.generateAddAndPriv = wallet.generateAddressAndPrivkey;
        this.validator = wallet.validator;
        this.httpService = wallet.httpService;
        this.network = wallet.networks.LTCNETWORKS
    }

    getBalance(raw=true){
        return new Promise(async(resolve,reject)=>{
            try{
                let address = await this.generateAddAndPriv.generateAddress("LTC");
                this.validator.validateBtcAddress(address)
                let url = `https://api.blockcypher.com/v1/ltc/main/addrs/${address}/balance`;
                let result = await this.httpService.getRequest(url).then(response=>response.json());
                this.validator.validateObject(result);
                let balance = result.balance;
                if(!raw){
	                balance = this.toDecimals(balance)
                }
                this.validator.validateNumber(balance);
                return resolve(balance);
            }catch (e) {
                return reject(e);
            }
        });
    }

    sendTransaction(to,amount,fee){
        return new Promise(async(resolve,reject)=>{
            try{
                let rawTx = await this.createSignRawTx(to,amount,fee);
                let url = `https://api.blockcypher.com/v1/ltc/main/txs/push?token=${token}`
                let body = JSON.stringify({"tx": rawTx});
               	let result = await this.httpService.postRequest(url, body).then(response=>response.json())
               	console.log('Транзакция отправлена')
                return resolve(result.tx.hash);
            }catch (e) {
                return reject(e)
            }
        })
    }

  	createSignRawTx(to, amount,fee){
    	return new Promise(async(resolve,reject)=>{
	  		if(!fee){
	  			fee=0.0001;
	  		}
            amount = parseFloat(amount);
            fee = parseFloat(fee);
            this.validator.validateBtcAddress(to);
            this.validator.validateNumber(amount);
            this.validator.validateNumber(fee);

            amount = this.fromDecimals(amount);
            fee = this.fromDecimals(fee);
            amount = Math.round(amount)
            fee = Math.round(fee)

            let privKey = await this.generateAddAndPriv.generatePrivKey("LTC");
            this.validator.validateString(privKey);
    		let keyring = await bitcoin.ECPair.fromWIF(privKey,this.network);
			let txb = new bitcoin.TransactionBuilder(this.network)
			let from = await this.generateAddAndPriv.generateAddress("LTC");
            this.validator.validateBtcAddress(from);
			let utxoData = await this.getUtxos(from, amount, fee);
    		let utxos = utxoData.outputs;
    		let change = utxoData.change;
    		for(let key in utxos){
        		txb.addInput(utxos[key].txid, utxos[key].vout)
    		}
            txb.addOutput(to, amount);
            txb.addOutput(from, change);
    		let i = 0;
    		for(let key in utxos){
    		    txb.sign(i, keyring)
    		    i++;
    		}
			let txHash = txb.build().toHex()
            this.validator.validateString(txHash);
			return resolve(txHash)
		})
    }

    getUtxos(address,amount,fee){
        return new Promise(async(resolve,reject)=>{
            try{
	            this.validator.validateBtcAddress(address);
	            this.validator.validateNumber(amount);
	            this.validator.validateNumber(fee);

                let balance = await this.getBalance();
                if(balance >= amount+fee){
                	let allUtxo = await this.listUnspent(address);
                	let tmpSum = 0;
                	let requiredUtxo = [];
                	for(let key in allUtxo){
                    	if(tmpSum<=amount+fee){
                    		tmpSum+=allUtxo[key].value;
                    		requiredUtxo.push({
                    	    	txid:allUtxo[key].tx_hash,
                    	    	vout:allUtxo[key].tx_output_n
                    		})
                    	}else{
                    		break;
	                    }
	                }
	                let change = tmpSum - amount - fee;
	                this.validator.validateNumber(change);
	                return resolve({
	                	"change":change,
	                    "outputs":requiredUtxo
	                });
	            }else{
                    amount = this.toDecimals(amount)
                    fee = this.toDecimals(fee)
                    balance = this.toDecimals(balance)
	            	alert("Insufficient balance: trying to send "+amount+" LTC + "+fee+" LTC fee when having "+balance+" LTC")
	            }
            }catch(e){
                return reject(e);
            }
        });
    }

    listUnspent(address){
        return new Promise(async(resolve,reject)=>{
            try{
                this.validator.validateBtcAddress(address);
                let url = `https://api.blockcypher.com/v1/ltc/main/addrs/${address}?unspentOnly=true`
                let data = await this.httpService.getRequest(url).then(response=>response.json())
                let unspents = data.txrefs;
                return resolve(unspents);
            }catch(e){
                return reject(e);
            }
        })
    }

    toDecimals(amount){
        return WeiConverter.formatToDecimals(amount,LTCDECIMALS);
    }
    fromDecimals(amount){
        return WeiConverter.formatFromDecimals(amount,LTCDECIMALS);
    }    
}
module.exports = LitecoinLibClass;