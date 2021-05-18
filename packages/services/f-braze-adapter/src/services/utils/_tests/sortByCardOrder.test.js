import sortByCardOrder from '../sortByCardOrder';

const mockCards = [
    {
        id: 1,
        order: '3'
    },
    {
        id: 2,
        order: '1'
    },
    {
        id: 3,
        order: '2'
    },
    {
        id: 4
    }
];

describe('sortByCardOrder', () => {
    it('should sort by order key', () => {
        // Arrange
        const expected = [
            {
                id: 2,
                order: '1'
            },
            {
                id: 3,
                order: '2'
            },
            {
                id: 1,
                order: '3'
            },
            {
                id: 4
            }
        ];

        // Act
        const orderedCards = sortByCardOrder(mockCards);

        // Arrange
        expect(orderedCards).toEqual(expected);
    });

    it('should put cards with NO order key at the back', () => {
        // Act
        const orderedCards = sortByCardOrder(mockCards);

        // Arrange
        expect(orderedCards[3]).toEqual({ id: 4 });
    });
});
