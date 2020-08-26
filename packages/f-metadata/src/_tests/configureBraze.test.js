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
            // Arrange & Act
            await configureBraze();

            const [[contentCardsCallback]] = subscribeToContentCardsUpdates.mock.calls;
            contentCardsCallback();

            const [[inAppMessageCallback]] = subscribeToInAppMessage.mock.calls;
            inAppMessageCallback(inAppMessage);

            const { 1: { subscribeToClickedEvent } } = inAppMessage.buttons;
            const [[clickCallback]] = subscribeToClickedEvent.mock.calls;
            clickCallback();

            // Assert
            expect(noop).toHaveBeenCalledTimes(3);
        });

        it('should call `handleContentCards` when content cards have updated', async () => {
            // Arrange
            const cards = ['__CARD__'];

            // Act
            await configureBraze(settings);

            const [[contentCardsCallback]] = subscribeToContentCardsUpdates.mock.calls;
            contentCardsCallback(cards);

            // Assert
            expect(handleContentCards).toHaveBeenCalledWith(cards);
        });

        it('should call `interceptInAppMessages` when in-app messages are displayed', async () => {
            // Arrange & Act
            await configureBraze(settings);

            const [[inAppMessageCallback]] = subscribeToInAppMessage.mock.calls;
            inAppMessageCallback(inAppMessage);

            // Assert
            expect(interceptInAppMessages).toHaveBeenCalledWith(inAppMessage);
            expect(appboy.display.showInAppMessage).toHaveBeenCalledWith(inAppMessage);
        });

        it('should assign `subscribeToClickedEvent` to button index 1', async () => {
            // Arrange
            const { buttons: { 0: dismissButton, 1: successButton } } = inAppMessage;

            // Act
            await configureBraze(settings);

            const [[inAppMessageCallback]] = subscribeToInAppMessage.mock.calls;
            inAppMessageCallback(inAppMessage);

            // Assert
            expect(dismissButton.subscribeToClickedEvent).not.toHaveBeenCalled();
            expect(successButton.subscribeToClickedEvent).toHaveBeenCalled();
        });

        it('should not assign `subscribeToClickedEvent` if there are fewer than two buttons', async () => {
            // Arrange
            const messageWithSingleButton = {
                buttons: [
                    {
                        subscribeToClickedEvent: jest.fn()
                    }
                ]
            };
            const { buttons: { 0: singleButton } } = messageWithSingleButton;

            // Act
            await configureBraze(settings);

            const [[inAppMessageCallback]] = subscribeToInAppMessage.mock.calls;
            inAppMessageCallback(messageWithSingleButton);

            // Assert
            expect(singleButton.subscribeToClickedEvent).not.toHaveBeenCalled();
        });

        it('should pass other messages straight to handleInAppMessage without adding click handlers', async () => {
            // Arrange
            const message = '__MESSAGE__';

            // Act
            await configureBraze(settings);

            const [[inAppMessageCallback]] = subscribeToInAppMessage.mock.calls;
            inAppMessageCallback(message);

            // Assert
            expect(interceptInAppMessages).not.toHaveBeenCalled();
        });

        it('should call `interceptInAppMessageClickEvents` when `subscribeToClickedEvent` is triggered', async () => {
            // Arrange
            const { buttons: { 1: { subscribeToClickedEvent: successEvent } } } = inAppMessage;

            // Assemble
            await configureBraze(settings);

            const [[inAppMessageCallback]] = subscribeToInAppMessage.mock.calls;
            inAppMessageCallback(inAppMessage);

            const [[clickCallback]] = successEvent.mock.calls;
            clickCallback();

            // Assert
            expect(interceptInAppMessageClickEvents).toHaveBeenCalledWith(inAppMessage);
        });
    });
});
