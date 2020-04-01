import root from 'window-or-global';
import { throttle } from 'lodash-es';

/**
 * Returns new window width
 *
 * @requires root {object} from window-or-global module
 * @requires root.innerWidth {number} for window width
 * @returns {number} for window width
 */
export const getWindowWidth = () => root.innerWidth;

/**
 * Returns new window height
 *
 * @requires root {object} from window-or-global module
 * @requires root.innerHeight {number} for window width
 * @returns {number} for window height
 */
export const getWindowHeight = () => root.innerHeight;

/**
 * Applies logic to the chosen event and throttles it if needs be
 *
 * @requires root {object} from window-or-global module.
 * @requires root.addEventListener {function} for adding the event listener.
 * @requires throttle {function} from lodash.throttle.
 * @param [throttleTime=0] {number} The (optional) throttle time. If not provided, the callback function will not be throttled.
 * @param eventName {string} The name of the event to be listened to.
 * @param callbackFunction {function} The function to be called by the event listener.
 * @returns {Function} the callback function that has been registered. This may be wrapped in a throttle function.
 */
export const addEvent = (eventName, callbackFunction, throttleTime = 0) => {
    const callback =
        throttleTime > 0
            ? throttle(callbackFunction, throttleTime)
            : callbackFunction;
    root.addEventListener(eventName, callback);
    return callback;
};

/**
 * Removes given event listener from specified event. Use the value returned from addEvent for removing throttled events.
 *
 * @requires root {object} from window-or-global module.
 * @requires root.removeEventListener {function} for removing the event listener.
 * @param eventName {string} for setting the name of the event listened to.
 * @param callbackFunction {function} for running when the event is listened to.
 * @returns {void}
 */
export const removeEvent = (eventName, callbackFunction) => root.removeEventListener(eventName, callbackFunction);

export default {
    addEvent,
    getWindowHeight,
    getWindowWidth,
    removeEvent
};
