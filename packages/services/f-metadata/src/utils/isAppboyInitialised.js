/**
 * Checks if a previous version of appboy has been initialised
 * @param appboy - Appboy SDK instance
 * @param {function} appboy.getUser - Appboy SDK getUser callback
 * @returns {promise<boolean>} - has appboy been initialised
 */
const isAppboyInitialised = appboy => new Promise(resolve => {
    if (!appboy) return resolve(false);
    return appboy.getUser().getUserId(id => resolve(!!id));
});

export default isAppboyInitialised;
