const {ChainStore, PrivateKey, key, FetchChain, TransactionHelper, Aes, TransactionBuilder} = require("edinarcoin");
const WeiConverter = require('../core/helpers/WeiConverter');
const dictionary = require("./edc/dictionary_en")
const blockchain = require("./edc/blockchain")

const provider = "wss://testnet-node.blockchain.mn";
const registerUrl = 'https://testnet-info.blockchain.mn/registration'
const edc = '1.3.1';

export default class EdinarcoinTestLib {
	constructor(wallet){
		this.generateAddAndPriv = wallet.generateAddressAndPrivkey;
		this.httpService = wallet.httpService;
		this.privKey;
		this.blockchain = new blockchain(provider)
	}

	brainKeyToNameAccount(brainKey){
		return new Promise(async(resolve,reject)=>{
			try{
				let accountId;
				let nameAccount;
				let normalizу = key.normalize_brainKey(brainKey)
				for(let i=0;i<20;i++){
					let brainPrivKey = key.get_brainPrivateKey(normalizу, i)
					let pubKey = brainPrivKey.toPublicKey().toString();
					let privKey = brainPrivKey.toWif();
					accountId = await this.getKeyReferences(pubKey);
					if(accountId !== undefined){
						this.privKey = privKey;
						break;
					}
				}
				if(accountId !== undefined){
					nameAccount = await this.getFullAccounts(accountId)
				}else{
					alert("Bad brainkey")
					nameAccount = "Bad brainkey"
				}
				return resolve(nameAccount)
			}catch(e){
    	        return reject(e);
    	    }
		})
	}

	getKeyReferences(publicKey){
		return new Promise(async(resolve,reject)=>{
    	    try{
				let method =  "get_key_references";
				let params = [[publicKey]]
				let result = await this.blockchain.exec(method,params)
				return resolve(result[0][0])
			}catch(e){
				return reject(e);
			}
		})
	}

	getFullAccounts(accountId){
		return new Promise(async(resolve,reject)=>{
    	    try{
				let method =  "get_full_accounts";
				let params = [[accountId],true]
				let name = await this.blockchain.exec(method,params)
				return resolve(name[0][1].account.name)
			}catch(e){
				return reject(e);
			}
		})
	}

    createAccount(nameAccount){
        return new Promise(async(resolve,reject)=>{
            try{
				let phrase = key.suggest_brain_key(dictionary);
				let data = await this.seedToKey(phrase);
				let pubKey = data.pubKey;
				let body = JSON.stringify({
					"account": {
						"name": nameAccount,
						"owner_key":pubKey,
						"active_key":pubKey,
						"memo_key":pubKey,
						"refcode":null,
						"referrer":""
					},
					"click":null
				})
				let result = await this.httpService.postRequest(registerUrl, body)
				result = await result.json();
				if(result.name){
					result = "Account "+result.name+" created successfully"
				}else if(result.message == "Account exist"){
					result = "Account already exist!"
				}else if(Object.entries(result).length === 0){
					result = "Many attempts were made to create an account using this public key! Please change public key!"
				}
				let resultData = {
					result,
					phrase
				}
                return resolve(resultData);
            }catch (e) {
                return reject(e);
            }
        })
	}
	
	seedToKey(seed){
		return new Promise(async(resolve,reject)=>{
			try{
				let normalizу = key.normalize_brainKey(seed)
				let brainPrivKey = key.get_brainPrivateKey(normalizу)
				let pubKey = brainPrivKey.toPublicKey().toString();
				let privKey = brainPrivKey.toWif();
				let data = {
					pubKey,
					privKey
				}
				this.privKey = privKey;
				return resolve(data)
			}catch(e){
    	        return reject(e);
    	    }
		})
	}

    getBalance(raw=true, account, asset=edc){
    	return new Promise(async(resolve,reject)=>{
    	    try{
				let result = await ChainStore.getAccountAsync(account)
				result = result.toJS().balances[asset]
				let balance = await ChainStore.getObjectAsync(result).then(responce => {
				 	return responce;
				})
				balance = balance.get("balance");
				if(!raw){
                    balance = this.toDecimals(balance,3);
                }
				return resolve(balance)
    	    }catch(e){
    	        return reject(e);
    	    }
		})
	}

