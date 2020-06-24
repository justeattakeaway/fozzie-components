/**
 * Checks if a previous version of appboy has been initialised
 * @param appboy - Appboy SDK instance
 * @param {function} appboy.getUser - Appboy SDK getUser callback
 * @returns {promise<boolean>} - has appboy been initialised
 */
const isAppboyInitialised = async appboy => {
    let result = false;
    if (!appboy) return result;

    await appboy.getUser().getUserId(id => {
        result = !!id;
    });
    return result;
};

export default isAppboyInitialised;
