import GetConsumerRegistry from './services/BrazeConsumerRegistry';
import GetDispatcher from './BrazeDispatcher';

/**
 * sessionTimeoutInSeconds
 * Set session timeout to 0 in order to avoid caching issues with Braze
 * @type {number}
 */
export const sessionTimeoutInSeconds = 0;

export default class BrazeAdapter {
    /**
     * Return the instance of the consumer that has been registered
     * @returns {BrazeConsumer}
     */
    get consumerInstance () {
        return this._consumer;
    }

    /**
     * Return the dispatcher to perform card click events
     * @returns {BrazeConsumer}
     */
    get dispatcher () {
        return this._consumer;
    }

    constructor () {
        // create the consumer registry
        this._consumerRegistry = GetConsumerRegistry();
        // create the dispatcher
        this._dispatcher = GetDispatcher(sessionTimeoutInSeconds);
    }

    /**
     * Configure the dispatcher and register this instance as a consumer in the consumer registry
     * @param options
     * @returns {Promise<void>}
     */
    async initialise (options) {
        try {
            this._consumer = this._consumerRegistry.register(options);
            await this._dispatcher.configure(options);
        } catch (error) {
            throw new Error(`An error occurred while loading the component: ${error}`);
        }
    }

    /**
     * remove the consumer instance from the registry
     */
    unsubscribe () {
        this._consumerRegistry.unregister(this._consumer);
    }
}
