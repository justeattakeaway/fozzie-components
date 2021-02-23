/* eslint indent: ["error", 4, {ignoredNodes: ["TemplateLiteral > *"]}] */
import appboySDK from 'appboy-web-sdk';

import 'core-js/modules/es.object.from-entries';

import isAppboyInitialised from '../utils/isAppboyInitialised';
import ContentCards from '../services/contentCard.service';

jest.mock('appboy-web-sdk');
jest.mock('../utils/isAppboyInitialised');
jest.mock('../services/contentCard.service');

let appboy;
jest.isolateModules(() => {
    /* eslint-disable-next-line global-require */
    appboy = require('appboy-web-sdk');
    jest.mock('appboy-web-sdk');
});

const handleContentCards = jest.fn();
const handleContentCardsGrouped = jest.fn();
const interceptInAppMessages = jest.fn();
const interceptInAppMessageClickEvents = jest.fn();
const loggingCallback = jest.fn();

const dataLayer = {
    push: jest.fn()
};

const apiKey = '__API_KEY__';
const userId = '__USER_ID__';

const TEST_LOG_MESSAGE = '__TEST_MESSAGE__';
const TEST_PAYLOAD = {
    test: '__TEST_PAYLOAD__'
};

const enabledComponentParameters = {
    disableComponent: false,
    apiKey,
    userId
};

window.dataLayer = dataLayer;
window.appboy = appboy;

const inAppMessageButtons = [
    {
        subscribeToClickedEvent: jest.fn()
    },
    {
        subscribeToClickedEvent: jest.fn()
    }
];

let GetDispatcher;

beforeEach(() => {
    jest.resetAllMocks();
    jest.isolateModules(async () => {
        /* eslint-disable-next-line global-require */
        GetDispatcher = require('../BrazeDispatcher').default;
    });
});

describe('instantiation', () => {
    describe('GetDispatcher', () => {
        it('should return the same BrazeDispatcher instance when called twice', () => {
            // Arrange
            const BrazeDispatcher1 = GetDispatcher(0);

            // Act
            const BrazeDispatcher2 = GetDispatcher(0);

            // Assert
            expect(BrazeDispatcher1).toBe(BrazeDispatcher2);
        });
    });

    describe('BrazeDispatcher', () => {
        const sessionTimeoutInSeconds = 0;
        let brazeDispatcher;

        beforeEach(() => {
            brazeDispatcher = GetDispatcher(sessionTimeoutInSeconds);
        });

        it('should have a property `sessionTimeoutInSeconds` with value as supplied to GetDispatcher()', () => {
            // Assert
            expect(brazeDispatcher.sessionTimeoutInSeconds).toBe(sessionTimeoutInSeconds);
        });

        it('should have a property `eventSignifier` with default value `BrazeContent`', () => {
            // Assert
            expect(brazeDispatcher.eventSignifier).toBe('BrazeContent');
        });

        it('should throw an error when attempting to instantiate another instance', () => {
            // Arrange
            expect.assertions(2);
            const Dispatcher = brazeDispatcher.constructor;
            let anotherInstance = null;

            try {
                // Act
                anotherInstance = new Dispatcher(0);
            } catch (error) {
                // Assert
                expect(anotherInstance).toBe(null);
                expect(error.message).toBe('do not instantiate more than one instance of BrazeDispatcher');
            }
        });

        describe('configure', () => {
            it.each`
                parameter             | value
                ${'disableComponent'} | ${true}
                ${'apiKey'}           | ${null}
                ${'userId'}           | ${null}
            `('should not attempt to subscribe if $parameter is $value', async ({ parameter, value }) => {
                // Arrange
                const options = {
                    ...enabledComponentParameters,
                    ...{
                        [parameter]: value
                    }
                };

                // Act
                await brazeDispatcher.configure(options);

                // Assert
                expect(appboy.subscribeToInAppMessage).not.toHaveBeenCalled();
                expect(appboy.subscribeToContentCardsUpdates).not.toHaveBeenCalled();
                expect(appboy.requestContentCardsRefresh).not.toHaveBeenCalled();
            });

            it.each`
                appboyInstanceOrigin  | value
                ${'sdk'}              | ${false}
                ${'window'}           | ${true}
            `('should subscribe to correct appboy instance if isAppboyInitialised returns $value', async ({
                appboyInstanceOrigin,
                value
            }) => {
                // Arrange
                const appboyInstance = (appboyInstanceOrigin === 'sdk' ? appboySDK : appboy);
                isAppboyInitialised.mockReturnValue(value);

                // Act
                await brazeDispatcher.configure(enabledComponentParameters);

                // Assert
                expect(appboyInstance.subscribeToInAppMessage).toHaveBeenCalled();
                expect(appboyInstance.subscribeToContentCardsUpdates).toHaveBeenCalled();
                expect(appboyInstance.requestContentCardsRefresh).toHaveBeenCalled();
            });

            it.each([
                [true],
                [false]
            ])('should reject being called a second time with different parameters', async appboyInitialised => {
                // Arrange
                expect.assertions(1);
                isAppboyInitialised.mockReturnValue(appboyInitialised);
                await brazeDispatcher.configure(enabledComponentParameters);

                // Act
                try {
                    await brazeDispatcher.configure({
                        ...enabledComponentParameters,
                        userId: '__INVALID_USER_ID__'
                    });
                } catch (error) {
                    // Assert
                    expect(error.message).toBe('attempt to reinitialise appboy with different parameters');
                }
            });

            it.each([
                [true],
                [false]
            ])('should return the same promise if called a second time with similar parameters', async appboyInitialised => {
                // Arrange
                isAppboyInitialised.mockReturnValue(appboyInitialised);
                const promiseA = await brazeDispatcher.configure(enabledComponentParameters);

                // Act
                const promiseB = await brazeDispatcher.configure(enabledComponentParameters);

                // Assert
                expect(promiseA).toBe(promiseB);
            });

            it('should push an event to datalayer when userId set following initialisation', async () => {
                // Arrange
                appboySDK.changeUser.mockImplementation((id, callback) => callback());

                // Act
                await brazeDispatcher.configure(enabledComponentParameters);

                // Assert
                expect(dataLayer.push).toHaveBeenCalledWith({
                    event: 'appboyReady'
                });
            });

            it('should not request a refresh if an update is already pending', async () => {
                // Arrange
                await brazeDispatcher.configure(enabledComponentParameters);
                appboy.requestContentCardsRefresh.mockReset();

                // Act
                await brazeDispatcher.configure(enabledComponentParameters);

                // Assert
                expect(appboy.requestContentCardsRefresh).not.toHaveBeenCalled();
            });
        });
    });
});

