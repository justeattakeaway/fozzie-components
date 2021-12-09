import uniq from 'lodash.uniq';
import {
    filterByBrands,
    filterByEnabledCardTypes,
    pipe,
    filterByCurrentlyActive,
    sortByCardOrder
} from './utils/index';
import InvalidConsumerConfigError from './errors/InvalidConsumerConfigError';
import {
    HOME_PROMOTION_CARD_1,
    HOME_PROMOTION_CARD_2,
    POST_ORDER_CARD_1,
    PROMOTION_CARD_1,
    PROMOTION_CARD_2
} from './types/cardTypes';
import dispatcherEventStream from './DispatcherEventStream';
import { LOGGER } from './types/events';
import { LOG_ERROR, LOG_INFO } from './types/logger';

class BrazeConsumer {
    /**
     * Setter that is called when cards are set on the class, applies any filter methods on those cards and
     * sets the cards variable
     * @param cards
     */
    set cards (cards) {
        this._cards = this.applyFilterMethods(cards);
    }

    constructor ({
        enabledCardTypes = [],
        brands = [],
        callbacks = {},
        interceptInAppMessages = {},
        interceptInAppMessageClickEvents = {},
        logger = {},
        customFilters = [],
        userId,
        tags
    }) {
        this.$logger = logger;
        // temp logging function as dispatcher event stream is not available until the consumer is registered
        const logWhileInitialising = ({ type, message, data }) => {
            logger[type](message, null, { data, tags });
        };

        // key for logging
        this.loggingConsumerKey = `BrazeAdapter--consumer--${tags}--${userId}`;
        // set timer so we Know how long the process takes between initialisation and receiving content cards
        this.consumerRegisteredUnix = Date.now();
        this.consumerRegisteredLocale = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });

        this.defaultEnabledCardTypes = [
            HOME_PROMOTION_CARD_1,
            HOME_PROMOTION_CARD_2,
            POST_ORDER_CARD_1,
            PROMOTION_CARD_1,
            PROMOTION_CARD_2
        ];

        // check list all must be true to instantiate
        this.optionsChecks = [
            { 'Consumer callbacks must be an Object': !Array.isArray(callbacks) },
            { 'Consumer callbacks must contain at least ONE callback function': callbacks && Object.keys(callbacks).length !== 0 },
            { 'Consumer interceptInAppMessages must be an Object': !Array.isArray(interceptInAppMessages) },
            { 'Consumer interceptInAppMessageClickEvents must be an Object': !Array.isArray(interceptInAppMessageClickEvents) },
            { 'Consumer customFilters must be an Array': Array.isArray(customFilters) },
            { 'Consumer brands must be an Array': Array.isArray(brands) }
        ];

        this.optionsChecks.forEach(check => {
            Object.keys(check).forEach(k => {
                if (!check[k]) {
                    logWhileInitialising({
                        type: LOG_ERROR,
                        message: `Braze Adapter Section: (Consumer) Key: (${this.loggingConsumerKey}): Failed to register consumer ${this.loggingConsumerKey}, failed check: ${k}`,
                        data: { check: check[k], key: this.loggingConsumerKey }
                    });
                    throw new InvalidConsumerConfigError(k);
                }
            });
        });

        this.enabledCardTypes = enabledCardTypes || this.defaultEnabledCardTypes;

        logWhileInitialising({
            type: LOG_INFO,
            message: `Braze Adapter Section: (Consumer) Key: (${this.loggingConsumerKey}): Registering with the following enabled card types.`,
            data: { enabledCardTypes: this.enabledCardTypes, key: this.loggingConsumerKey }
        });

        this.customFilters = customFilters;

        logWhileInitialising({
            type: LOG_INFO,
            message: `Braze Adapter Section: (Consumer) Key: (${this.loggingConsumerKey}): Registering with the following enabled custom filters.`,
            data: { customFilters: this.customFilters, key: this.loggingConsumerKey }
        });

        this.inAppMessagesCallbacks = interceptInAppMessages;

        this.inAppMessageClickEventsCallbacks = interceptInAppMessageClickEvents;

        this.callbacks = callbacks;

        this.defaultFiltersInOrder = [
            sortByCardOrder,
            cards => filterByEnabledCardTypes(cards, this.enabledCardTypes),
            cards => filterByBrands(cards, this.brands),
            filterByCurrentlyActive
        ];

        this._cards = [];

        this.brands = [];

        // Here we just resolve a promise on brand to allow passing in a promise that resolves to a array of strings
        // and also accepts a array strings
        Promise.resolve(brands).then(brandsList => {
            this.brands = uniq([...this.brands, ...brandsList]);

            logWhileInitialising({
                type: LOG_INFO,
                message: `Braze Adapter Section: (Consumer) Key: (${this.loggingConsumerKey}): Registering with the following enabled brands.`,
                data: { brands: this.brands, key: this.loggingConsumerKey }
            });

            // check to see if cards has already been set if so re call all the content card callbacks
            if (this._cards.length) {
                this.getContentCardCallbacks().forEach(callback => {
                    callback(this._cards);
                });
            }
        });

        /**
         * Creates a function that takes cards as an argument and curries over the filters in both default
         * filters and custom filters
         * @type {(function(*=): *)|*}
         */
        this.applyFilterMethods = pipe(
            ...this.defaultFiltersInOrder,
            ...this.customFilters
        );
    }

    /**
     * Function that returns logger object that is passed as part of the instantiation of the class
     * @returns {}
     */
    getLogger () {
        return this.$logger;
    }

    /**
     * Function that loops over all inAppMessageClickEventsCallbacks and calls them
     * @returns {*[]}
     */
    getInAppMessageClickEventCallbacks () {
        return Object.keys(this.inAppMessageClickEventsCallbacks)
            .map(key => this.inAppMessageClickEventsCallbacks[key]);
    }

    /**
     * Function that loops over all inAppMessagesCallbacks and calls them
     * @returns {*[]}
     */
    getInAppMessagesCallbacks () {
        return Object.keys(this.inAppMessagesCallbacks)
            .map(key => this.inAppMessagesCallbacks[key]);
    }

    /**
     * Method takes all the consumer callbacks for content cards and wraps each of them in an anonymous function.
     * This enables the ability to set the cards on the consumer class, which in turn applies any filter functions to
     * the returned cards. Once the filters have been applied then it calls the callbacks.
     * @returns {(function(*): void)[]}
     */
    getContentCardCallbacks () {
        // eslint-disable-next-line func-names
        return Object.keys(this.callbacks).map(function mapContentCardCallbacks (key) {
            return cards => {
                dispatcherEventStream.publish(LOGGER, {
                    type: LOG_INFO,
                    message: `Braze Adapter Section: (Consumer) Key: (${this.loggingConsumerKey}): Content Cards count before filtering.`,
                    data: {
                        count: cards.length,
                        key: this.loggingConsumerKey,
                        registrationTime: this.consumerRegisteredLocale,
                        timeElapsedMS: (Date.now() - this.consumerRegisteredUnix)
                    }
                });

                this.cards = cards;

                dispatcherEventStream.publish(LOGGER, {
                    type: LOG_INFO,
                    message: `Braze Adapter Section: (Consumer) Key: (${this.loggingConsumerKey}): Content Cards count after filtering.`,
                    data: {
                        count: this._cards.length,
                        key: this.loggingConsumerKey,
                        registrationTime: this.consumerRegisteredLocale,
                        timeElapsedMS: (Date.now() - this.consumerRegisteredUnix)
                    }
                });

                this.callbacks[key](this._cards);
            };
        }, this);
    }
}

export default BrazeConsumer;
