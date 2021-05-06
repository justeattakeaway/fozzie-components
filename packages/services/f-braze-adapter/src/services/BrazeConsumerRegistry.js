import BrazeConsumer from './BrazeConsumer';

let consumerRegistryInstance;

class BrazeConsumerRegistry {
    consumers

    static GetConsumerRegistry () {
        if (!consumerRegistryInstance) {
            consumerRegistryInstance = new BrazeConsumerRegistry();
        }
        return consumerRegistryInstance;
    }

    constructor () {
        if (consumerRegistryInstance && consumerRegistryInstance !== this) {
            throw new Error('do not instantiate more than one instance of BrazeConsumerRegistry');
        }
        consumerRegistryInstance = this;
    }

    applyContentCardCallbacks (cards) {
        this.consumers.reduce((acc, consumer) => [...acc, consumer.getContentCardCallbacks()])
            .forEach(callback => {
                callback(cards);
            });
    }

    applyInAppMessageCallbacks (message) {
        this.consumers.reduce((acc, consumer) => [...acc, consumer.getInAppMessagesCallbacks()])
            .forEach(callback => {
                callback(message);
            });
    }

    applyInAppMessageClickEventsCallbacks (message) {
        this.consumers.reduce((acc, consumer) => [...acc, consumer.getInAppMessagesCallbacks()])
            .forEach(callback => {
                callback(message);
            });
    }

    register (consumerOptions) {
        const consumer = new BrazeConsumer(consumerOptions);
        this.consumers = [...this.consumers, consumer];
    }
}

export default BrazeConsumerRegistry;
