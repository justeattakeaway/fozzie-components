const intialiseBraze = (apiKey, enableLogging = false) => {
    if (typeof window !== 'undefined') {
        const appboy = require('appboy-web-sdk'); // eslint-disable-line
        appboy.initialize(apiKey, { enableLogging });
        appboy.display.automaticallyShowNewInAppMessages();
        appboy.openSession();
    }
};

export default intialiseBraze;
