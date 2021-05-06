import BrazeConsumer from '../BrazeConsumer';
import { removeDuplicateContentCards } from '../utils';
import transformCardData from '../utils/transformCardData';

// Arrange
const mockCards = [
    {
        title: '51 Pegasi b',
        extras: {
            updated: '2020-02-17T13:23:58.000Z',
            custom_card_type: 'Promotion_Card_1', // eslint-disable-line camelcase
            order: '2'
        }
    },
    {
        title: 'Wasp-17b',
        extras: {
            updated: '2020-02-16T12:28:58.000Z',
            custom_card_type: 'Promotion_Card_2', // eslint-disable-line camelcase
            order: '3'
        }
    },
    {
        title: 'Wasp-19b',
        extras: {
            updated: '2020-02-15T18:23:58.000Z',
            custom_card_type: 'Promotion_Card_3', // eslint-disable-line camelcase
            order: '1'
        }
    }
];

const getContentCards = cards => {
    console.log(cards);
};

const consumerOptions = {
    enabledCardTypes: [
        'Home_Promotion_Card_1',
        'Home_Promotion_Card_2',
        'Post_Order_Card_1',
        'Promotion_Card_1',
        'Promotion_Card_2'
    ],
    callbacks: {
        contentCards: getContentCards
    },
    interceptInAppMessages: {},
    interceptInAppMessageClickEvents: {},
    brands: [
        'a',
        'b',
        'c',
        'd'
    ]
};

describe('BrazeConsumer', () => {
    it('should return an array of callbacks that when called return an array of of filtered cards', () => {
        const consumer = new BrazeConsumer(consumerOptions);

        const callbacks = consumer.getContentCardCallbacks();

        const testCards = removeDuplicateContentCards(mockCards.map(transformCardData));

        callbacks.forEach(callback => {
            callback(testCards);
        });
    });
});
