import parse from 'date-fns/parse';
import format from 'date-fns/format';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';

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

    if (!brands.includes(brand)) return false;
    if (!displayTimes) return true;

    const now = new Date();
    const currentDay = format(now, 'E');
    const { start, end } = displayTimes[currentDay] || displayTimes.All || {};

    if (!start || !end) return true;

    const startTime = parse(start, 'HH:mm', now);
    const endTime = parse(end, 'HH:mm', now);

    return isAfter(now, startTime) && isBefore(now, endTime);
};

export default isCardCurrentlyActive;
