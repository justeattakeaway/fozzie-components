import removeDuplicateContentCards from '../removeDuplicateContentCards';

const mockCards = [
    {
        type: 'a',
        title: 'title_a'
    },
    {
        type: 'a',
        title: 'title_a'
    },
    {
        type: 'b',
        title: 'title_b'
    },
    {
        type: 'b',
        title: 'title_b'
    }
];

describe('removeDuplicateContentCards', () => {
    it('should remove cards that have duplicate title and type', () => {
        // Act
        const filteredCards = removeDuplicateContentCards(mockCards);

        // Assert
        expect(filteredCards.length).toEqual(2);
    });
});
