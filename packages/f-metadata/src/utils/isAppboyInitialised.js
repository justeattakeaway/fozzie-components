/**
 * Checks if a previous version of appboy has been initialised
 * @param appboy - Appboy SDK instance
 * @param {function} appboy.getUser - Appboy SDK getUser callback
 * @returns {boolean} - has appboy been initialised
 */
const isAppboyInitialised = appboy => {
    let result = false;
    if (!appboy) return result;

    appboy.getUser().getUserId(id => {
        result = !!id;
        // Return result for testing
        return result;
    });
    return result;
};

export default isAppboyInitialised;
