import isCardCurrentlyActive from './isCardCurrentlyActive';

/**
 * Filters cards by currently active using timestamps
 * @param cards
 */
const filterByCurrentlyActive = cards => cards
    .filter(card => isCardCurrentlyActive(card));
export default filterByCurrentlyActive;
