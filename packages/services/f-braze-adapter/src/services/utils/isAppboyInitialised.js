import appboy from '@braze/web-sdk';
/**
 * Checks if a previous version of appboy has been initialised
 * @returns {boolean} - has appboy been initialised
 */
const isAppboyInitialised = () => {
    try {
        appboy.getUser();
    } catch (e) {
        if (e.message === 'Appboy must be initialized before calling methods.') {
            return false;
        }
    }
    // will return true if above does not throw exception
    return true;
};

export default isAppboyInitialised;
