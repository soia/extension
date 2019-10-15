import WalletInterface from './libs/WalletInterface';
import ActionsClass from '../common/class.actions.js';
let walletInterface = new WalletInterface();
const Actions = new ActionsClass();

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
    	(async () => {
    		switch (request.action) {
                case (Actions.getBackground().changeProtocol):
                    walletInterface.changeProtocol(request.data);
                    break;
    			case (Actions.getBackground().generationMnemonic):
					let result = await walletInterface.generateRandomPhrase()
					walletInterface.generateAddressAndPrivkey.phrase = result;
					sendResponse(result)
    				break;
    			case (Actions.getBackground().getCiphertext):
					result = await walletInterface.encryptMnemonic(request.data.mnemonic,request.data.password)
					walletInterface.generateAddressAndPrivkey.phrase = request.data.mnemonic;
    				sendResponse(result)
    				break;
    			case (Actions.getBackground().getMnemonic):
    				result = await walletInterface.decryptMnemonic(request.data.ciphertext,request.data.password);
    				sendResponse(result);
					walletInterface.generateAddressAndPrivkey.phrase = result;
					break;
				case (Actions.getBackground().getExportMnemonic):
					result = await walletInterface.decryptMnemonic(request.data.ciphertext,request.data.password);
					sendResponse(result);
					break;
                case (Actions.getBackground().getAddress):
                    result = await walletInterface.generateAddressAndPrivkey.generateAddress(request.data.ticker);
                    sendResponse(result);
					break;
				case (Actions.getBackground().getExportPrivKey):
					result = await walletInterface.generateAddressAndPrivkey.generatePrivKey(request.data.ticker);
					sendResponse(result);
					break;
                case (Actions.getBackground().getBalance):
                    result = await walletInterface.setBalance(request.data);
                    sendResponse(result);
                    break;
                case (Actions.getBackground().sendTransaction):
                    result = await walletInterface.sendTransaction(request.data.to, request.data.value, request.data.gasPrice, request.data.memo, request.data.from);
                    sendResponse(result);
					break;
				case (Actions.getBackground().createAccount):
					result = await walletInterface.createAccount(request.data);
					sendResponse(result);
					break;
				case (Actions.getBackground().getCiphertextEdc):
					result = await walletInterface.encryptMnemonic(request.data.brainKey,request.data.password)
					walletInterface.seedToKey(request.data.brainKey)
					sendResponse(result)
					break;
				case (Actions.getBackground().getBrainKey):
					result = await walletInterface.decryptMnemonic(request.data.ciphertext,request.data.password);
					sendResponse(result);
					break;
				case (Actions.getBackground().getNameBrainKey):
					result = await walletInterface.brainKeyToNameAccount(request.data);
					sendResponse(result);
					break;
    		}
	})();
	return true;
    }
    
);