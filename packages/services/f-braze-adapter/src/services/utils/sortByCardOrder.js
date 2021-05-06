const sortByCardOrder = cards => cards.sort(({ order: a }, { order: b }) => +a - +b);
export default sortByCardOrder;
