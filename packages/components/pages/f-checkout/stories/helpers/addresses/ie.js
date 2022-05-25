const defaultAddress = {
    City: 'Dublin',
    ZipCode: 'D02 DH36',
    AddressName: 'D02 DH36',
    IsDefault: true,
    Line1: '84-87 Camden Street',
    Line2: 'Saint Kevins',
    Line3: 'Dublin 2'
};

const additionalAddress = {
    City: 'Cork',
    ZipCode: 'T12 H70C',
    AddressName: 'T12 H70C',
    IsDefault: false,
    Line1: '22 Academy St',
    Line2: 'Centre',
    Line3: null
};

const defaultGeoLocation = {
    latitude: 51.8993252,
    longitude: -8.4737329
};

export const ieAddresses = { Addresses: [defaultAddress, additionalAddress] };

export const ieAddress = {
    address: {
        lines: [defaultAddress.Line1, defaultAddress.Line2, defaultAddress.Line3],
        locality: defaultAddress.City,
        postalCode: defaultAddress.ZipCode
    },
    geolocation: defaultGeoLocation
};
