import locationFilter from '../locationFilter';

const MOCK_CURRENT_LOCATION = { location: 'BA11 2PT', latitude: '51.12604231590439', longitude: '-1.7127676870914037' };
const MOCK_CARDS_WITH_LOCATION_KVP = [
    {
        id: '1',
        type: 'HCC',
        location: 'BS1 3EQ, BA11 2PT',
        url: 'https://example.com/search?location=$LOCATION$&lat=$LAT$&lon=$LON$'
    },
    {
        id: '2',
        type: 'HCC',
        location: 'BA11 2PT',
        url: 'https://example.com/search?location=$LOCATION$&lat=$LAT$&lon=$LON$'
    },
    {
        id: '3',
        type: 'HCC',
        location: 'BA11 2PT',
        url: 'https://example.com/search?location=$LOCATION$&lat=$LAT$&lon=$LON$'
    },
    {
        id: '4',
        type: 'HCC',
        location: 'BA11 2PT',
        url: 'https://example.com/search'
    },
    {
        id: '5',
        type: 'VCC',
        location: 'BS1 3EQ',
        url: 'https://example.com/search'
    }
];

const MOCK_CARDS_WITHOUT_LOCATION_KVP = [
    {
        id: '1',
        type: 'HCC',
        url: 'https://example.com/search?location=$LOCATION$&lat=$LAT$&lon=$LON$'
    },
    {
        id: '2',
        type: 'HCC',
        url: 'https://example.com/search'
    }
];


describe('LocationFilter', () => {
    describe('cards have NO location KVP', () => {
        it('should return cards that have location PLACEHOLDERS when user has a location', () => {
            // Arrange & Act
            const filteredCards = locationFilter(MOCK_CARDS_WITHOUT_LOCATION_KVP, MOCK_CURRENT_LOCATION);
            const cardLocations = filteredCards.find(c => c.id === '1');
            const carLocations2 = filteredCards.find(c => c.id === '2');

            // Assert
            expect(cardLocations).toEqual(MOCK_CARDS_WITHOUT_LOCATION_KVP[0]);
            expect(carLocations2).toEqual(MOCK_CARDS_WITHOUT_LOCATION_KVP[1]);
            expect(filteredCards.length).toEqual(2);
        });

        it('should NOT return cards that have NO location KVP, but have location PLACEHOLDERS when the user has NO location', () => {
            // Arrange & Act
            const filteredCards = locationFilter(MOCK_CARDS_WITHOUT_LOCATION_KVP, {
                location: null,
                latitude: null,
                longitude: null
            });
            const card = filteredCards.find(c => c.id === '1');

            // Assert
            expect(card).toEqual(undefined);
            expect(filteredCards.length).toEqual(1);
        });

        it('should return cards that have NO location KVP and NO location PLACEHOLDERS when the user has NO location', () => {
            // Arrange & Act
            const filteredCards = locationFilter(MOCK_CARDS_WITHOUT_LOCATION_KVP, {
                location: null,
                latitude: null,
                longitude: null
            });
            const cardLocations = filteredCards.find(c => c.id === '2');

            // Assert
            expect(cardLocations).toEqual(MOCK_CARDS_WITHOUT_LOCATION_KVP[1]);
            expect(filteredCards.length).toEqual(1);
        });
    });

    describe('card has a Location KVP', () => {
        it('should NOT return cards that have location PLACEHOLDERS where the user has NO location', () => {
            // Arrange & Act
            const filteredCards = locationFilter(MOCK_CARDS_WITH_LOCATION_KVP, {
                location: null,
                latitude: null,
                longitude: null
            });
            const card = filteredCards.find(c => c.id === '1');
            const card2 = filteredCards.find(c => c.id === '2');
            const card3 = filteredCards.find(c => c.id === '3');

            // Assert
            expect(card).toEqual(undefined);
            expect(card2).toEqual(undefined);
            expect(card3).toEqual(undefined);
            expect(filteredCards.length).toEqual(2);
        });

        it('should NOT return cards that have location PLACEHOLDERS where the user has an invalid latitude and longitude', () => {
            // Arrange & Act
            const filteredCards = locationFilter(MOCK_CARDS_WITH_LOCATION_KVP, {
                location: 'BA11 2PT',
                latitude: '0.000',
                longitude: '0.000'
            });
            const card = filteredCards.find(c => c.id === '3');

            // Assert
            expect(card).toEqual(undefined);
            expect(filteredCards.length).toEqual(1);
        });

        it('should return cards that do NOT have location PLACEHOLDERS', () => {
            // Arrange & Act
            const filteredCards = locationFilter(MOCK_CARDS_WITH_LOCATION_KVP, {
                location: null,
                latitude: null,
                longitude: null
            });

            // Assert
            expect(filteredCards.length).toEqual(2);
        });

        it('should return cards where the users location matches the cards location KVP', () => {
            // Arrange & Act
            const filteredCards = locationFilter(MOCK_CARDS_WITH_LOCATION_KVP, MOCK_CURRENT_LOCATION);
            const card = filteredCards.find(c => c.id === '4');
            const card2 = filteredCards.find(c => c.id === '5');

            // Assert
            expect(card).toEqual(MOCK_CARDS_WITH_LOCATION_KVP[3]);
            expect(card2).toEqual(undefined);
            expect(filteredCards.length).toEqual(4);
        });

        it('should NOT return cards where the users location does NOT match the cards location KVP', () => {
            // Arrange & Act
            const filteredCards = locationFilter(MOCK_CARDS_WITH_LOCATION_KVP, { ...MOCK_CURRENT_LOCATION, location: 'BS1 3EQ' });
            const card = filteredCards.find(c => c.id === '2');
            const card2 = filteredCards.find(c => c.id === '3');
            const card3 = filteredCards.find(c => c.id === '4');

            // Assert
            expect(card).toEqual(undefined);
            expect(card2).toEqual(undefined);
            expect(card3).toEqual(undefined);
            expect(filteredCards.length).toEqual(2);
        });
    });
});
