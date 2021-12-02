const {GENESIS_DATA, MINED_RATE} = require('./config')
const cryptoHash = require('./crypto-hash')
const hexToBinary = require('hex-to-binary')
class Block{
    constructor({timestamp, data, hash, lastHash, nonce, difficulty}){
        this.timestamp = timestamp
        this.data = data
        this.hash = hash
        this.lastHash = lastHash
        this.nonce = nonce
        this.difficulty = difficulty
    }

    static genesis(){
        return new this(GENESIS_DATA)

    }

    static adjustDifficulty({originalBlock, timestamp}){
        const {difficulty} = originalBlock

        if(difficulty < 1)
            return 1;

        const difference = timestamp - originalBlock.timestamp

        if(difference > MINED_RATE)
            return difficulty-1

        return difficulty+1
    }

    static minedBlock({lastBlock, data}){
        let hash, timestamp
        const lastHash = lastBlock.hash
        let {difficulty} = lastBlock
        let nonce = 0
        do{
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty({originalBlock: lastBlock, timestamp})
            hash = cryptoHash(timestamp, lastHash, nonce, difficulty, data)
        }
        while(hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty))
        return new this({
            timestamp: Date.now(),
            data,
            lastHash,
            difficulty,
            nonce,
            hash
        })
    }
}

// const block = new Block({timestamp:'01-01-2001', data:"hi there", hash:"12345", lastHash:"lasthash"})

// console.log(block)
module.exports = Block