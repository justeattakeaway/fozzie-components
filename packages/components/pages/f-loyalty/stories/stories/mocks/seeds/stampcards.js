/**
 * Below describes the cards that will be created, the number indicates the amount and the order is the
 * order in which they will be displayed.
 * @param server
 */
export default server => {
    server.createList('card', 4, 'stampCardInProgress');
    server.createList('card', 4, 'stampCardReadyToClaim');
};