describe('BrazeDispatcher operation', () => {
    const callbackConfiguredComponentParameters = {
        ...enabledComponentParameters,
        callbacks: {
            interceptInAppMessageClickEvents,
            interceptInAppMessages,
            handleContentCards,
            handleContentCardsGrouped
        },
        loggerCallbacks: {
            loggingCallback
        }
    };

    let dispatcher,
        interceptInAppMessagesHandler,
        contentCardsHandler;

    beforeEach(async () => {
        dispatcher = GetDispatcher(0);

        appboy.subscribeToInAppMessage.mockImplementation(callback => {
            interceptInAppMessagesHandler = callback;
        });
        appboy.subscribeToContentCardsUpdates.mockImplementation(callback => {
            contentCardsHandler = callback;
        });

        await dispatcher.configure(callbackConfiguredComponentParameters);
    });

    describe('callbacks', () => {
        /* eslint-disable indent */
        describe('logger', () => {
            it.each`
                key          | value
                ${'info'}    | ${'logInfo'}
                ${'warn'}    | ${'logWarn'}
                ${'error'}   | ${'logError'}
            `('should for each key call the callback with the relevant log data', ({ key, value }) => {
                // Act
                dispatcher.logger(key, TEST_LOG_MESSAGE, TEST_PAYLOAD);

                // Assert
                expect(loggingCallback).toHaveBeenCalledWith(value, TEST_LOG_MESSAGE, TEST_PAYLOAD);
            });
        });
        describe('contentCardsHandler', () => {
            const rawCards = [
                { id: 'card1' },
                { id: 'card2' }
            ];
            const groupedCards = [
                {
                    title: 'example1',
                    cards: [
                        { id: 'card1' },
                        { id: 'card2' }
                    ]
                },
                {
                    title: 'example2',
                    cards: [
                        { id: 'card3' },
                        { id: 'card4' }
                    ]
                }
            ];
            beforeEach(() => {
                ContentCards.prototype.orderCardsByOrderValue.mockReturnThis();
                ContentCards.prototype.orderCardsByUpdateValue.mockReturnThis();
                ContentCards.prototype.arrangeCardsByTitles.mockReturnThis();
                ContentCards.prototype.getTitleCard.mockReturnThis();
                ContentCards.prototype.filterCards.mockReturnThis();
                ContentCards.prototype.removeDuplicateContentCards.mockReturnThis();
                ContentCards.prototype.output.mockReturnValue({
                    cards: rawCards,
                    groups: groupedCards,
                    rawCards
                });
            });

            it('should instantiate ContentCards and call required methods in order of [removeDuplicateContentCards, filterCards, getTitleCard, output]', () => {
                // Arrange & Act
                contentCardsHandler();

                // Assert
                const [contentCardsInstance] = ContentCards.mock.instances;
                expect(contentCardsInstance.removeDuplicateContentCards)
                    .toHaveBeenCalledBefore(contentCardsInstance.filterCards);
                expect(contentCardsInstance.filterCards)
                    .toHaveBeenCalledBefore(contentCardsInstance.getTitleCard);
                expect(contentCardsInstance.arrangeCardsByTitles)
                    .toHaveBeenCalledBefore(contentCardsInstance.output);
            });

            it('should call registered callback with returned cards', () => {
                // Arrange & Act
                contentCardsHandler();

                // Assert
                expect(handleContentCards).toHaveBeenCalledWith(rawCards);
            });

            it('should call registered group callback with returned cards', () => {
                // Arrange & Act
                contentCardsHandler();

                // Assert
                expect(handleContentCardsGrouped).toHaveBeenCalledWith(groupedCards);
            });
        });

        describe('interceptInAppMessagesHandler', () => {
            let message;

            beforeEach(() => {
                message = new appboy.ab.InAppMessage();
                message.buttons = inAppMessageButtons;
            });

            it('should call registered callback', () => {
                // Act
                interceptInAppMessagesHandler(message);

                // Assert
                expect(interceptInAppMessages).toHaveBeenCalledWith(message);
            });

            it('should call braze display function for message', () => {
                // Act
                interceptInAppMessagesHandler(message);

                // Assert
                expect(appboy.display.showInAppMessage).toHaveBeenCalledWith(message);
            });

            it('should subscribe internal callback to the CTA button click event', () => {
                // Act
                interceptInAppMessagesHandler(message);

                // Assert
                expect(message.buttons[1].subscribeToClickedEvent).toHaveBeenCalledWith(expect.any(Function));
            });
        });

        describe('interceptInAppMessageClickEventsHandler', () => {
            let message,
                messageClickEventsHandler;

            beforeEach(() => {
                message = new appboy.ab.InAppMessage();
                message.buttons = inAppMessageButtons;
                message.buttons[1].subscribeToClickedEvent.mockImplementation(clickEventsHandler => {
                    messageClickEventsHandler = clickEventsHandler;
                });
            });

            it('should subscribe internal callback to the CTA button click event', () => {
                // Arrange
                interceptInAppMessagesHandler(message);
                expect(message.buttons[1].subscribeToClickedEvent).toHaveBeenCalledWith(expect.any(Function));

                // Act
                messageClickEventsHandler();

                // Assert
                expect(interceptInAppMessageClickEvents).toHaveBeenCalledWith(message);
            });
        });
    });

    describe('card logging', () => {
        const rawCards = [
            { id: 'card1' },
            { id: 'card2' }
        ];
        const groupedCards = [
            {
                title: 'example1',
                cards: [
                    { id: 'card1' },
                    { id: 'card2' }
                ]
            },
            {
                title: 'example2',
                cards: [
                    { id: 'card3' },
                    { id: 'card4' }
                ]
            }
        ];
        beforeEach(() => {
            ContentCards.prototype.orderCardsByOrderValue.mockReturnThis();
            ContentCards.prototype.orderCardsByUpdateValue.mockReturnThis();
            ContentCards.prototype.arrangeCardsByTitles.mockReturnThis();
            ContentCards.prototype.getTitleCard.mockReturnThis();
            ContentCards.prototype.filterCards.mockReturnThis();
            ContentCards.prototype.removeDuplicateContentCards.mockReturnThis();
            ContentCards.prototype.output.mockReturnValue({
                cards: rawCards,
                groups: groupedCards,
                rawCards
            });
            contentCardsHandler();
        });

        describe('logCardClick', () => {
            it('should report back to braze a card resolved from its given ID', async () => {
                // Act
                await dispatcher.logCardClick(rawCards[0].id);

                // Assert
                expect(appboy.logCardClick).toHaveBeenCalledWith(rawCards[0], true);
            });

            it('should request a flush of data', async () => {
                // Act
                await dispatcher.logCardClick(rawCards[0].id);

                // Assert
                expect(appboy.requestImmediateDataFlush).toHaveBeenCalledAfter(appboy.logCardClick);
            });
        });

        describe('logCardImpressions', () => {
            it('should report back to braze a list of cards resolved from their given IDs', async () => {
                // Act
                await dispatcher.logCardImpressions([rawCards[0].id, rawCards[1].id]);

                // Assert
                expect(appboy.logCardImpressions).toHaveBeenCalledWith([rawCards[0], rawCards[1]], true);
            });

            it('should request a flush of data', async () => {
                // Act
                await dispatcher.logCardImpressions([rawCards[0].id, rawCards[1].id]);

                // Assert
                expect(appboy.requestImmediateDataFlush).toHaveBeenCalledAfter(appboy.logCardImpressions);
            });
        });

        describe('pushShapedEventToDataLayer', () => {
            it('should report back to braze a list of cards resolved from their given IDs', async () => {
                // Arrange
                const pushToDataLayer = jest.fn();
                const givenContent = { foo: 'bar' };

                // Act
                dispatcher.pushShapedEventToDataLayer(pushToDataLayer, givenContent);

                // Assert
                expect(pushToDataLayer).toHaveBeenCalledWith({
                    event: dispatcher.eventSignifier,
                    custom: {
                        braze: givenContent
                    }
                });
            });
        });
    });
});
