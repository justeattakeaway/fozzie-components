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
            [4, 'has all location attributes', { location: MOCK_CURRENT_LOCATION.location, latitude: MOCK_CURRENT_LOCATION.latitude, longitude: MOCK_CURRENT_LOCATION.longitude }],
            [3, 'has all location attributes with a different postcode', { location: 'BS1 3EQ', latitude: MOCK_CURRENT_LOCATION.latitude, longitude: MOCK_CURRENT_LOCATION.longitude }],
            [3, 'only has geocoords', { location: null, latitude: MOCK_CURRENT_LOCATION.latitude, longitude: MOCK_CURRENT_LOCATION.longitude }],
            [2, 'has no geocoords', { location: MOCK_CURRENT_LOCATION.location, latitude: null, longitude: null }],
            [2, 'has invalid geocoords', { location: MOCK_CURRENT_LOCATION.location, latitude: '0.000', longitude: '0.000' }],
            [2, 'is missing latitude', { location: MOCK_CURRENT_LOCATION.location, latitude: null, longitude: MOCK_CURRENT_LOCATION.longitude }],
            [2, 'is missing longitude', { location: MOCK_CURRENT_LOCATION.location, latitude: MOCK_CURRENT_LOCATION.latitude, longitude: null }],
            [1, 'has no geocoords with a different postcode', { location: 'BS1 3EQ', latitude: null, longitude: null }],
            [2, 'has no valid location attributes', { location: null, latitude: null, longitude: null }]
        ])('should return %s cards when the users location %s', (numberOfCards, description, locationObject) => {
            // Arrange & Act
            const filteredCards = locationFilter(MOCK_CARDS_WITH_LOCATION_KVP, locationObject);
            // Assert
            expect(filteredCards.length).toEqual(numberOfCards);
        });
    });

    describe('card has NO Location KVP', () => {
        it.each([
            [4, 'has all location attributes', { location: MOCK_CURRENT_LOCATION.location, latitude: MOCK_CURRENT_LOCATION.latitude, longitude: MOCK_CURRENT_LOCATION.longitude }],
            [3, 'only has geocoords', { location: null, latitude: MOCK_CURRENT_LOCATION.latitude, longitude: MOCK_CURRENT_LOCATION.longitude }],
            [3, 'only has location', { location: MOCK_CURRENT_LOCATION.location, latitude: null, longitude: null }],
            [3, 'has invalid geocoords', { location: MOCK_CURRENT_LOCATION.location, latitude: '0.000', longitude: '0.000' }],
            [3, 'is missing latitude', { location: MOCK_CURRENT_LOCATION.location, latitude: null, longitude: MOCK_CURRENT_LOCATION.longitude }],
            [3, 'is missing longitude', { location: MOCK_CURRENT_LOCATION.location, latitude: MOCK_CURRENT_LOCATION.latitude, longitude: null }],
            [1, 'has no valid location attributes', { location: null, latitude: null, longitude: null }]
        ])('should return %s cards when the users location %s', (numberOfCards, description, locationObject) => {
            // Arrange & Act
            const filteredCards = locationFilter(MOCK_CARDS_WITHOUT_LOCATION_KVP, locationObject);
            // Assert
            expect(filteredCards.length).toEqual(numberOfCards);
        });
    });
});
