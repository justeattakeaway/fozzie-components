const defaultId = 17731860

const defaultAddress = {
    City: 'Sydney',
    ZipCode: '2089',
    Line1: '196 Kurraba Road',
    Line2: 'Unit 5',
    Line3: 'Neutral Bay',
    Line4: 'New South Wales',
    AddressId: defaultId
};

const additionalAddress = {
    City: 'Melbourne',
    ZipCode: '3071',
    Line1: '94 Shaftesbury Parade',
    Line2: null,
    Line3: 'Thornbury',
    Line4: 'Victoria',
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
        administrativeArea: defaultAddress.AdministrativeArea,
        postalCode: defaultAddress.ZipCode
    },
    geolocation: defaultGeoLocation
};
