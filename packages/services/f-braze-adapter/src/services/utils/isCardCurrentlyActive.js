import {
    parse, format, isAfter, isBefore
} from 'date-fns';

/**
 * Determines whether the current time is within the display times JSON
 * @param displayTimes
 * @return {boolean|boolean}
 */
function isCardActiveBasedOnTime (displayTimes) {
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
 * @param card.brand {string} - Identifier string for relevant brand
 * @param card.isVisible {string} - Identifier string for relevant brand
 * @param brands {string[]} - String of current brands
 * @returns {boolean} - is card active
 */
const isCardCurrentlyActive = (card = {}, brands = []) => {
    const { displayTimes, brand, isVisible } = card;

    return (isVisible !== false)
        && (!brand || brands.includes(brand))
        && (!displayTimes || isCardActiveBasedOnTime(displayTimes));
};

export default isCardCurrentlyActive;
