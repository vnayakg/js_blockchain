const Blockchain = require('./blockchain.test')
const Block = require('./block')

describe('Blockchain', ()=>{
    const blockchain = new Blockchain()

    it('contains a chain array instanc',()=>{
        expect(blockchain.chain instanceof Array).toBe(true)
    })

    it('starts with genesis block', ()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesis())
    })

    it('adds new block to the chain',()=>{

    })
})