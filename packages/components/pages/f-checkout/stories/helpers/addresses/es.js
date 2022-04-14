const defaultId = 17731860;

const defaultAddress = {
    City: 'Barcelona',
    ZipCode: '51238',
    Line1: 'Calle del alba 12',
    Line2: 'Entresuelo B',
    Line3: 'Timbre 354',
    AddressId: defaultId
};

const additionalAddress = {
    City: 'Madrid',
    ZipCode: '28012',
    Line1: 'Calle de las Huertas',
    Line2: '16',
    Line3: '',
    AddressId: 18086210
};

const defaultGeoLocation = {
    latitude: 27.8606,
    longitude: 152.9788
};

export const esAddresses = { Addresses: [defaultAddress, additionalAddress], DefaultAddress: defaultId };

export const esAddress = {
    address: {
        lines: [defaultAddress.Line1, defaultAddress.Line2, defaultAddress.Line3],
        locality: defaultAddress.City,
        postalCode: defaultAddress.ZipCode
    },
    geolocation: defaultGeoLocation
};
