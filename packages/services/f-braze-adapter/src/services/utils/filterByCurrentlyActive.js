import isCardCurrentlyActive from './isCardCurrentlyActive';

const filterByCurrentlyActive = cards => cards
    .filter(card => isCardCurrentlyActive(card));
export default filterByCurrentlyActive;
