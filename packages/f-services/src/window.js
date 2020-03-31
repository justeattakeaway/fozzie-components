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
 * @param callBackFunction {function} The function to be called by the event listener.
 * @returns {void}
 */
export const addEvent = (eventName, callBackFunction, throttleTime = 0) => {
    const callback =
        throttleTime >= 0
            ? throttle(callBackFunction, throttleTime)
            : callBackFunction;
    return root.addEventListener(eventName, callback);
};

/**
 * Removes chosen event.
 *
 * @requires root {object} from window-or-global module.
 * @requires root.removeEventListener {function} for removing the event listener.
 * @param eventName {string} for setting the name of the event listened to.
 * @param callBackFunction {function} for running when the event is listened to.
 * @returns {void}
 */
export const removeEvent = (eventName, callBackFunction) => root.removeEventListener(eventName, callBackFunction);

export default {
    addEvent,
    getWindowHeight,
    getWindowWidth,
    removeEvent
};
