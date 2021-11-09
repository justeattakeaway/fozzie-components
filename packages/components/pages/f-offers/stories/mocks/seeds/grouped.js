/**
 * Below describes the cards that will be created, the number indicates the amount and the order is the
 * order in which they will be displayed.
 * @param server
 */
export default server => {
    server.createList('card', 1, 'headerCard');
    server.createList('card', 3, 'promotionCard1');
    server.createList('card', 1, 'headerCard');
    server.createList('card', 1, 'promotionCard2v2');
    server.createList('card', 1, 'promotionCard2');
    server.createList('card', 1, 'restaurantFTCOfferCardT');
    server.createList('card', 1, 'headerCard');
    server.createList('card', 3, 'voucherCard1');
    server.createList('card', 1, 'headerCard');
    server.createList('card', 1, 'anniversaryCard1');
};
