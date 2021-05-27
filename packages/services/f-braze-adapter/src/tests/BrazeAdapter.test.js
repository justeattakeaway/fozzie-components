import BrazeAdapter from '../BrazeAdapter';
import GetConsumerRegistry from '../services/BrazeConsumerRegistry';

jest.mock('../services/BrazeConsumerRegistry');


const mockConfig = {
    apiKey: '__TEST_API_KEY__',
    userId: '__TEST_USER_ID__',
    enableLogging: false,
    sessionTimeout: 0,
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
    ],
    customFilters: []
};

describe('BrazeAdapter', () => {
    describe('instantiation', () => {
        beforeEach(async () => {
            // Arrange
            GetConsumerRegistry.mockReset();
        });

        it('should create an instance of the BrazeAdapter', async () => {
            // Arrange
            GetConsumerRegistry.mockImplementation(() => ({
                register: jest.fn()
            }));

            // Act
            const brazeAdapter = await BrazeAdapter.initialise(mockConfig);

            // Assert
            expect(brazeAdapter).toBeInstanceOf(BrazeAdapter);
        });

        it('should call the GetConsumerRegistry function', async () => {
            // Arrange
            GetConsumerRegistry.mockImplementation(() => ({
                register: jest.fn()
            }));

            // Act
            await BrazeAdapter.initialise(mockConfig);

            // Assert
            expect(GetConsumerRegistry).toHaveBeenCalledTimes(1);
        });

        it('should handle errors in instantiating the consumer registry', async () => {
            // Arrange
            const error = new Error('Test error');
            GetConsumerRegistry.mockImplementation(() => new Promise((resolve, reject) => {
                reject(error);
            }));

            // Assert
            expect(BrazeAdapter.initialise(mockConfig)).rejects.toEqual(error);
        });

        it('should handle errors in registering a consumer', async () => {
            // Arrange
            GetConsumerRegistry.mockImplementation(() => ({
                register: () => {
                    throw new Error('Test error');
                }
            }));

            // Assert
            expect(BrazeAdapter.initialise(mockConfig)).rejects.toThrowError('Test error');
        });

        it('should NOT be a singleton class', async () => {
            // Arrange
            GetConsumerRegistry.mockImplementation(() => ({
                register: jest.fn()
            }));

            // Act
            const brazeAdapter = await BrazeAdapter.initialise(mockConfig);

            const brazeAdapter2 = await BrazeAdapter.initialise(mockConfig);

            // Assert
            expect(brazeAdapter).not.toEqual(brazeAdapter2);
        });
    });
    describe('Push Events', () => {
        const rawCards = [
            { id: 'card1' },
            { id: 'card2' }
        ];

        let brazeAdapter;

        beforeEach(async () => {
            // Arrange
            GetConsumerRegistry.mockImplementation(() => ({
                consumers: [],
                register: jest.fn(),
                dispatcher: {
                    pushShapedEventToDataLayer: jest.fn(),
                    logCardClick: jest.fn(),
                    logCardImpressions: jest.fn()
                },
                unregister: jest.fn()
            }));

            brazeAdapter = await BrazeAdapter.initialise(mockConfig);
        });

        it('should pushShapedEventToDataLayer via dispatcher', () => {
            // Arrange
            const pushToDataLayer = jest.fn();
            const givenContent = { foo: 'bar' };

            // Act
            brazeAdapter.pushShapedEventToDataLayer(pushToDataLayer, givenContent);

            // Assert
            expect(brazeAdapter.dispatcher.pushShapedEventToDataLayer).toHaveBeenCalledWith(pushToDataLayer, givenContent);
        });

        it('should logCardClick via the dispatcher', () => {
            // Act
            brazeAdapter.logCardClick(rawCards[0].id);

            // Assert
            expect(brazeAdapter.dispatcher.logCardClick).toHaveBeenCalledWith(rawCards[0].id);
        });

        it('should logCardImpressions via the dispatcher', () => {
            // Act
            brazeAdapter.logCardImpressions([rawCards[0].id, rawCards[1].id]);

            // Assert
            expect(brazeAdapter.dispatcher.logCardImpressions).toHaveBeenCalledWith([rawCards[0].id, rawCards[1].id]);
        });

        describe('unsubscribe', () => {
            it('should unregister the consumer that this braze adapter instance created', () => {
                // Act
                brazeAdapter.unsubscribe();

                // Assert
                expect(brazeAdapter._consumerRegistry.unregister).toHaveBeenCalled();
            });
        });
    });
});
