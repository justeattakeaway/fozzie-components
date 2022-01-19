import locationFilter from '../locationFilter';

const MOCK_CURRENT_LOCATION = { location: 'BS1 3EQ', latitude: '51.12604231590439', longitude: '-1.7127676870914037' };
const MOCK_CARDS = [
    {
        id: '1',
        type: 'HCC',
        location: 'BS1 3EQ, BA11 2PT',
        url: 'https://example.com/search?location=$LOCATION&lat=$LAT&lon=$LON'
    },
    {
        id: '2',
        type: 'HCC',
        location: 'BA11 2PT',
        url: 'https://example.com/search?location=$LOCATION&lat=$LAT&lon=$LON'
    },
    {
        id: '3',
        type: 'HCC',
        location: '',
        url: 'https://example.com/search?location=$LOCATION&lat=$LAT&lon=$LON'
    },
    {
        id: '4',
        type: 'HCC',
        url: 'https://example.com/search?location=$LOCATION&lat=$LAT&lon=$LON'
    },
    {
        id: '5',
        type: 'VCC',
        url: 'https://example.com/search?location=$LOCATION&lat=$LAT&lon=$LON'
    }
];

describe('LocationFilter', () => {
    it('should return 3 cards when current location is set to "BS1 3EQ', () => {
        // Arrange & Act
        const filteredCards = locationFilter(MOCK_CARDS, MOCK_CURRENT_LOCATION);

        // Assert
        expect(filteredCards.length).toEqual(3);
    });

    it('should NOT return cards that do not match the users current location where a location KVP exists', () => {
        // Arrange & Act
        const filteredCards = locationFilter(MOCK_CARDS, MOCK_CURRENT_LOCATION);
        const cardNoLocations = filteredCards.find(c => c.id === '3');
        const cardWrongLocations = filteredCards.find(c => c.id === '2');

        // Assert
        expect(cardNoLocations).toEqual(undefined);
        expect(cardWrongLocations).toEqual(undefined);
        expect(filteredCards.length).toEqual(3);
    });

    it('should return cards that have NO location KVP where a user has a current location', () => {
        // Arrange & Act
        const filteredCards = locationFilter(MOCK_CARDS, MOCK_CURRENT_LOCATION);

        // Assert
        expect(filteredCards.find(c => c.id === '4')).toEqual(MOCK_CARDS[3]);
        expect(filteredCards.find(c => c.id === '5')).toEqual(MOCK_CARDS[4]);
        expect(filteredCards.length).toEqual(3);
    });

    it('should NOT return cards that have location KVP where a user does NOT have a current location', () => {
        // Arrange & Act
        const filteredCards = locationFilter(MOCK_CARDS, {
            location: null,
            latitude: null,
            longitude: null
        });
        const cardLocations = filteredCards.find(c => c.id === '1');
        const carLocations2 = filteredCards.find(c => c.id === '2');
        const carLocations3 = filteredCards.find(c => c.id === '3');

        // Assert
        expect(cardLocations).toEqual(undefined);
        expect(carLocations2).toEqual(undefined);
        expect(carLocations3).toEqual(undefined);
        expect(filteredCards.length).toEqual(2);
    });

    it('should return cards that have NO location KVP when the user has NO current location', () => {
        // Arrange & Act
        const filteredCards = locationFilter(MOCK_CARDS, {
            location: null,
            latitude: null,
            longitude: null
        });

        // Assert
        expect(filteredCards.find(c => c.id === '4')).toEqual(MOCK_CARDS[3]);
        expect(filteredCards.find(c => c.id === '5')).toEqual(MOCK_CARDS[4]);
        expect(filteredCards.length).toEqual(2);
    });
});
