import {
    parse, format, isAfter, isBefore
} from 'date-fns';

/**
 * Determines whether a card is currently active using display times JSON
 * Can be used in isolation or as part of Array.filter
 * @param card {object}
 * @param card.displayTimes {object} - Display times
 * @param brands {string[]} - String of current brands
 * @returns {boolean} - is card active
 */
const isCardCurrentlyActive = (card = {}, brands = []) => {
    const { displayTimes, brand } = card;

    if (!displayTimes || !brand) return true;
    if (!brands.includes(brand)) return false;

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
};

export default isCardCurrentlyActive;
