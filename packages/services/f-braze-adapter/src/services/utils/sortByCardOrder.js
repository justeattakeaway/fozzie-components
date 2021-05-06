/**
 * A 'large number' to force cards without an order to be ordered to the back
 * @type {number}
 */
const DEFAULT_ORDER_VALUE = 9e9;

const sortByCardOrder = cards => cards.sort((
    { order: a = DEFAULT_ORDER_VALUE },
    { order: b = DEFAULT_ORDER_VALUE }
) => (
    +a - +b
));
export default sortByCardOrder;
