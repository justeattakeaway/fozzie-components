import BrazeConsumer from '../BrazeConsumer';
import { removeDuplicateContentCards } from '../utils';
import transformCardData from '../utils/transformCardData';

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

const mockConsumerOptions = {
    enabledCardTypes: [
        'Home_Promotion_Card_1',
        'Home_Promotion_Card_2',
        'Post_Order_Card_1',
        'Promotion_Card_1',
        'Promotion_Card_2'
    ],
    callbacks: {
        contentCards: jest.fn()
    },
    interceptInAppMessages: {
        messages: jest.fn()
    },
    interceptInAppMessageClickEvents: {
        clickEvents: jest.fn()
    },
    logger: {
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn()
    },
    brands: [
        'a',
        'b',
        'c',
        'd'
    ]
};

describe('BrazeConsumer', () => {
    it.each`
        parameter | value
        ${'callbacks'} | ${{ 'Consumer callbacks must contain at least ONE callback function': null }}
        ${'callbacks'} | ${{ 'Consumer callbacks must contain at least ONE callback function': {} }}
        ${'callbacks'} | ${{ 'Consumer callbacks must be an Object': [] }}
        ${'interceptInAppMessages'} | ${{ 'Consumer interceptInAppMessages must be an Object': [] }}
        ${'interceptInAppMessageClickEvents'} | ${{ 'Consumer interceptInAppMessageClickEvents must be an Object': [] }}
        ${'brands'} | ${{ 'Consumer brands must be an Array': {} }}
        ${'customFilters'} | ${{ 'Consumer customFilters must be an Array': {} }}
    `('should throw an error if $parameter is $value', async ({ parameter, value }) => {
        // Arrange
        function instantiateBrazeConsumer () {
            const testOptions = {
                ...mockConsumerOptions,
                [parameter]: value[Object.keys(value)[0]]
            };
            // eslint-disable-next-line no-unused-vars
            const consumer = new BrazeConsumer(testOptions);
        }

        // Assert
        expect(instantiateBrazeConsumer).toThrow(Object.keys(value)[0]);
    });

    it('should return an array of callbacks from getContentCardCallbacks method', () => {
        // Arrange
        const consumer = new BrazeConsumer(mockConsumerOptions);

        // Act
        const callbacks = consumer.getContentCardCallbacks();

        // Assert
        expect(callbacks).toEqual(expect.arrayContaining([expect.any(Function)]));
    });

    it('should call "contentCards" callback when returned callbacks are called', () => {
        // Arrange
        const consumer = new BrazeConsumer(mockConsumerOptions);
        const cards = removeDuplicateContentCards(mockCards.map(transformCardData));

        // Act
        const callbacks = consumer.getContentCardCallbacks();
        callbacks.forEach(callback => {
            callback(cards);
        });

        // Assert
        expect(mockConsumerOptions.callbacks.contentCards).toHaveBeenCalled();
    });

    it('should return an array of callbacks from getInAppMessagesCallbacks method', () => {
        // Arrange
        const consumer = new BrazeConsumer(mockConsumerOptions);

        // Act
        const callbacks = consumer.getInAppMessagesCallbacks();

        // Assert
        expect(callbacks).toEqual(expect.arrayContaining([mockConsumerOptions.interceptInAppMessages.messages]));
    });

    it('should return an array of callbacks from getLoggerCallbacks method', () => {
        // Arrange
        const consumer = new BrazeConsumer(mockConsumerOptions);

        // Act
        const callback = consumer.getLogger();

        // Assert
        expect(callback).toEqual(expect.objectContaining(mockConsumerOptions.logger));
    });
});
