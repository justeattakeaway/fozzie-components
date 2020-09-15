import GetDispatcher from './BrazeDispatcher';

/**
 * sessionTimeoutInSeconds
 * Set session timeout to 0 in order to avoid caching issues with Braze
 * @type {number}
 */
export const sessionTimeoutInSeconds = 0;

export const initialise = async (options = {}) => {
    try {
        const dispatcher = GetDispatcher(sessionTimeoutInSeconds);

        await dispatcher.configure(options);

        return dispatcher;
    } catch (error) {
        throw new Error(`An error occurred while loading the component: ${error}`);
    }
};

export default initialise;
