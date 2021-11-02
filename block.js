const {GENESIS_DATA} = require('./config')
const cryptoHash = require('./crypto-hash')
class Block{
    constructor({timestamp, data, hash, lastHash}){
        this.timestamp = timestamp
        this.data = data
        this.hash = hash
        this.lastHash = lastHash
    }

    static genesis(){
        return new this(GENESIS_DATA)

    }
    static minedBlock({lastBlock, data}){
        const timestamp = Date.now()
        const lastHash = lastBlock.hash
        return new this({
            timestamp: Date.now(),
            data,
            lastHash,
            hash: cryptoHash(timestamp, lastHash, data)
        })
    }
}

// const block = new Block({timestamp:'01-01-2001', data:"hi there", hash:"12345", lastHash:"lasthash"})

// console.log(block)
module.exports = Block