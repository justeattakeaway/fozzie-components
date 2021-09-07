import BrazeConsumer from './BrazeConsumer';
import BrazeDispatcher from './BrazeDispatcher';
import dispatcherEventStream from './DispatcherEventStream';
import {
    CONTENT_CARDS_EVENT_NAME,
    IN_APP_MESSAGE_EVENT_CLICKS_NAME,
    IN_APP_MESSAGE_EVENT_NAME,
    LOGGER
} from './types/events';
import { LOG_ERROR, LOG_INFO } from './types/logger';

let registryInstance;

/**
 * sessionTimeoutInSeconds
 * Set session timeout to 0 in order to avoid caching issues with Braze
 * @type {number}
 */
export const sessionTimeoutInSeconds = 0;

class BrazeConsumerRegistry {
    /**
     * Static constructor to store one instance of BrazeConsumerRegistry per js env
     * @return {BrazeConsumerRegistry}
     * @constructor
     */
    static GetConsumerRegistry ({
        sessionTimeout = sessionTimeoutInSeconds,
        apiKey,
        userId,
        enableLogging,
        tags
    }) {
        if (!registryInstance) {
            const dispatcher = new BrazeDispatcher({
                sessionTimeout,
                apiKey,
                userId,
                enableLogging
            });

            registryInstance = new BrazeConsumerRegistry(dispatcher, userId, tags);
        }

        return registryInstance;
    }

    get dispatcher () {
        return this._dispatcher;
    }

    constructor (dispatcher, userId, tags) {
        // key to identify logs
        this.$key = `BrazeAdapter--registry--${userId}`;
        this.$tags = tags;

        this.consumers = [];

        // subscribe to event stream for braze cards and messages
        dispatcherEventStream.subscribe(CONTENT_CARDS_EVENT_NAME, cards => this.applyContentCardCallbacks(cards));
        dispatcherEventStream.subscribe(IN_APP_MESSAGE_EVENT_NAME, message => this.applyInAppMessageCallbacks(message));
        dispatcherEventStream.subscribe(IN_APP_MESSAGE_EVENT_CLICKS_NAME, message => this.applyInAppMessageClickEventsCallbacks(message));
        dispatcherEventStream.subscribe(LOGGER, ({ type, message, data }) => this.applyLoggerCallbacks(type, message, data));

        this._dispatcher = dispatcher;
    }

    /**
     * For each consumers logger callbacks fire the callback with log data
     * @param type
     * @param message
     * @param data
     */
    applyLoggerCallbacks (type, message, data) {
        this.consumers.reduce((acc, consumer) => [...acc, consumer.getLogger()], [])
            .forEach(callback => {
                // adding tags in so logs can be sorted
                callback[type](message, { ...data, tags: this.$tags });
            });
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
     * @returns {BrazeConsumer}
     */
    register (options) {
        const consumer = new BrazeConsumer(options);
        this.consumers.push(consumer);
        dispatcherEventStream.publish(LOGGER, {
            type: LOG_INFO,
            message: `Braze Adapter Section: (Registry) Key: (${this.$key}): A Consumer of Braze Content cards has been registered`,
            data: { key: this.$key }
        });
        return consumer;
    }

    /**
     * Remove the passed consumer from the registry
     * @param consumer {BrazeConsumer}
     */
    unregister (consumer) {
        if (this.consumers.findIndex(c => c === consumer) !== -1) {
            this.consumers.splice(this.consumers.findIndex(c => c === consumer), 1);
            dispatcherEventStream.publish(LOGGER, {
                type: LOG_INFO,
                message: `Braze Adapter Section: (Registry) Key: (${this.$key}): Consumer unregistered from the consumer registry`,
                data: { key: this.$key }
            });
        } else {
            dispatcherEventStream.publish(LOGGER, {
                type: LOG_ERROR,
                message: `Braze Adapter Section: (Registry) Key: (${this.$key}): Failed to unregister consumer`,
                data: { key: this.$key }
            });
            throw new Error('Failed to unregister consumer, consumer not in registry.');
        }
    }
}

export default BrazeConsumerRegistry.GetConsumerRegistry;
