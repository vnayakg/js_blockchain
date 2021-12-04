const uuid = require("uuid").v4;
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
}

module.exports = Transaction;
