import orderBy from 'lodash.orderby';
import findIndex from 'lodash.findindex';

/**
 * List of enabled card types
 *
 * @type {string[]}
 */
export const defaultEnabledCardTypes = [
    'Anniversary_Card_1',
    'Header_Card',
    'Post_Order_Card_1',
    'Promotion_Card_1',
    'Promotion_Card_2',
    'Restaurant_FTC_Offer_Card',
    'Terms_And_Conditions_Card',
    'Voucher_Card_1'
];

/**
 * @class ContentCards
 * @classdesc Content card utilities
 */
class ContentCards {
    /**
     * Create a ContentCards instance
     * @param {object} appboy - Appboy SDK instance
     * @param {object[]} appboy.cards
     * @param {object} opts - Options
     * @param {string[]} opts.enabledCardTypes
     * @property {string[]} this.enabledCardTypes
     * @property {object} this.appboy
     * @property {object[]} this.cards
     * @property {object} this.titleCard
     */
    constructor (appboy = {}, opts = {}) {
        const { cards = [] } = appboy;
        const { enabledCardTypes = [] } = opts;
        this.enabledCardTypes = enabledCardTypes.length ? enabledCardTypes : defaultEnabledCardTypes;
        this.appboy = appboy;
        this.cards = cards;
        this.titleCard = {};
    }

    /**
     * Outputs results
     * @returns {object} output
     * @returns {object} output.titleCard
     * @returns {object[]} output.cards
     */
    output () {
        return {
            titleCard: this.titleCard,
            cards: this.cards
        };
    }

    /**
     * Orders card by `order` value.
     * Example value: cards.extras.order = 'Numeric string'
     * @property {Object[]} this.cards
     * @returns {ContentCards}
     */
    orderCardsByOrderValue () {
        this.cards.sort(({ extras: { order: a } }, { extras: { order: b } }) => +a - +b);
        return this;
    }

    /**
     * Orders card by `update` value.
     * Example value: cards.updated = 'Date string'
     * @property {Object[]} this.cards
     * @returns {ContentCards}
     */
    orderCardsByUpdateValue () {
        this.cards = orderBy(this.cards, 'extras.updated');
        return this;
    }

    /**
     * Groups cards by preceding title cards (Header_Card).
     * Accounts for Terms_And_Conditions_Card for backwards compatibility.
     * @property {Object[]} this.cards
     * @returns {ContentCards}
     */
    arrangeCardsByTitles () {
        this.cards.reduce((acc, card) => {
            const { custom_card_type: type } = card.extras;
            if (type && (type === 'Header_Card' || type === 'Terms_And_Conditions_Card')) {
                return [...acc, { title: card.title, cards: [] }];
            }
            if (!acc.length) {
                return [{ title: '', cards: [card] }];
            }
            acc[acc.length - 1].cards.push(card);
            return acc;
        }, []);
        return this;
    }

    /**
     * Finds and segregates a title card
     * @property {Object[]} this.cards
     * @property {Object} this.titleCard
     * @returns {ContentCards}
     */
    getTitleCard () {
        const index = findIndex(this.cards, card => card.extras.custom_card_type === 'Terms_And_Conditions_Card' && card.url && card.pinned);
        const [titleCard] = index > -1 ? this.cards.splice(index, 1) : [{}];
        this.titleCard = titleCard;
        return this;
    }

    /**
     * Filters out card types based on `enabledCardTypes`
     * @property {Object[]} this.cards
     * @returns {ContentCards}
     */
    filterCards () {
        this.cards = this.cards.sort(({ extras: { order: a } }, { extras: { order: b } }) => +a - +b).filter(({ extras = {} }) => {
            const { custom_card_type: type } = extras;
            if (!type) return false;

            return this.enabledCardTypes.includes(type);
        });
        return this;
    }

    /**
     * Removes duplicate content cards.
     * There's a bug in Braze where duplicate content cards end up being displayed twice
     * This is being fix so in the mean time this function removes cards that have the same title and
     * card type it also orders the cards by the last updated date.
     * @property {Object[]} this.cards
     * @returns {ContentCards}
     */
    removeDuplicateContentCards () {
        this.cards = orderBy(this.cards, 'extras.updated').filter((contentCard, index, item) => index ===
            findIndex(item, card => (card.title === contentCard.title &&
                card.extras.custom_card_type === contentCard.extras.custom_card_type)));
        return this;
    }

    /**
     * Log Braze event and flush queue
     * @param {String} type - Event type (check braze sdk for log types)
     * @param {Object[]} payload - Event payload
     * @returns {Boolean} - Success status
     */
    logBrazeEvent (type, payload) {
        const { appboy } = this;
        if (!appboy || !appboy[type]) return false;
        const output = appboy[type](payload, true);
        appboy.requestImmediateDataFlush();

        return output;
    }
}

export default ContentCards;
