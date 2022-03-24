const defaultId = 17731860;

const defaultAddress = {
    City: 'Cavacurta',
    ZipCode: '26844',
    Line1: 'Via Duomo',
    Line2: '56',
    Line3: '',
    Line4: 'Lodi',
    AddressId: defaultId
};

const additionalAddress = {
    City: 'Cornate D\'adda',
    ZipCode: '20040',
    Line1: 'Via Nazario Sauro',
    Line2: '15',
    Line3: '',
    Line4: 'Milano',
    AddressId: 18086210
};

const defaultGeoLocation = {
    latitude: 27.8606,
    longitude: 152.9788
};

export const itAddresses = { Addresses: [defaultAddress, additionalAddress], DefaultAddress: defaultId };

export const itAddress = {
    address: {
        lines: [defaultAddress.Line1, defaultAddress.Line2, defaultAddress.Line3, defaultAddress.Line4],
        locality: defaultAddress.City,
        postalCode: defaultAddress.ZipCode
    },
    geolocation: defaultGeoLocation
};
