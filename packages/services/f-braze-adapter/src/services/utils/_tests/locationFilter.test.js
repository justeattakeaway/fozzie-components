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
        url: 'https://example.com/search?location=$LOCATION$'
    },
    {
        id: '3',
        type: 'HCC',
        location: 'BA11 2PT',
        url: 'https://example.com/search?lat=$LAT$&lon=$LON$'
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
    },
    {
        id: '6',
        type: 'HCC',
        location: 'BS1 3EQ',
        url: 'https://example.com/search?location=$LOCATION$&lat=$LAT$&lon=$LON$'
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
        url: 'https://example.com/search?location=$LOCATION$'
    },
    {
        id: '3',
        type: 'HCC',
        url: 'https://example.com/search?lat=$LAT$&lon=$LON$'
    },
    {
        id: '4',
        type: 'HCC',
        url: 'https://example.com/search'
    }
];


describe('LocationFilter', () => {
    describe('card has a Location KVP', () => {
        it.each([
            [4, { location: MOCK_CURRENT_LOCATION.location, latitude: MOCK_CURRENT_LOCATION.latitude, longitude: MOCK_CURRENT_LOCATION.longitude }],
            [3, { location: 'BS1 3EQ', latitude: MOCK_CURRENT_LOCATION.latitude, longitude: MOCK_CURRENT_LOCATION.longitude }],
            [3, { location: null, latitude: MOCK_CURRENT_LOCATION.latitude, longitude: MOCK_CURRENT_LOCATION.longitude }],
            [2, { location: MOCK_CURRENT_LOCATION.location, latitude: null, longitude: null }],
            [2, { location: MOCK_CURRENT_LOCATION.location, latitude: '0.000', longitude: '0.000' }],
            [2, { location: MOCK_CURRENT_LOCATION.location, latitude: null, longitude: MOCK_CURRENT_LOCATION.longitude }],
            [2, { location: MOCK_CURRENT_LOCATION.location, latitude: MOCK_CURRENT_LOCATION.latitude, longitude: null }],
            [1, { location: 'BS1 3EQ', latitude: null, longitude: null }],
            [2, { location: null, latitude: null, longitude: null }]
        ])('should return %s cards when the users location is %o', (numberOfCards, locationObject) => {
            // Arrange & Act
            const filteredCards = locationFilter(MOCK_CARDS_WITH_LOCATION_KVP, locationObject);
            // Assert
            expect(filteredCards.length).toEqual(numberOfCards);
        });
    });

    describe('card has NO Location KVP', () => {
        it.each([
            [4, { location: MOCK_CURRENT_LOCATION.location, latitude: MOCK_CURRENT_LOCATION.latitude, longitude: MOCK_CURRENT_LOCATION.longitude }],
            [3, { location: null, latitude: MOCK_CURRENT_LOCATION.latitude, longitude: MOCK_CURRENT_LOCATION.longitude }],
            [3, { location: MOCK_CURRENT_LOCATION.location, latitude: null, longitude: null }],
            [3, { location: MOCK_CURRENT_LOCATION.location, latitude: '0.000', longitude: '0.000' }],
            [3, { location: MOCK_CURRENT_LOCATION.location, latitude: null, longitude: MOCK_CURRENT_LOCATION.longitude }],
            [3, { location: MOCK_CURRENT_LOCATION.location, latitude: MOCK_CURRENT_LOCATION.latitude, longitude: null }],
            [1, { location: null, latitude: null, longitude: null }]
        ])('should return %s cards when the users location is %o', (numberOfCards, locationObject) => {
            // Arrange & Act
            const filteredCards = locationFilter(MOCK_CARDS_WITHOUT_LOCATION_KVP, locationObject);
            // Assert
            expect(filteredCards.length).toEqual(numberOfCards);
        });
    });
});
