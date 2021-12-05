const uuid = require("uuid").v4;
const {verifySignature} = require('../util')
class Transaction {
    constructor({ senderWallet, recipient, amount }) {
        this.id = uuid();
        this.outputMap = this.createOutputMap({
            senderWallet,
            recipient,
            amount,
        });

        this.input = this.createInput({
            senderWallet,
            outputMap: this.outputMap,
        });
    }

    createOutputMap({ senderWallet, recipient, amount }) {
        const outputMap = {};

        outputMap[recipient] = amount;
        outputMap[senderWallet.publicKey] = senderWallet.balance - amount;
        return outputMap;
    }

    createInput({ senderWallet, outputMap }) {
        return {
            timestamp: Date.now(),
            amount: senderWallet.amount,
            address: senderWallet.publicKey,
            signature: senderWallet.sign(outputMap)
        };
    }

    static validTransaction(transaction){
        const {input:{address, amount, signature}, outputMap} = transaction;

        const outputTotal = Object.values(outputMap).reduce((total, outputAmount)=> total + outputAmount)

        if(amount !== outputTotal){
            console.error(`INVALID transaction from ${address}`)
            return false;
        }

        if(!verifySignature({publicKey: address, data: outputMap, signature })){
            console.error(`INVALID signature from ${address}`)
            return false;
        }

        return true; //getting error in test
    }
}

module.exports = Transaction;
