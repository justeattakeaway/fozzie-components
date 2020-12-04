import uniq from 'lodash.uniq';

import ContentCards from './services/contentCard.service';
import isAppboyInitialised from './utils/isAppboyInitialised';
import { LogService } from './services/logging/logging.service';

/* braze event handler callbacks */

/**
 * Dispatches events for in-app message clicks to the registered handlers
 * @param message
 * @this BrazeDispatcher
 */
function interceptInAppMessageClickEventsHandler (message) {
    this.inAppMessageClickEventCallbacks.forEach(callback => callback(message));
}

/**
 * Dispatches events for in-app messages to component-registered callbacks and registers internal handler to the
 * click events of the CTA button
 * @param message
 * @this BrazeDispatcher
 */
function interceptInAppMessagesHandler (message) {
    if (message instanceof this.appboy.ab.InAppMessage) {
        /**
         * Always subscribe click action to second button
         * as this is always "success" as opposed to "dismiss"
         * as confirmed with CRM (AS)
         */
        this.inAppMessagesCallbacks.forEach(callback => callback(message));
        if (message.buttons && message.buttons.length >= 2) {
            const [, button] = message.buttons;
            // Note that the below subscription returns an ID that could later be used to unsubscribe
            button.subscribeToClickedEvent(() => interceptInAppMessageClickEventsHandler.bind(this)(message));
        }
    }
    this.appboy.display.showInAppMessage(message);
}

/**
 * Internal handler for content cards that dispatches to component-registered callbacks
 * @param postCardsAppboy
 * @this BrazeDispatcher
 */
function contentCardsHandler (postCardsAppboy) {
    this.refreshRequested = false;

    const {
        cards,
        rawCards,
        groups
    } = new ContentCards(postCardsAppboy, { enabledCardTypes: this.dispatcherOptions.enabledCardTypes })
        .removeDuplicateContentCards()
        .filterCards(this.brands)
        .getTitleCard()
        .arrangeCardsByTitles()
        .output();

    this.cardsCallbacks.forEach(callback => callback(cards));
    this.groupedCardsCallback.forEach(callback => callback(groups));

    this.rawCards = rawCards;

    this.rawCardIndex = Object.fromEntries(this.rawCards.map((rawCard, idx) => [rawCard.id, idx]));
}

/* BrazeDispatcher */

let dispatcherInstance;

class BrazeDispatcher {
    /**
     * Static constructor to store one instance of BrazeDispatcher per js env
     * @param {Number} sessionTimeoutInSeconds
     * @return {BrazeDispatcher}
     * @constructor
     */
    static GetDispatcher (sessionTimeoutInSeconds) {
        if (!dispatcherInstance) {
            dispatcherInstance = new BrazeDispatcher(sessionTimeoutInSeconds);
        }
        return dispatcherInstance;
    }

    /**
     * Sets defaults, checks environment, checks for reinstantiation
     * @param {Number} sessionTimeoutInSeconds
     */
    constructor (sessionTimeoutInSeconds) {
        if (typeof window === 'undefined') throw new Error('window is not defined');

        if (dispatcherInstance && dispatcherInstance !== this) {
            throw new Error('do not instantiate more than one instance of BrazeDispatcher');
        }
        dispatcherInstance = this;

        this.appboyPromise = null;

        this.brands = [];

        this.dispatcherOptions = null;

        this.loggerCallbackInstances = [];
        this.cardsCallbacks = [];
        this.groupedCardsCallback = [];
        this.inAppMessageClickEventCallbacks = [];
        this.inAppMessagesCallbacks = [];

        this.rawCards = null;

        this.rawCardIndex = {};

        this.refreshRequested = false;

        this.sessionTimeoutInSeconds = sessionTimeoutInSeconds;

        this.eventSignifier = 'BrazeContent';
    }

