const express = require('express')
const Blockchain = require('./blockchain')
const PubSub = require('./pubSub')
const request = require('request')

const app = express()
const DEFAULT_PORT = 3001

const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`


app.use(express.json())

// creating blockchain instance
const blockchain = new Blockchain()

const pubsub = new PubSub({blockchain})

setTimeout(()=> pubsub.broadcastChain(), 1000)

app.get('/api/blocks', (req, res)=>{
    res.json(blockchain.chain)
})

app.post('/api/mine', (req, res)=>{
    const {data} = req.body

    blockchain.addBlock({data})

    pubsub.broadcastChain()
    res.redirect('/api/blocks')
})
// to sync all chains at the starting by calling /api/blocks endpoint
const synchChains = ()  =>{
    request({uri: `${ROOT_NODE_ADDRESS}/api/blocks`}, (error, response, body)=>{
        if(!error && response.statusCode === 200){
            const rootChain = JSON.parse(body)
            console.log('replace chain with on a sync with ', rootChain)
            blockchain.replaceChain(rootChain)
        }
    })
}

let PEER_PORT;
if(process.env.GENERATE_PEER_PORT === 'true'){
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000)
}

const PORT = PEER_PORT || DEFAULT_PORT
app.listen(PORT, ()=>{

    console.log(`Server running at PORT ${PORT}`)
    synchChains()
})