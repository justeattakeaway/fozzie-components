import GetConsumerRegistry from './services/BrazeConsumerRegistry';
import dispatcherEventStream from './services/DispatcherEventStream';
import {
    LOGGER
} from './services/types/events';
import { LOG_INFO } from './services/types/logger';

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
        logger,
        tags = 'global'
    }) {
        // create a key to identify the section from which the logs reference for later lookup if needed if no tags
        // apply global keyword
        const loggingAdapterKey = `${tags}--${userId}`;

        const consumerOptions = {
            enabledCardTypes,
            brands,
            callbacks,
            interceptInAppMessages,
            interceptInAppMessageClickEvents,
            customFilters,
            logger,
            userId,
            tags
        };

        this._consumerRegistry = GetConsumerRegistry({
            apiKey,
            userId,
            enableLogging,
            sessionTimeout,
            tags
        });

        this._consumer = this._consumerRegistry.register(consumerOptions);

        dispatcherEventStream.publish(LOGGER, {
            type: LOG_INFO,
            message: `Braze Adapter Section: (Adapter) Key: (BrazeAdapter--adapter--${loggingAdapterKey}): Braze Adapter has been initialised by the consumer.`,
            data: {
                key: loggingAdapterKey,
                enableLogging,
                sessionTimeout,
                enabledCardTypes,
                brands,
                customFilters
            }
        });
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
