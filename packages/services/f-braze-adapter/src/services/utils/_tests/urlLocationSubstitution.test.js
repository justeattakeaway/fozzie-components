import urlLocationSubstitution from '../urlLocationSubstitution';

const MOCK_CUSTOMER_LOCATION = {
    location: 'BS1 3EQ',
    longitude: '54.567',
    latitude: '96.987'
};
const MOCK_CARDS = [
    {
        id: '1',
        url: 'https://just-eat.co.uk/search?location=$LOCATION$&lat=$LAT$&lon=$LON$'
    },
    {
        id: '2',
        url: 'https://just-eat.co.uk/search'
    }
];

describe('urlLocationSubstitution', () => {
    it('should substitute the $LOCATION$ marker when passed in card url', () => {
        // Arrange & act
        const [card] = urlLocationSubstitution(MOCK_CARDS, MOCK_CUSTOMER_LOCATION);
        const { url } = card;

        // Assert
        expect(url).toContain(MOCK_CUSTOMER_LOCATION.location);
    });

    it('should substitute the $LON$ marker when passed in card url', () => {
        // Arrange & act
        const [card] = urlLocationSubstitution(MOCK_CARDS, MOCK_CUSTOMER_LOCATION);
        const { url } = card;

        // Assert
        expect(url).toContain(MOCK_CUSTOMER_LOCATION.longitude);
    });

    it('should substitute the $LAT$ marker when passed in card url', () => {
        // Arrange & act
        const [card] = urlLocationSubstitution(MOCK_CARDS, MOCK_CUSTOMER_LOCATION);
        const { url } = card;

        // Assert
        expect(url).toContain(MOCK_CUSTOMER_LOCATION.latitude);
    });
});
