import orderBy from 'lodash.orderby';
import findIndex from 'lodash.findindex';

const removeDuplicateContentCards = cards => orderBy(cards, 'updated')
    .filter((contentCard, index, item) => index ===
        findIndex(
            item,
            card => card.title === contentCard.title &&
                card.type === contentCard.type
        ));
export default removeDuplicateContentCards;
