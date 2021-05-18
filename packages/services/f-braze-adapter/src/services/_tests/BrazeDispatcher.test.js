/* eslint indent: ["error", 4, {ignoredNodes: ["TemplateLiteral > *"]}] */
import appboySDK from 'appboy-web-sdk';

import 'core-js/modules/es.object.from-entries';

import isAppboyInitialised from '../utils/isAppboyInitialised';
import areCookiesPermitted from '../utils/areCookiesPermitted';
import removeDuplicateContentCards from '../utils/removeDuplicateContentCards';
import BrazeDispatcher from '../BrazeDispatcher';
import dispatcherEventStream from '../DispatcherEventStream';
import {
    CONTENT_CARDS_EVENT_NAME,
    IN_APP_MESSAGE_EVENT_CLICKS_NAME,
    IN_APP_MESSAGE_EVENT_NAME,
    LOGGER
} from '../types/events';

jest.mock('appboy-web-sdk');
jest.mock('../utils/isAppboyInitialised');
jest.mock('../utils/areCookiesPermitted');
jest.mock('../utils/removeDuplicateContentCards');

let appboy;
jest.isolateModules(() => {
    /* eslint-disable-next-line global-require */
    appboy = require('appboy-web-sdk');
    jest.mock('appboy-web-sdk');
});

const dataLayer = {
    push: jest.fn()
};

const apiKey = '__API_KEY__';
const userId = '__USER_ID__';

const LOG_ERROR = 'error';

const enabledComponentParameters = {
    disableComponent: false,
    apiKey,
    userId
};

const inAppMessageButtons = [
    {
        subscribeToClickedEvent: jest.fn()
    },
    {
        subscribeToClickedEvent: jest.fn()
    }
];

const contentCardsMockCallback = jest.fn();
const inAppMessagesMockCallback = jest.fn();
const inAppMessageClicksMockCallback = jest.fn();
const loggerCallback = jest.fn();

dispatcherEventStream.subscribe(CONTENT_CARDS_EVENT_NAME, contentCardsMockCallback);
dispatcherEventStream.subscribe(IN_APP_MESSAGE_EVENT_NAME, inAppMessagesMockCallback);
dispatcherEventStream.subscribe(IN_APP_MESSAGE_EVENT_CLICKS_NAME, inAppMessageClicksMockCallback);
dispatcherEventStream.subscribe(LOGGER, loggerCallback);

beforeEach(() => {
    jest.resetAllMocks();
    window.dataLayer = dataLayer;
    window.appboy = appboy;
});