    sendTransaction(toAccount, amount, fee, memo, fromAccount){
		return new Promise(async(resolve,reject)=>{
			try{
				if(!fee){
					fee = 1
				}
				amount = this.fromDecimals(amount,3).toString()
				let result;
				if(toAccount != fromAccount){
					result = await this.makeTransaction(toAccount, amount, fee, memo, fromAccount)
				}else{
					alert("From and to - the same accounts")
					result = "From and to - the same accounts";
				}
				return resolve(result)
			}catch(e){
    	        return reject(e);
    	    }
		})
	}

	makeTransaction(toAccount, amount, fee, memo, fromAccount){
		return new Promise(async(resolve,reject)=>{
			try{
				let pKey = PrivateKey.fromWif(this.privKey);
				ChainStore.init().then(() => {
					let memoSender = fromAccount;
					let sendAmount = {
						amount,
						asset: "EDC"
					}
					Promise.all([
						FetchChain("getAccount", fromAccount),
						FetchChain("getAccount", toAccount),
						FetchChain("getAccount", memoSender),
						FetchChain("getAsset", sendAmount.asset),
						FetchChain("getAsset", sendAmount.asset)
					]).then((res)=> {
						let [fromAccount, toAccount, memoSender, sendAsset, feeAsset] = res;
						let memoFromKey = memoSender.getIn(["options","memo_key"]);
						let memoToKey = toAccount.getIn(["options","memo_key"]);
						let nonce = TransactionHelper.unique_nonce_uint64();
						let memo_object = {
							from: memoFromKey,
							to: memoToKey,
							nonce,
							message: Aes.encrypt_with_checksum(
								pKey,
								memoToKey,
								nonce,
								memo
							)
						}
						let tr = new TransactionBuilder()
						tr.add_type_operation( "transfer", {
							fee: {
								amount: fee,
								asset_id: feeAsset.get("id")
							},
							from: fromAccount.get("id"),
								to: toAccount.get("id"),
								amount: { amount: sendAmount.amount, asset_id: sendAsset.get("id") },
								memo: memo_object
							} )
						tr.set_required_fees().then(() => {
							tr.add_signer(pKey, pKey.toPublicKey().toPublicKeyString());
							tr.serialize();
							tr.broadcast();
							console.log("Транзакция отправлена");
						})
            		});
    			});
				return resolve("Транзакция отправлена")
			}catch(e){
    	        return reject(e);
    	    }
		})
	}

	// getAllNewTx(account, opId){
	// 	return new Promise(async(resolve,reject)=>{
    // 	    try{
	// 			await Apis.instance(provider, true).init_promise.then(res => {
	// 				console.log("connected to:", res[0].network_name);
	// 			})
	// 			let method =  "get_account_operation_history4";
	// 			let params = [account,opId,100, [0]]
	// 			Apis.instance()
	// 				.history_api()
	// 				.exec(method, params)
	// 				.then(res => { 
	// 					console.log(res);
	// 					console.log(res[0].op[1].amount.amount);
	// 					console.log(res[0].op[1]);
	// 				})
	// 			return resolve(true)
	// 		}catch(e){
	// 			return reject(e);
	// 		}
	// 	})
	// }
	
	// getAccountInfo(account){
	// 	return new Promise(async(resolve,reject)=>{
    // 	    try{
	// 			await Apis.instance(provider, true).init_promise.then(res => {})
	// 			let result = await ChainStore.getAccountAsync(account)
	// 			result = result.toJS()
	// 			console.log(result)
	// 			return resolve(result)
	// 		}catch(e){
	// 			return reject(e);
	// 		}
	// 	})
	// }
	
	toDecimals(amount, decimals=6){
        return WeiConverter.formatToDecimals(amount, decimals);
    }
    fromDecimals(amount, decimals=6){
        return WeiConverter.formatFromDecimals(amount, decimals);
    }

}