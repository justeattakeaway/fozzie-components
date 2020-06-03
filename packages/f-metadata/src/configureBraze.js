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

    appboy.subscribeToInAppMessage(message => {
        if (message instanceof appboy.ab.InAppMessage) {
            /**
             * Always subscribe click action to second button
             * as this is always "success" as opposed to "dismiss"
             * as confirmed with CRM (AS)
             */
            const { buttons: { 1: button } } = message;
            interceptInAppMessages(message);
            button.subscribeToClickedEvent(() => interceptInAppMessageClickEvents(message));
        }
        appboy.display.showInAppMessage(message);
    });
    appboy.subscribeToContentCardsUpdates(handleContentCards);

    appboy.requestContentCardsRefresh();
};

export default configureBraze;
