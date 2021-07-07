import {
    parse, format, isAfter, isBefore
} from 'date-fns';

/**
 * Determines whether the current time is within the display times JSON
 * @param displayTimes
 * @return {boolean|boolean}
 */
export function isCardActiveBasedOnTime (displayTimes) {
    const now = new Date();
    const currentDay = format(now, 'E');
    const times = displayTimes[currentDay] || displayTimes.Any || [];

    return !(times instanceof Array)
        || times.length === 0
        || times.some(({ Start: start, End: end }) => {
            if (!start || !end) return true;

            const startTime = parse(start, 'HH:mm', now);
            const endTime = parse(end, 'HH:mm', now);

            return isAfter(now, startTime) && isBefore(now, endTime);
        });
}

/**
 * Can be used in isolation or as part of Array.filter
 * @param card {object}
 * @param card.displayTimes {object} - Display times
 * @param card.isVisible {string} - Identifier string for relevant brand
 * @returns {boolean} - is card active
 */
const isCardCurrentlyActive = (card = {}) => {
    const { displayTimes, isVisible } = card;

    return (isVisible !== false)
        && (!displayTimes || isCardActiveBasedOnTime(displayTimes));
};

export default isCardCurrentlyActive;
