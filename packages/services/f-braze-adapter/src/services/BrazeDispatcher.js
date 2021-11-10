import appboy from '@braze/web-sdk';
import transformCardData from './utils/transformCardData';
import removeDuplicateContentCards from './utils/removeDuplicateContentCards';
import areCookiesPermitted from './utils/areCookiesPermitted';
import { CONTENT_CARDS_EVENT_NAME, IN_APP_MESSAGE_EVENT_NAME } from './types/events';
import dispatcherEventStream from './DispatcherEventStream';
import isAppboyInitialised from './utils/isAppboyInitialised';

/* braze event handler callbacks */

/**
 * Dispatches events for in-app message clicks to the registered handlers
 * @param message
 * @this BrazeDispatcher
 */
function interceptInAppMessageClickEventsHandler (message) {
    dispatcherEventStream.publish(IN_APP_MESSAGE_EVENT_NAME, message);
}

/**
 * Dispatches events for in-app messages to component-registered callbacks and registers internal handler to the
 * click events of the CTA button
 * @param message
 * @this BrazeDispatcher
 */
function interceptInAppMessagesHandler (message) {
    if (message instanceof appboy.InAppMessage) {
        /**
         * Always subscribe click action to second button
         * as this is always "success" as opposed to "dismiss"
         * as confirmed with CRM (AS)
         */
        dispatcherEventStream.publish(IN_APP_MESSAGE_EVENT_NAME, message);

        if (message.buttons && message.buttons.length >= 2) {
            const [, button] = message.buttons;
            // Note that the below subscription returns an ID that could later be used to unsubscribe
            button.subscribeToClickedEvent(() => interceptInAppMessageClickEventsHandler(message));
        }
    }
    appboy.display.showInAppMessage(message);
}
/**
 * Internal handler for content cards that dispatches to component-registered callbacks
 * @param postCardsAppboy
 * @this BrazeDispatcher
 */
function contentCardsHandler (postCardsAppboy) {
    this.refreshRequested = false;

    const { cards = [] } = postCardsAppboy;

    const processedCards = removeDuplicateContentCards(cards.map(transformCardData));

    dispatcherEventStream.publish(CONTENT_CARDS_EVENT_NAME, processedCards);

    this.rawCards = cards;

    this.rawCardIndex = Object.fromEntries(this.rawCards.map((rawCard, idx) => [rawCard.id, idx]));
}

/* BrazeDispatcher */
class BrazeDispatcher {
    dispatcherOptions = null;

    rawCards = null;

    rawCardIndex = {};

    refreshRequested = false;

    eventSignifier = 'BrazeContent';

    loggerCallbackInstances = [];

    /**
     * Abstracts card interaction reports to braze SDK
     * @param {String} type
     * @param {Card} payload
     * @return {boolean|*}
     */
    static logEvent (type, payload) {
        const output = appboy[type](payload, true);
        appboy.requestImmediateDataFlush();
        return output;
    }

    /**
     * Sets defaults, checks environment, checks for reinstantiation
     * @param {Number} sessionTimeoutInSeconds
     * @param apiKey
     * @param enableLogging
     * @param userId
     */
    constructor ({
        sessionTimeoutInSeconds = 0,
        apiKey,
        enableLogging,
        userId
    }) {
        if (typeof window === 'undefined') throw new Error('window is not defined');

        if (!this.dispatcherOptions) {
            this.dispatcherOptions = {
                apiKey,
                userId
            };
        } else if (!(apiKey === this.dispatcherOptions.apiKey && userId === this.dispatcherOptions.userId)) {
            throw new Error('Attempt to reinitialise appboy with different parameters');
        }

        window.dataLayer = window.dataLayer || [];

        if (!apiKey || !userId) {
            throw new Error('Not initialising braze due to config');
        }

        if (!isAppboyInitialised()) {
            const initialised = appboy.initialize(apiKey, {
                baseUrl: 'sdk.iad-03.appboy.com',
                enableLogging,
                sessionTimeoutInSeconds,
                noCookies: !areCookiesPermitted()
            });

            if (initialised) {
                appboy.openSession();

                this.subscribeBraze();

                appboy.changeUser(userId, () => {
                    window.dataLayer.push({
                        event: 'appboyReady'
                    });
                });
            } else {
                throw new Error('Not initialising braze due to config');
            }
        } else {
            this.subscribeBraze();
        }
    }

    /**
     * Subscribes internal callbacks to Braze SDK hooks
     */
    subscribeBraze () {
        // Note that the below subscriptions return an ID that could later be used to unsubscribe
        appboy.subscribeToInAppMessage(interceptInAppMessagesHandler.bind(this));
        appboy.subscribeToContentCardsUpdates(contentCardsHandler.bind(this));

        this.requestRefresh(appboy);
    }

    /**
     * Ensures only one card refresh request is queued at once
     */
    requestRefresh () {
        if (!this.refreshRequested) {
            this.refreshRequested = true;
            appboy.requestContentCardsRefresh();
        }
    }

    /**
     * Reports card click interaction to Braze SDK
     * @param {String} cardId
     * @return {Promise<boolean|*>}
     */
    logCardClick (cardId) {
        const cardIndex = this.rawCardIndex[cardId];
        const card = this.rawCards[cardIndex];
        return BrazeDispatcher.logEvent('logCardClick', card);
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
        return BrazeDispatcher.logEvent('logCardImpressions', cardsShown);
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
}

export default BrazeDispatcher;
