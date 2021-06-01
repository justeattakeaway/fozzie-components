import filterByBrands from '../filterByBrandName';

const mockBrands = [
    'a',
    'b'
];

const mockCards = [
    {
        id: 1,
        brand: 'a'
    },
    {
        id: 2,
        brand: 'b'
    },
    {
        id: 3,
        brand: 'c'
    },
    {
        id: 4
    }
];

describe('filterByBrandName', () => {
    it('should filter cards by brand key', () => {
        // Act
        const filteredCards = filterByBrands(mockCards, mockBrands);

        // Assert
        expect(filteredCards.length).toEqual(mockCards.length - 1);
    });

    it('should not filter a card if no brand key is present', () => {
        // Act
        const filteredCards = filterByBrands(mockCards, mockBrands);

        // Assert
        expect(filteredCards).toEqual(expect.arrayContaining([{ id: 4 }]));
    });

    it('should return all cards if passed brands array is empty', () => {
        // Act
        const filteredCards = filterByBrands(mockCards, []);

        // Assert
        expect(filteredCards.length).toEqual(mockCards.length);
    });
});
