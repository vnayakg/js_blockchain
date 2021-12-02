const redis = require("redis");
const CHANNELS = {
    TEST: "TEST",
    BLOCKCHAIN: "BLOCKCHAIN",
};

class PubSub {
    constructor({ blockchain }) {
        this.blockchain = blockchain;
        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();

        // subscribe to all channels
        this.subscriberToChannels();
        // on receiving message
        this.subscriber.on("message", (channel, message) => {
            this.handleMessage(channel, message);
        });
    }
    // on recieved message
    handleMessage(channel, message) {
        console.log(
            `Message received channel: ${channel}, message: ${message}`
        );

        const parsedMessage = JSON.parse(message);
        // if the valid chain is broadcasted on the blockchain channel
        if (channel === CHANNELS.BLOCKCHAIN) {
            this.blockchain.replaceChain(parsedMessage);
        }
    }
    // subscribe to all channels in the CHANNELS object
    subscriberToChannels() {
        Object.values(CHANNELS).map((channel) =>
            this.subscriber.subscribe(channel)
        );
    }
    // publish message on given channel
    publish({ channel, message }) {
        this.subscriber.unsubscribe(channel, () => {
            //temporarily unsubscribing to avoid self listening after publishing message
            this.publisher.publish(channel, message, () => {
                this.subscriber.subscribe(channel);
            });
        });
    }
    // brodcast current blockchain to blockchain channel
    broadcastChain() {
        this.publish({
            channel: CHANNELS.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain),
        });
    }
}

module.exports = PubSub;
