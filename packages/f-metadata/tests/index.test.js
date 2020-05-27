import appboy from 'appboy-web-sdk';
import initialiseBraze, { sessionTimeoutInSeconds } from '../src';

jest.mock('appboy-web-sdk', () => ({
    initialize: jest.fn(),
    display: {
        showInAppMessage: jest.fn()
    },
    openSession: jest.fn(),
    changeUser: jest.fn(),
    requestContentCardsRefresh: jest.fn(),
    subscribeToContentCardsUpdates: jest.fn(),
    subscribeToInAppMessage: jest.fn(),
    subscribeToClickedEvent: jest.fn(),
    ab: {
        InAppMessage: Object
    }
}));

const apiKey = '__API_KEY__';
const userId = '__USER_ID__';
const inAppMessage = {
    buttons: [
        {
            subscribeToClickedEvent: jest.fn()
        },
        {
            subscribeToClickedEvent: jest.fn()
        }
    ]
};
const handleContentCards = jest.fn();
const interceptInAppMessages = jest.fn();
const interceptInAppMessageClickEvents = jest.fn();
const enableLogging = true;
const disableComponent = false;

const callbacks = {
    handleContentCards,
    interceptInAppMessages,
    interceptInAppMessageClickEvents
};

const settings = {
    apiKey,
    userId,
    enableLogging,
    disableComponent,
    callbacks
};

describe('f-metadata', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should resolve as null if disableComponent is provided', async () => {
        // Assemble & Act
        const instance = await initialiseBraze({ ...settings, disableComponent: true });

        // Assert
        expect(appboy.initialize).not.toHaveBeenCalled();
        expect(instance).toBe(null);
    });

    it('should not call initialise if apiKey is not set', async () => {
        // Assemble & Act
        await initialiseBraze({ ...settings, apiKey: undefined });

        // Assert
        expect(appboy.initialize).not.toHaveBeenCalled();
    });

    it('should not call initialise if userId is not set', async () => {
        // Assemble & Act
        await initialiseBraze({ ...settings, userId: undefined });

        // Assert
        expect(appboy.initialize).not.toHaveBeenCalled();
    });

    it('should initialise appboy and setup relevant settings', async () => {
        // Assemble & Act
        await initialiseBraze(settings);

        // Assert
        expect(appboy.initialize).toHaveBeenCalledWith(apiKey, { enableLogging, sessionTimeoutInSeconds });
        expect(appboy.openSession).toHaveBeenCalled();
    });

    it('should noop the callback if no function is provided', async () => {
        // Assemble & Act
        const instance = await initialiseBraze({
            ...settings,
            callbacks: {}
        });

        // Assert
        appboy.subscribeToContentCardsUpdates.mock.calls[0][0]();
        expect(instance).toBeDefined();
    });

    it('should fire a datalayer event when change user is called', async () => {
        // Assemble
        const push = jest.fn();
        window.dataLayer = { push };

        // Act
        await initialiseBraze(settings);

        // Assert
        appboy.changeUser.mock.calls[0][1]();
        expect(push).toHaveBeenCalledWith({ event: 'appboyReady' });
    });

    describe('callbacks', () => {
        it('should call `handleContentCards` when content cards have updated', async () => {
            // Assemble
            const cards = ['__CARD__'];

            // Act
            await initialiseBraze(settings);

            // Assert
            appboy.subscribeToContentCardsUpdates.mock.calls[0][0](cards);
            expect(handleContentCards).toHaveBeenCalledWith(cards);
        });

        it('should call `interceptInAppMessages` when in-app messages are displayed', async () => {
            // Assemble & Act
            await initialiseBraze(settings);

            // Assert
            appboy.subscribeToInAppMessage.mock.calls[0][0](inAppMessage);
            expect(interceptInAppMessages).toHaveBeenCalledWith(inAppMessage);
            expect(appboy.display.showInAppMessage).toHaveBeenCalledWith(inAppMessage);
        });

        it('should assign `subscribeToClickedEvent` to button index 1', async () => {
            // Assemble
            const { buttons: { 0: dismissButton, 1: successButton } } = inAppMessage;

            // Act
            await initialiseBraze(settings);

            // Assert
            appboy.subscribeToInAppMessage.mock.calls[0][0](inAppMessage);
            expect(dismissButton.subscribeToClickedEvent).not.toHaveBeenCalled();
            expect(successButton.subscribeToClickedEvent).toHaveBeenCalled();
        });

        it('should call `interceptInAppMessageClickEvents` when `subscribeToClickedEvent` is triggered', async () => {
            // Assemble
            const { buttons: { 1: { subscribeToClickedEvent: successEvent } } } = inAppMessage;

            // Assemble
            await initialiseBraze(settings);

            // Assert
            appboy.subscribeToInAppMessage.mock.calls[0][0](inAppMessage);
            successEvent.mock.calls[0][0]();
            expect(interceptInAppMessageClickEvents).toHaveBeenCalledWith(inAppMessage);
        });
    });
});
