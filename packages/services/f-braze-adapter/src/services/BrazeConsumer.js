import uniq from 'lodash.uniq';
import {
    filterByBrands,
    filterByEnabledCardTypes,
    pipe,
    filterByCurrentlyActive,
    sortByCardOrder
} from './utils/index';

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
        enabledCardTypes,
        brands = [],
        callbacks = {},
        interceptInAppMessages = {},
        interceptInAppMessageClickEvents = {},
        customFilters = []
    }) {
        this.defaultEnabledCardTypes = [
            'Home_Promotion_Card_1',
            'Home_Promotion_Card_2',
            'Post_Order_Card_1',
            'Promotion_Card_1',
            'Promotion_Card_2'
        ];

        this.enabledCardTypes = enabledCardTypes || this.defaultEnabledCardTypes;

        this.customFilters = customFilters;

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
            // check to see if cards has already been set if so re call all the content card callbacks
            if (this._cards.length > 0) {
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
        const _this = this;
        // eslint-disable-next-line func-names
        return Object.keys(this.callbacks).map(key => function (cards) {
            _this.cards = cards;
            _this.callbacks[key](_this._cards);
        });
    }
}

export default BrazeConsumer;
