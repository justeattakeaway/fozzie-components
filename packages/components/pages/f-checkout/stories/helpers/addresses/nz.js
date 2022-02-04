const defaultId = 17731860

const defaultAddress = {
    City: 'McLeans Island',
    ZipCode: '4285',
    Line1: '61 Albert Street',
    Line2: 'Flat 1',
    Line3: null,
    Line4: 'New Christchurch Wales',
    AddressId: defaultId
};

const additionalAddress = {
    City: 'Christchurch',
    ZipCode: '8042',
    Line1: '42 Tintern Avenue',
    Line2: 'Flat 1',
    Line3: 'null',
    Line4: 'Riccarton',
    AddressId: 18086210
};

const defaultGeoLocation = {
    latitude: 27.8606,
    longitude: 152.9788
}

export const nzAddresses = { Addresses: [defaultAddress, additionalAddress], DefaultAddress: defaultId }

export default {
    address: {
        lines: [defaultAddress.Line1, defaultAddress.Line2, defaultAddress.Line3],
        locality: defaultAddress.City,
        postalCode: defaultAddress.ZipCode
    },
    geolocation: defaultGeoLocation
};
