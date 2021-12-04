// for public private key generatiion
const EC = require('elliptic').ec
const cryptoHash = require('./crypto-hash')

const ec = new EC('secp256k1')

const verifySignature = ({publicKey, data, signature})=>{
    const keyFromPublic = ec.keyFromPublic(publicKey, 'hex') // creating key object from given key to use ec verify method

    return keyFromPublic.verify(cryptoHash(data), signature )
}

module.exports = {ec, verifySignature}