describe('instantiation', () => {
    describe('BrazeDispatcher', () => {
        const sessionTimeoutInSeconds = 0;
        let brazeDispatcher;

        beforeEach(() => {
            brazeDispatcher = new BrazeDispatcher(sessionTimeoutInSeconds);
        });

        it('should have a property `sessionTimeoutInSeconds` with value as supplied to GetDispatcher()', () => {
            // Assert
            expect(brazeDispatcher.sessionTimeoutInSeconds).toBe(sessionTimeoutInSeconds);
        });

        it('should have a property `eventSignifier` with default value `BrazeContent`', () => {
            // Assert
            expect(brazeDispatcher.eventSignifier).toBe('BrazeContent');
        });

        describe('configure', () => {
            it.each`
                parameter             | value
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
                expect(brazeDispatcher.configure(options)).rejects.toEqual(new Error('Not initialising braze due to config'));

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

            describe('on initialisation of bundled sdk version of braze library', () => {
                beforeEach(() => {
                    // Arrange
                    isAppboyInitialised.mockReturnValue(false);
                });

                it.each([
                    [true, true, false, true],
                    [true, true, true, false],
                    [false, false, false, true],
                    [false, false, true, false],
                    [undefined, undefined, true, false]
                ])('should initialise appboy with the correct logging (`%p` ➡ `%p`) and cookie (`%p` ➡ `$p`) parameters', async (
                    enableLoggingConfig,
                    expectedEnableLoggingParameter,
                    areCookiesPermittedValue,
                    expectedNoCookiesParamater
                ) => {
                    // Arrange
                    areCookiesPermitted.mockReturnValue(areCookiesPermittedValue);

                    // Act
                    await brazeDispatcher.configure({
                        ...enabledComponentParameters,
                        enableLogging: enableLoggingConfig
                    });

                    // Assert
                    expect(appboySDK.initialize).toHaveBeenCalledWith(apiKey, {
                        enableLogging: expectedEnableLoggingParameter,
                        sessionTimeoutInSeconds: 0,
                        noCookies: expectedNoCookiesParamater
                    });
                });

                it('should open a session following initialisation', async () => {
                    // Act
                    await brazeDispatcher.configure(enabledComponentParameters);

                    // Assert
                    expect(appboySDK.openSession).toHaveBeenCalledAfter(appboySDK.initialize);
                });

                it('should subscribe to callbacks following opening a session', async () => {
                    // Act
                    await brazeDispatcher.configure(enabledComponentParameters);

                    // Assert
                    expect(appboySDK.subscribeToInAppMessage).toHaveBeenCalledAfter(appboySDK.openSession);
                });

                it('should set the userId following callback subscription', async () => {
                    // Act
                    await brazeDispatcher.configure(enabledComponentParameters);

                    // Assert
                    expect(appboySDK.changeUser).toHaveBeenCalledAfter(appboySDK.requestContentCardsRefresh);
                });

                it('should pass through the userId along with a callback', async () => {
                    // Act
                    await brazeDispatcher.configure(enabledComponentParameters);

                    // Assert
                    expect(appboySDK.changeUser).toHaveBeenCalledWith(userId, expect.any(Function));
                });
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
        ...enabledComponentParameters
    };

    let dispatcher,
        interceptInAppMessagesHandler,
        contentCardsHandler;

    beforeEach(async () => {
        dispatcher = new BrazeDispatcher(0);

        appboy.subscribeToInAppMessage.mockImplementation(callback => {
            interceptInAppMessagesHandler = callback;
        });
        appboy.subscribeToContentCardsUpdates.mockImplementation(callback => {
            contentCardsHandler = callback;
        });

        await dispatcher.configure(callbackConfiguredComponentParameters);
    });

    describe('callbacks', () => {
        describe('contentCardsHandler', () => {
            const rawCards = [
                { id: 'card1' },
                { id: 'card2' }
            ];

            beforeEach(() => {
                removeDuplicateContentCards.mockReturnValue(rawCards);
            });

            it('should call registered callback with returned cards', () => {
                // Arrange & Act
                contentCardsHandler({ rawCards });

                // Assert
                expect(contentCardsMockCallback).toHaveBeenCalledWith(rawCards);
            });
        });

        describe('interceptInAppMessagesHandler', () => {
            let message;

            beforeEach(() => {
                message = new appboy.ab.InAppMessage();
                message.buttons = inAppMessageButtons;
            });

            describe('when braze is initialised', () => {});

            it('should call registered callback', async () => {
                // Act
                await interceptInAppMessagesHandler(message);

                // Assert
                expect(inAppMessagesMockCallback).toHaveBeenCalledWith(message);
            });

            it('should call braze display function for message', async () => {
                // Act
                await interceptInAppMessagesHandler(message);

                // Assert
                expect(appboy.display.showInAppMessage).toHaveBeenCalledWith(message);
            });

            describe('when showInAppMessage throws an error', () => {
                const error = new Error('We have a problem');

                beforeEach(() => {
                    inAppMessagesMockCallback.mockImplementation(() => {
                        throw error;
                    });
                });

                it('should log the error to the provided callback', async () => {
                    // Act
                    await interceptInAppMessagesHandler(message);

                    // Assert
                    expect(loggerCallback).toHaveBeenCalledWith([LOG_ERROR, `Error handling message - ${error}`, { message, error }]);
                });
            });

            it('should subscribe internal callback to the CTA button click event', async () => {
                // Act
                await interceptInAppMessagesHandler(message);

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

            it('should subscribe internal callback to the CTA button click event', async () => {
                // Arrange
                await interceptInAppMessagesHandler(message);
                expect(message.buttons[1].subscribeToClickedEvent).toHaveBeenCalledWith(expect.any(Function));

                // Act
                messageClickEventsHandler();

                // Assert
                expect(inAppMessageClicksMockCallback).toHaveBeenCalledWith(message);
            });
        });
    });

    describe('card logging', () => {
        const rawCards = [
            { id: 'card1' },
            { id: 'card2' }
        ];

        beforeEach(() => {
            removeDuplicateContentCards.mockReturnValue(rawCards);
            contentCardsHandler({ rawCards });
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
