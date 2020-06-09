import orderBy from 'lodash.orderby';
import findIndex from 'lodash.findindex';

export const enabledCardTypes = [
    'Anniversary_Card_1',
    'Header_Card',
    'Promotion_Card_1',
    'Promotion_Card_2',
    'Restaurant_FTC_Offer_Card',
    'Terms_And_Conditions_Card',
    'Voucher_Card_1'
];

class ContentCards {
    constructor (appboy = {}) {
        const { cards = [] } = appboy;
        this.appboy = appboy;
        this.cards = cards;
        this.titleCard = {};
    }

    output () {
        return {
            titleCard: this.titleCard,
            cards: this.cards
        };
    }

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

    getTitleCard () {
        const index = findIndex(this.cards, card => card.extras.custom_card_type === 'Terms_And_Conditions_Card' && card.url && card.pinned);
        const [titleCard] = index > -1 ? this.cards.splice(index, 1) : [{}];
        this.titleCard = titleCard;
        return this;
    }

    filterCards () {
        this.cards = this.cards.sort(({ extras: { order: a } }, { extras: { order: b } }) => +a - +b).filter(({ extras = {} }) => {
            const { custom_card_type: type } = extras;
            if (!type) return false;

            return enabledCardTypes.includes(type);
        });
        return this;
    }

    removeDuplicateContentCards () {
        this.cards = orderBy(this.cards, 'extras.updated').filter((contentCard, index, item) => index ===
            findIndex(item, card => (card.title === contentCard.title &&
                card.extras.custom_card_type === contentCard.extras.custom_card_type)));
        return this;
    }

    logBrazeEvent (type, payload) {
        const { appboy } = this;
        if (!appboy) return false;

        const output = appboy[type](payload, true);
        appboy.requestImmediateDataFlush();

        return output;
    }
}

export default ContentCards;
