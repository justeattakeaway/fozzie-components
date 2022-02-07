const defaultAddress = {
    City: 'London',
    ZipCode: 'EC4M 7RF',
    AddressName: 'EC4M 7RF',
    IsDefault: true,
    Line1: 'Fleet Place House',
    Line2: 'Farringdon',
    Line3: null
};

const additionalAddress = {
    City: 'Area 51',
    ZipCode: 'AR51 7AR',
    AddressName: 'AR51 7AR',
    IsDefault: false,
    Line1: 'Test St 1',
    Line2: 'Test House',
    Line3: null
};

const defaultGeoLocation = {
    latitude: 51.5165,
    longitude: 0.1033
};

export const ukAddresses = { Addresses: [defaultAddress, additionalAddress] };

export const ukAddress = {
    address: {
        lines: [defaultAddress.Line1, defaultAddress.Line2, defaultAddress.Line3],
        locality: defaultAddress.City,
        postalCode: defaultAddress.ZipCode
    },
    geolocation: defaultGeoLocation
};
