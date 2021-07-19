import orderBy from 'lodash.orderby';
import findIndex from 'lodash.findindex';

const removeDuplicateContentCards = cards => orderBy(cards, ['updated'], ['desc'])
    .filter((contentCard, index, cardsList) => index === findIndex(
        cardsList,
        contentCard.deduplicationKey
            ? card => card.deduplicationKey === contentCard.deduplicationKey
            : card => !card.deduplicationKey
            && card.title === contentCard.title
            && card.type === contentCard.type
    ));
export default removeDuplicateContentCards;
