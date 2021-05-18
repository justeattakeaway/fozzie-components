import GetConsumerRegistry from './services/BrazeConsumerRegistry';

export default class BrazeAdapter {
    /**
     * Initializes the braze adapter and returns instance of the braze adapter class
     * @param apiKey
     * @param userId
     * @param enableLogging
     * @param sessionTimeout
     * @param enabledCardTypes
     * @param brands
     * @param callbacks
     * @param interceptInAppMessages
     * @param interceptInAppMessageClickEvents
     * @param customFilters
     * @returns {Promise<BrazeAdapter>}
     */
    static async initialize ({
        apiKey,
        userId,
        enableLogging,
        sessionTimeout,
        enabledCardTypes,
        brands,
        callbacks,
        interceptInAppMessages,
        interceptInAppMessageClickEvents,
        customFilters
    }) {
        const registry = await GetConsumerRegistry({
            apiKey,
            userId,
            enableLogging,
            sessionTimeout
        });

        return new BrazeAdapter({
            enabledCardTypes,
            brands,
            callbacks,
            interceptInAppMessages,
            interceptInAppMessageClickEvents,
            customFilters,
            registry
        });
    }

    get dispatcher () {
        return this._consumerRegistry.dispatcher;
    }

    constructor ({
        enabledCardTypes,
        brands,
        callbacks,
        interceptInAppMessages,
        interceptInAppMessageClickEvents,
        customFilters,
        loggerCallbacks,
        registry
    }) {
        // create / get the registry
        this._consumerRegistry = registry;
        // register the consumer
        this._consumer = this._consumerRegistry.register({
            enabledCardTypes,
            brands,
            callbacks,
            interceptInAppMessages,
            interceptInAppMessageClickEvents,
            customFilters,
            loggerCallbacks
        });
    }

    /**
     * Pushes events to the GTM datalayer, for now this is using the dispatcher directly
     * TODO use the dispatcher event stream to publish events
     * @param pushToDataLayer
     * @param payload
     */
    pushShapedEventToDataLayer (pushToDataLayer, payload) {
        this.dispatcher.pushShapedEventToDataLayer(pushToDataLayer, payload);
    }

    /**
     * Reports card click interaction to Dispatcher
     * TODO use the dispatcher event stream to publish events
     * @param cardId
     */
    async logCardClick (cardId) {
        await this.dispatcher.logCardClick(cardId);
    }

    /**
     * Reports card impressions interaction to Dispatcher
     * TODO use the dispatcher event stream to publish events
     * @param cardIds
     */
    async logCardImpressions (cardIds) {
        await this.dispatcher.logCardImpressions(cardIds);
    }

    /**
     * remove the consumer instance from the registry
     */
    unsubscribe () {
        this._consumerRegistry.unregister(this._consumer);
    }
}