    /**
     * Checks and sets configuration, appends given callbacks to internal registries and sets internal promise
     * resolving to appboy SDK.
     * Opens session, sets user ID and/or subscribes internal callbacks if necessary
     *
     * @param {Object} options
     * @return {Promise<null|*>}
     */
    async configure (options = {}) {
        this.appboy = window.appboy;
        const {
            apiKey,
            userId,
            disableComponent = false,
            callbacks = {},
            loggerCallbacks = {},
            enableLogging,
            enabledCardTypes = [],
            brands = []
        } = options;

        if (!this.dispatcherOptions) {
            this.dispatcherOptions = {
                apiKey,
                userId,
                enabledCardTypes
            };
        } else if (!(apiKey === this.dispatcherOptions.apiKey
            && userId === this.dispatcherOptions.userId
            && JSON.stringify(enabledCardTypes.slice().sort())
                === JSON.stringify(this.dispatcherOptions.enabledCardTypes.slice().sort()))) {
            throw new Error('attempt to reinitialise appboy with different parameters');
        }

        Object.keys(loggerCallbacks).forEach(key => {
            this.loggerCallbackInstances.push((new LogService(loggerCallbacks[key])));
        });

        window.dataLayer = window.dataLayer || [];

        // Add callbacks to internal lists prior to attempting to configure appboy
        if (callbacks.interceptInAppMessageClickEvents) this.inAppMessageClickEventCallbacks.push(callbacks.interceptInAppMessageClickEvents);
        if (callbacks.interceptInAppMessages) this.inAppMessagesCallbacks.push(callbacks.interceptInAppMessages);
        if (callbacks.handleContentCards) this.cardsCallbacks.push(callbacks.handleContentCards);
        if (callbacks.handleContentCardsGrouped) this.groupedCardsCallback.push(callbacks.handleContentCardsGrouped);

        // Concatenate brands to existing allowed brands for now
        // TODO create registry of brands to apply before passing cards lists back to callbacks (has linked issue)
        if (brands) {
            this.brands = uniq([...this.brands, ...brands]);
        }

        // Note that appBoyPromise will not be set if this is the first time running this method -
        // this is a guard against initialise() being called more than once, and attempting to
        // reboot the entire appboy sdk.
        if (this.appboyPromise) {
            this.appboyPromise
                .then(appboy => this.requestRefresh(appboy));
            return this.appboyPromise;
        }

        const isInitialised = await isAppboyInitialised(window.appboy);

        if (isInitialised) {
            this.appboyPromise = Promise.resolve(window.appboy);
            this.subscribeBraze(window.appboy);
            return this.appboyPromise;
        }

        if (disableComponent || !apiKey || !userId) {
            this.appboyPromise = Promise.resolve();
            return this.appboyPromise;
        }

        try {
            this.appboyPromise = import(/* webpackChunkName: "appboy-web-sdk" */ 'appboy-web-sdk')
                .then(({ default: appboy }) => {
                    appboy.initialize(apiKey, { enableLogging, sessionTimeoutInSeconds: this.sessionTimeoutInSeconds });
                    appboy.openSession();

                    window.appboy = appboy;

                    this.subscribeBraze(appboy);

                    appboy.changeUser(userId, () => {
                        window.dataLayer.push({
                            event: 'appboyReady'
                        });
                    });

                    return window.appboy;
                });

            return await this.appboyPromise;
        } catch (error) {
            throw new Error(`An error occurred while loading the component: ${error}`);
        }
    }

    /**
     * Subscribes internal callbacks to Braze SDK hooks
     * @param appboy
     */
    subscribeBraze (appboy) {
        // Note that the below subscriptions return an ID that could later be used to unsubscribe
        appboy.subscribeToInAppMessage(interceptInAppMessagesHandler.bind(this));
        appboy.subscribeToContentCardsUpdates(contentCardsHandler.bind(this));

        this.requestRefresh(appboy);
    }

    /**
     * Ensures only one card refresh request is queued at once
     * @param appboy
     */
    requestRefresh (appboy) {
        if (!this.refreshRequested) {
            this.refreshRequested = true;
            appboy.requestContentCardsRefresh();
        }
    }

    /**
     * Abstracts card interaction reports to braze SDK
     * @param {String} type
     * @param {Card} payload
     * @return {Promise<boolean|*>}
     */
    async logEvent (type, payload) {
        if (!this.appboyPromise) return false;

        const appboy = await this.appboyPromise;

        const output = appboy[type](payload, true);
        appboy.requestImmediateDataFlush();

        return output;
    }

    /**
     * Reports card click interaction to Braze SDK
     * @param {String} cardId
     * @return {Promise<boolean|*>}
     */
    logCardClick (cardId) {
        const cardIndex = this.rawCardIndex[cardId];
        const card = this.rawCards[cardIndex];
        return this.logEvent('logCardClick', card);
    }

    /**
     * Reports card impressions interaction to Braze SDK
     * @param {String[]} cardIds
     * @return {Promise<boolean|*>}
     */
    logCardImpressions (cardIds) {
        const cardsShown = cardIds.map(cardId => this.rawCardIndex[cardId])
            .filter(a => a !== undefined)
            .map(cardIndex => this.rawCards[cardIndex]);
        return this.logEvent('logCardImpressions', cardsShown);
    }

    /**
     * Uses supplied pushToDataLayer function to report braze card event
     * @param {Function} pushToDataLayer
     * @param {Object} payload
     */
    pushShapedEventToDataLayer (pushToDataLayer, payload) {
        pushToDataLayer({
            event: this.eventSignifier,
            custom: {
                braze: payload
            }
        });
    }

    /**
     * Logger for braze dispatcher, utilizes a logging class to call the call back based on type
     * @param type - Function name being called on the class ( should be in ['info', 'warn', 'error'])
     * @param {string} logMessage - Describe what happened
     * @param {object} [payload={}] - Any additional properties you want to add to the logs
     */
    logger (type, logMessage, payload) {
        this.loggerCallbackInstances.forEach(instance => {
            // eslint-disable-next-line no-unused-expressions
            instance[type] && instance[type](logMessage, payload);
        });
    }
}

export default BrazeDispatcher.GetDispatcher;
