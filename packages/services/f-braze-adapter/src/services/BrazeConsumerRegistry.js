import BrazeConsumer from './BrazeConsumer';

let consumerRegistryInstance;

class BrazeConsumerRegistry {
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
        this.consumers = [];
    }

    /**
     * For each consumers content card callbacks fire the callback with supplied cards
     * @param cards
     */
    applyContentCardCallbacks (cards) {
        this.consumers.reduce((acc, consumer) => [...acc, consumer.getContentCardCallbacks()])
            .forEach(callback => {
                callback(cards);
            });
    }

    /**
     * For each consumers in app message callbacks fire the callback with the supplied message
     * @param message
     */
    applyInAppMessageCallbacks (message) {
        this.consumers.reduce((acc, consumer) => [...acc, consumer.getInAppMessagesCallbacks()])
            .forEach(callback => {
                callback(message);
            });
    }

    /**
     * For each consumers in app message click callbacks fire the callback with the supplied message
     * @param message
     */
    applyInAppMessageClickEventsCallbacks (message) {
        this.consumers.reduce((acc, consumer) => [...acc, consumer.getInAppMessagesCallbacks()])
            .forEach(callback => {
                callback(message);
            });
    }

    /**
     * Register a consumer instance in the registry
     * @param consumerOptions
     * @returns {BrazeConsumer}
     */
    register (consumerOptions) {
        const consumer = new BrazeConsumer(consumerOptions);
        this.consumers = [...this.consumers, consumer];
        return consumer;
    }

    /**
     * Remove the passed consumer from the registry
     * @param consumer {BrazeConsumer}
     */
    unregister (consumer) {
        this.consumers = [...this.consumers.filter(c => c !== consumer)];
    }
}

export default BrazeConsumerRegistry.GetConsumerRegistry;
