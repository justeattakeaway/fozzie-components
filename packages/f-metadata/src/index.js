const initialiseBraze = (apiKey, enableLogging = false, disableComponent = false) => {
    if (typeof window !== 'undefined') {
        if (!disableComponent) {
            const appboy = require('appboy-web-sdk'); // eslint-disable-line
            appboy.initialize(apiKey, { enableLogging });
            appboy.display.automaticallyShowNewInAppMessages();
            appboy.openSession();
        }
    }
};

export default initialiseBraze;
