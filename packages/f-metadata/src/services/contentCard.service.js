import orderBy from 'lodash.orderby';
import startsWith from 'lodash.startswith';
import findIndex from 'lodash.findindex';
import transformCardData from './utils/transformCardData';
import isCardCurrentlyActive from './utils/isCardCurrentlyActive';

/**
 * A 'large number' to force cards without an order to be ordered to the back
 * @type {number}
 */
const DEFAULT_ORDER_VALUE = 9e9;

/**
 * List of enabled card types
 *
 * @type {string[]}
 */
export const defaultEnabledCardTypes = [
    'Home_Promotion_Card_1',
    'Home_Promotion_Card_2',
    'Post_Order_Card_1',
    'Promotion_Card_1',
    'Promotion_Card_2'
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
        this.enabledCardTypes = enabledCardTypes.length
            ? enabledCardTypes
            : defaultEnabledCardTypes;
        this.appboy = appboy;
        this.rawCards = cards;
        this.cards = cards.map(transformCardData);
        this.groups = [];
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
            cards: this.cards,
            groups: this.groups,
            rawCards: this.rawCards
        };
    }

    /**
     * Orders card by `order` value.
     * Example value: cards.extras.order = 'Numeric string'
     * @property {Object[]} this.cards
     * @returns {ContentCards}
     */
    orderCardsByOrderValue () {
        this.cards.sort((
            { order: a = DEFAULT_ORDER_VALUE },
            { order: b = DEFAULT_ORDER_VALUE }
        ) => (
            +a - +b
        ));
        return this;
    }

    /**
     * Orders card by `update` value.
     * Example value: cards.updated = 'Date string'
     * @property {Object[]} this.cards
     * @returns {ContentCards}
     */
    orderCardsByUpdateValue () {
        this.cards = orderBy(this.cards, 'updated');
        return this;
    }

    /**
     * Groups cards by preceding title cards (Header_Card).
     * Accounts for Terms_And_Conditions_Card for backwards compatibility.
     * @property {Object[]} this.cards
     * @returns {ContentCards}
     */
    arrangeCardsByTitles () {
        this.groups = this.cards.reduce((acc, card) => {
            const { type } = card;
            if (type && (startsWith(type, 'Header_Card') || startsWith(type, 'Terms_And_Conditions_Card'))) {
                return [...acc, { ...card, cards: [] }];
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
        const index = findIndex(
            this.cards,
            card => card.type === 'Terms_And_Conditions_Card' &&
                card.url &&
                card.pinned
        );
        const [titleCard] = index > -1 ? this.cards.splice(index, 1) : [{}];
        this.titleCard = titleCard;
        return this;
    }

    /**
     * Filters out card types based on `enabledCardTypes` and display times
     * @property {Object[]} this.cards
     * @returns {ContentCards}
     */
    filterCards (brands) {
        this.cards = this.cards
            .sort(({ order: a }, { order: b }) => +a - +b)
            .filter(({ type }) => (type ? this.enabledCardTypes.includes(type) : false))
            .filter(card => isCardCurrentlyActive(card, brands));
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
        this.cards = orderBy(this.cards, 'updated').filter((contentCard, index, item) => index ===
            findIndex(
                item,
                card => card.title === contentCard.title &&
                    card.type === contentCard.type
            ));
        return this;
    }
}

export default ContentCards;
