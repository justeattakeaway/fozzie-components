export default {
    intialiseBraze (apiKey) {
        var appboy = require('appboy-web-sdk');
        appboy.initialize(apiKey);
        appboy.display.automaticallyShowNewInAppMessages();
        appboy.openSession();
    }
}
