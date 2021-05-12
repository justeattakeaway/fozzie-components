import GetConsumerRegistry from './services/BrazeConsumerRegistry';

export default class BrazeAdapter {
    get dispatcher () {
        return this._consumerRegistry.dispatcher;
    }

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
        customFilters
    }) {
        // create / get the registry
        this._consumerRegistry = GetConsumerRegistry({
            apiKey,
            userId,
            enableLogging,
            sessionTimeout
        });
        // register the consumer
        this._consumer = this._consumerRegistry.register({
            enabledCardTypes,
            brands,
            callbacks,
            interceptInAppMessages,
            interceptInAppMessageClickEvents,
            customFilters
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
    logCardClick (cardId) {
        this.dispatcher.logCardClick(cardId);
    }

    /**
     * Reports card impressions interaction to Dispatcher
     * TODO use the dispatcher event stream to publish events
     * @param cardIds
     */
    logCardImpressions (cardIds) {
        this.dispatcher.logCardImpressions(cardIds);
    }

    /**
     * remove the consumer instance from the registry
     */
    unsubscribe () {
        this._consumerRegistry.unregister(this._consumer);
    }
}
