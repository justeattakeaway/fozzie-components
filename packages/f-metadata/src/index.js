import appboy from 'appboy-web-sdk';

const intialiseBraze = apiKey => {
    if (typeof window !== 'undefined') {
        appboy.initialize(apiKey);
        appboy.display.automaticallyShowNewInAppMessages();
        appboy.openSession();
    }
};

export default intialiseBraze;
