import GetConsumerRegistry from './services/BrazeConsumerRegistry';

export default class BrazeAdapter {
    constructor ({
        apiKey,
        userId,
        enableLogging,
        sessionTimeout,
        enabledCardTypes,
        brands,
        callbacks,
        interceptInAppMessages,
        interceptInAppMessageClickEvents,
        customFilters,
        loggerCallbacks
    }) {
        const consumerOptions = {
            enabledCardTypes,
            brands,
            callbacks,
            interceptInAppMessages,
            interceptInAppMessageClickEvents,
            customFilters,
            loggerCallbacks
        };

        this._consumerRegistry = GetConsumerRegistry({
            apiKey,
            userId,
            enableLogging,
            sessionTimeout
        });

        this._consumer = this._consumerRegistry.register(consumerOptions);
    }

    get dispatcher () {
        return this._consumerRegistry.dispatcher;
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
    logCardClick (cardId) {
        return this.dispatcher.logCardClick(cardId);
    }

    /**
     * Reports card impressions interaction to Dispatcher
     * TODO use the dispatcher event stream to publish events
     * @param cardIds
     */
    logCardImpressions (cardIds) {
        return this.dispatcher.logCardImpressions(cardIds);
    }

    /**
     * remove the consumer instance from the registry
     */
    unsubscribe () {
        this._consumerRegistry.unregister(this._consumer);
    }
}
