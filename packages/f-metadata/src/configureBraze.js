import noop from './utils/noop';

const configureBraze = (options = {}) => {
    const { appboy } = window;
    const {
        callbacks = {}
    } = options;
    const {
        interceptInAppMessageClickEvents = noop,
        interceptInAppMessages = noop,
        handleContentCards = noop
    } = callbacks;

    // Note that the below subscriptions return an ID that could later be used to unsubscribe
    appboy.subscribeToInAppMessage(message => {
        if (message instanceof appboy.ab.InAppMessage) {
            /**
             * Always subscribe click action to second button
             * as this is always "success" as opposed to "dismiss"
             * as confirmed with CRM (AS)
             */
            interceptInAppMessages(message);
            if (message.buttons && message.buttons.length >= 2) {
                const button = message.buttons[1]; // eslint-disable-line prefer-destructuring
                button.subscribeToClickedEvent(() => interceptInAppMessageClickEvents(message));
            }
        }

        appboy.display.showInAppMessage(message);
    });
    appboy.subscribeToContentCardsUpdates(handleContentCards);

    appboy.requestContentCardsRefresh();
};

export default configureBraze;
