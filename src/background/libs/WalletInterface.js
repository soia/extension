import EdinarCoinLib from './EdinarcoinLib.js'
// import EdinarCoinTestLib from './EdinarcoinTestLib.js'
import EthereumLib from './EthereumLib';
// import EthereumTestLib from './EthereumTestLib';
import BitcoinLib from './BitcoinLib';
import BitcoinLibBip49 from './BitcoinLibBip49';
import BitcoinTestLib from './BitcoinTestLib';
import BitcoinTestLibBip49 from './BitcoinTestLibBip49';
import BitcoinCashLib from './BitcoinCashLib';
// import BitcoinCashTestLib from './BitcoinCashTestLib.js';
import LitecoinLib from './LitecoinLib';
// import LitecoinTestLib from './LitecoinTestLib';
import DashLib from './DashLib';
// import DashTestLib from './DashTestLib';
//import EthereumClassicLib from './EthereumClassicLib';
//import Erc20Lib from './Erc20Lib';
import Validator from '../core/utilites/Validator';
import Logger from '../core/utilites/Logger'
import Mnemonic from "../core/ianColeman/mnemonicToWallets/jsbip39";
import Randomizer from "../core/ianColeman/SafeRandom.js";
import GenerateAddressAndPrivkey from '../core/ianColeman/mnemonicToWallets/GenerateAddressAndPrivkey.js';
import CryptoJS from 'crypto-js';
import Networks from '../core/ianColeman/networks.js';
import HttpService from '../core/services/HttpService.js'

export default class WalletInterface { 
    constructor(){
        this.networks = Networks;
        this.logger = new Logger();
        this.validator = new Validator();
        this.httpService = new HttpService();
        this.generateAddressAndPrivkey = new GenerateAddressAndPrivkey(this)
        this.protocols = {};
        this.protocols.edc = new EdinarCoinLib(this)
        // this.protocols.edctest = new EdinarCoinTestLib(this)
        this.protocols.btc = new BitcoinLib(this);
        this.protocols.btc49 = new BitcoinLibBip49(this);
        this.protocols.btctest = new BitcoinTestLib(this);
        this.protocols.btc49test = new BitcoinTestLibBip49(this);
        this.protocols.bch = new BitcoinCashLib(this);
        // this.protocols.bchtest = new BitcoinCashTestLib(this);        
        this.protocols.eth = new EthereumLib(this);
        // this.protocols.ethtest = new EthereumTestLib(this);
        this.protocols.ltc = new LitecoinLib(this);
        // this.protocols.ltctest = new LitecoinTestLib(this);
        this.protocols.dash = new DashLib(this);
        // this.protocols.dashtest = new DashTestLib(this);
        //this.protocols.etc = new EthereumClassicLib(this);        
        //this.protocols.erc20 = new Erc20Lib(this);
        this.mnemonic = new Mnemonic();
        this.randomizer = new Randomizer(0, 255);
        console.log("Wallet is working");
    }

    generateRandomPhrase() {
        return new Promise(async(resolve, reject)=>{
            let data = await this.randomizer.resultRandomizer();
            const words = this.mnemonic.toMnemonic(data);
            return resolve(words);
        });
    }

    encryptMnemonic(mnemonic, password) {
        return new Promise(async(resolve, reject)=>{
            try{
                let ciphertext = CryptoJS.AES.encrypt(mnemonic, password)
                ciphertext = ciphertext.toString()
                return resolve(ciphertext)
            }catch(e){
                return reject(e)
            }
        })
    }

    decryptMnemonic(ciphertext, password) {
        return new Promise(async(resolve, reject)=>{
            try{
                let bytes = CryptoJS.AES.decrypt(ciphertext, password);
                try{
                    let plaintext = bytes.toString(CryptoJS.enc.Utf8);
                    return resolve(plaintext);
                }catch(e){
                    alert('Wrong password')
                }            
            }catch(e){
                return reject(e);
            }
        });
    }

    setBalance(account){
        return new Promise(async(resolve,reject)=>{
            try{
                let balance = await this.getBalance(false, account)
                return resolve(balance);
            }catch (e) {
                return reject(e);
            }
        })
    }

    getBalance(raw=true, account){
        return new Promise(async(resolve,reject)=>{
            try{
                let balance = await this.protocol.getBalance(raw, account);
                return resolve(balance);
            }catch (e) {
                return reject(e);
            }
        })
    }

    sendTransaction(to,value,gasPrice,memo,from){
        return new Promise(async(resolve,reject)=>{
            try{
                let txHash = await this.protocol.sendTransaction(to,value,gasPrice,memo,from)
                return resolve(txHash);
            }catch (e) {
                return reject(e);
            }
        })
    }

    createAccount(nameAccount){
        return new Promise(async(resolve,reject)=>{
            try{
                let result = await this.protocol.createAccount(nameAccount)
                return resolve(result);
            }catch (e) {
                return reject(e);
            }
        })
    }

    seedToKey(seed){
        return new Promise(async(resolve,reject)=>{
            try{
                let result = await this.protocol.seedToKey(seed)
                return resolve(result);
            }catch (e) {
                return reject(e);
            }
        })
    }

    brainKeyToNameAccount(brainKey){
        return new Promise(async(resolve,reject)=>{
            try{
                let result = await this.protocol.brainKeyToNameAccount(brainKey)
                return resolve(result);
            }catch (e) {
                return reject(e);
            }
        })
    }

    changeProtocol(ticker){
        let chosenProtocol = this.protocols[ticker];
        this.setProtocol(chosenProtocol);
    }

    setProtocol(protocol){
        this.protocol = protocol;
    }

}