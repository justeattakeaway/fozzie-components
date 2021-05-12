import GetConsumerRegistry from '../BrazeConsumerRegistry';
import transformCardData from '../utils/transformCardData';
import BrazeDispatcher from '../BrazeDispatcher';

jest.mock('../BrazeDispatcher');

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

const TEST_MESSAGE = '__MOCK_MESSAGE__';
const apiKey = '__API_KEY__';
const userId = '__USER_ID__';

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
    brands: [
        'a',
        'b',
        'c',
        'd'
    ]
};

const registryOptions = {
    apiKey,
    userId,
    enableLogging: false,
    sessionTimeout: 0
};

describe('BrazeConsumerRegistry', () => {
    describe('GetDispatcher', () => {
        it('should return the same BrazeConsumerRegistry instance when called twice', () => {
            // Arrange
            const ConsumerRegistry1 = GetConsumerRegistry(registryOptions);

            // Act
            const ConsumerRegistry2 = GetConsumerRegistry(registryOptions);

            // Assert
            expect(ConsumerRegistry1).toBe(ConsumerRegistry2);
        });
        it('should instantiate BrazeDispatcher', () => {
            // Act
            GetConsumerRegistry(registryOptions);

            // Assert
            expect(BrazeDispatcher).toHaveBeenCalledTimes(1);
        });
    });
    describe('callbacks', () => {
        let consumerRegistry;
        beforeEach(() => {
            // Arrange
            BrazeDispatcher.mockClear();
            consumerRegistry = GetConsumerRegistry(registryOptions);
            consumerRegistry.consumers.length = 0;
            consumerRegistry.register(mockConsumerOptions);
        });

        it('should call all content card callbacks for each consumer in the registry', () => {
            // Act
            consumerRegistry.applyContentCardCallbacks(mockCards.map(transformCardData));

            // Assert
            expect(mockConsumerOptions.callbacks.contentCards).toHaveBeenCalled();
        });

        it('should call all in app message callbacks for each consumer in the registry', () => {
            // Act
            consumerRegistry.applyInAppMessageCallbacks(TEST_MESSAGE);

            // Assert
            expect(mockConsumerOptions.interceptInAppMessages.messages).toHaveBeenCalledWith(TEST_MESSAGE);
        });

        it('should call all in app message click events callbacks for each consumer in the registry', () => {
            // Act
            consumerRegistry.applyInAppMessageClickEventsCallbacks(TEST_MESSAGE);

            // Assert
            expect(mockConsumerOptions.interceptInAppMessageClickEvents.clickEvents).toHaveBeenCalledWith(TEST_MESSAGE);
        });
    });

    describe('register', () => {
        let consumerRegistry;
        beforeEach(() => {
            BrazeDispatcher.mockClear();
            consumerRegistry = GetConsumerRegistry(registryOptions);
            consumerRegistry.consumers.length = 0;
        });

        it('should register a consumer and add it to the registry', () => {
            // Act
            consumerRegistry.register(mockConsumerOptions);

            // Assert
            expect(consumerRegistry.consumers.length).toEqual(1);
        });

        it('should throw an error if the consumer options passed can not instantiate a consumer instance', () => {
            // Arrange
            const modifiedMockConsumerOptions = {
                ...mockConsumerOptions,
                callbacks: null
            };

            function mockError () {
                consumerRegistry.register(modifiedMockConsumerOptions);
            }

            // Assert
            expect(mockError).toThrow();
            expect(consumerRegistry.consumers.length).toEqual(0);
        });
    });

    describe('unregister', () => {
        let consumerRegistry;
        let consumer;
        beforeEach(() => {
            // Arrange
            BrazeDispatcher.mockClear();
            consumerRegistry = GetConsumerRegistry(registryOptions);
            consumerRegistry.consumers.length = 0;
            consumer = consumerRegistry.register(mockConsumerOptions);
        });
        it('should remove a consumer from the registry', () => {
            // Act
            consumerRegistry.unregister(consumerRegistry.consumers[0]);

            // Assert
            expect(consumerRegistry.consumers.length).toEqual(0);
        });

        it('should throw an error if the consumer is not in the registry', () => {
            // Act
            consumerRegistry.consumers.length = 0;

            function mockError () {
                consumerRegistry.unregister(consumer);
            }

            // Assert
            expect(mockError).toThrowError("Can't find consumer in registry");
        });
    });
});
