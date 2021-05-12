import BrazeConsumer from './BrazeConsumer';
import BrazeDispatcher from './BrazeDispatcher';
import DispatcherEventStream from './DispatcherEventStream';
import { CONTENT_CARDS_EVENT_NAME, IN_APP_MESSAGE_EVENT_CLICKS_NAME, IN_APP_MESSAGE_EVENT_NAME } from './types/events';

let registryInstance;

/**
 * sessionTimeoutInSeconds
 * Set session timeout to 0 in order to avoid caching issues with Braze
 * @type {number}
 */
export const sessionTimeoutInSeconds = 0;

class BrazeConsumerRegistry {
    /**
     * Static constructor to store one instance of BrazeDispatcher per js env
     * @return {BrazeConsumerRegistry}
     * @constructor
     */
    static GetConsumerRegistry (options) {
        if (!registryInstance) {
            registryInstance = new BrazeConsumerRegistry(options);
        }
        return registryInstance;
    }

    get dispatcher () {
        return this._dispatcher;
    }

    constructor ({
        apiKey,
        userId,
        enableLogging,
        sessionTimeout = sessionTimeoutInSeconds
    }) {
        this.consumers = [];

        this.eventStream = new DispatcherEventStream();

        this._dispatcher = new BrazeDispatcher(sessionTimeout, this.eventStream);

        // TODO change this so we call all configure bits inside the dispatcher constructor
        this._dispatcher.configure({
            apiKey,
            userId,
            enableLogging
        });

        // subscribe to event stream for braze cards and messages
        this.eventStream.subscribe(CONTENT_CARDS_EVENT_NAME, this.applyContentCardCallbacks);
        this.eventStream.subscribe(IN_APP_MESSAGE_EVENT_NAME, this.applyInAppMessageCallbacks);
        this.eventStream.subscribe(IN_APP_MESSAGE_EVENT_CLICKS_NAME, this.applyInAppMessageClickEventsCallbacks);
    }

    /**
     * For each consumers content card callbacks fire the callback with supplied cards
     * @param cards
     */
    applyContentCardCallbacks (cards) {
        this.consumers.reduce((acc, consumer) => [...acc, ...consumer.getContentCardCallbacks()], [])
            .forEach(callback => {
                callback(cards);
            });
    }

    /**
     * For each consumers in app message callbacks fire the callback with the supplied message
     * @param message
     */
    applyInAppMessageCallbacks (message) {
        this.consumers.reduce((acc, consumer) => [...acc, ...consumer.getInAppMessagesCallbacks()], [])
            .forEach(callback => {
                callback(message);
            });
    }

    /**
     * For each consumers in app message click callbacks fire the callback with the supplied message
     * @param message
     */
    applyInAppMessageClickEventsCallbacks (message) {
        this.consumers.reduce((acc, consumer) => [...acc, ...consumer.getInAppMessageClickEventCallbacks()], [])
            .forEach(callback => {
                callback(message);
            });
    }

    /**
     * Register a consumer instance in the registry
     * @returns {BrazeConsumer, BrazeDispatcher}
     */
    register (options) {
        const consumer = new BrazeConsumer(options);
        this.consumers.push(consumer);
        return consumer;
    }

    /**
     * Remove the passed consumer from the registry
     * @param consumer {BrazeConsumer}
     */
    unregister (consumer) {
        if (this.consumers.findIndex(c => c === consumer) !== -1) {
            this.consumers.splice(this.consumers.findIndex(c => c === consumer), 1);
        } else {
            throw new Error("Can't find consumer in registry");
        }
    }
}

export default BrazeConsumerRegistry.GetConsumerRegistry;
