import appboy from 'appboy-web-sdk';
import initialiseBraze from '../src';

jest.mock('appboy-web-sdk', () => ({
    initialize: jest.fn(),
    display: {
        automaticallyShowNewInAppMessages: jest.fn()
    },
    openSession: jest.fn(),
    changeUser: jest.fn(),
    requestContentCardsRefresh: jest.fn(),
    subscribeToContentCardsUpdates: jest.fn()
}));

const apiKey = '__API_KEY__';
const userId = '__USER_ID__';
const handleContentCards = jest.fn();
const enableLogging = true;
const disableComponent = false;

const callbacks = {
    handleContentCards
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

    it('should not call initialise if disable component flag is set', () => {
        // Assemble & Act
        expect.assertions(2);
        initialiseBraze({ ...settings, disableComponent: true }).catch(error => {
            // Assert
            expect(appboy.initialize).not.toHaveBeenCalled();
            expect(error.message).toBe('disableComponent is set to true');
        });
    });

    it('should not call initialise if apiKey is not set', () => {
        // Assemble & Act
        initialiseBraze({ ...settings, apiKey: undefined });

        // Assert
        expect(appboy.initialize).not.toHaveBeenCalled();
    });

    it('should not call initialise if userId is not set', () => {
        // Assemble & Act
        initialiseBraze({ ...settings, userId: undefined });

        // Assert
        expect(appboy.initialize).not.toHaveBeenCalled();
    });

    it('should initialise appboy and setup relevant settings', () => {
        // Assemble & Act
        initialiseBraze(settings).then(() => {
            // Assert
            expect(appboy.initialize).toHaveBeenCalledWith(apiKey, { enableLogging });
            expect(appboy.display.automaticallyShowNewInAppMessages).toHaveBeenCalled();
            expect(appboy.openSession).toHaveBeenCalled();
        });
    });

    it('should noop the callback if no function is provided', () => {
        // Assemble & Act
        expect.assertions(1);
        initialiseBraze({ ...settings, callbacks: {} }).then(instance => {
            appboy.subscribeToContentCardsUpdates.mock.calls[0][0]();

            // Assert
            expect(instance).toBeDefined();
        });
    });

    it('should fire a datalayer event when change user is called', () => {
        // Assemble
        const push = jest.fn();
        window.dataLayer = { push };

        // Act
        initialiseBraze(settings).then(() => {
            // Assert
            appboy.changeUser.mock.calls[0][1]();
            expect(push).toHaveBeenCalledWith({ event: 'appboyReady' });
        });
    });

    it('should trigger the given callback when content cards have updated', () => {
        const cards = ['__CARD__'];
        // Act
        initialiseBraze(settings).then(() => {
            // Assert
            appboy.subscribeToContentCardsUpdates.mock.calls[0][0](cards);
            expect(handleContentCards).toHaveBeenCalledWith(cards);
        });
    });
});
