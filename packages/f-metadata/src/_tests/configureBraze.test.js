import configureBraze from '../configureBraze';
import noop from '../utils/noop';

jest.mock('../utils/noop', () => jest.fn());

const handleContentCards = jest.fn();
const interceptInAppMessages = jest.fn();
const interceptInAppMessageClickEvents = jest.fn();
const showInAppMessage = jest.fn();
const subscribeToInAppMessage = jest.fn();
const subscribeToContentCardsUpdates = jest.fn();
const requestContentCardsRefresh = jest.fn();

const appboy = {
    ab: {
        InAppMessage: Object
    },
    display: {
        showInAppMessage
    },
    subscribeToInAppMessage,
    subscribeToContentCardsUpdates,
    requestContentCardsRefresh
};

global.appboy = appboy;

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

const callbacks = {
    handleContentCards,
    interceptInAppMessages,
    interceptInAppMessageClickEvents
};

const settings = {
    callbacks
};

describe('f-metadata', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('callbacks', () => {
        it('should noop the callbacks if no function is provided', async () => {
            // Assemble & Act
            await configureBraze();
            subscribeToContentCardsUpdates.mock.calls[0][0]();

            // Assert
            expect(noop).toHaveBeenCalled();
        });

        it('should call `handleContentCards` when content cards have updated', async () => {
            // Assemble
            const cards = ['__CARD__'];

            // Act
            await configureBraze(settings);

            // Assert
            appboy.subscribeToContentCardsUpdates.mock.calls[0][0](cards);
            expect(handleContentCards).toHaveBeenCalledWith(cards);
        });

        it('should call `interceptInAppMessages` when in-app messages are displayed', async () => {
            // Assemble & Act
            await configureBraze(settings);

            // Assert
            subscribeToInAppMessage.mock.calls[0][0](inAppMessage);
            expect(interceptInAppMessages).toHaveBeenCalledWith(inAppMessage);
            expect(appboy.display.showInAppMessage).toHaveBeenCalledWith(inAppMessage);
        });

        it('should assign `subscribeToClickedEvent` to button index 1', async () => {
            // Assemble
            const { buttons: { 0: dismissButton, 1: successButton } } = inAppMessage;

            // Act
            await configureBraze(settings);

            // Assert
            subscribeToInAppMessage.mock.calls[0][0](inAppMessage);
            expect(dismissButton.subscribeToClickedEvent).not.toHaveBeenCalled();
            expect(successButton.subscribeToClickedEvent).toHaveBeenCalled();
        });

        it('should pass other messages straight to handleInAppMessage without adding click handlers', async () => {
            // Assemble
            const message = '__MESSAGE__';

            // Act
            await configureBraze(settings);

            // Assert
            subscribeToInAppMessage.mock.calls[0][0](message);
            expect(interceptInAppMessages).not.toHaveBeenCalled();
        });

        it('should call `interceptInAppMessageClickEvents` when `subscribeToClickedEvent` is triggered', async () => {
            // Assemble
            const { buttons: { 1: { subscribeToClickedEvent: successEvent } } } = inAppMessage;

            // Assemble
            await configureBraze(settings);

            // Assert
            subscribeToInAppMessage.mock.calls[0][0](inAppMessage);
            successEvent.mock.calls[0][0]();
            expect(interceptInAppMessageClickEvents).toHaveBeenCalledWith(inAppMessage);
        });
    });
});
