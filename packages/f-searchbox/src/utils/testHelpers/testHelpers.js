/* eslint-disable import/prefer-default-export, camelcase */

function loadGoogleMapsMocks (opts = {}) {
    const {
        autoCompleteGetPlace = jest.fn(),
        geoGetGeoCode = jest.fn(),
        latLng = jest.fn(),
        placesGetDetails = jest.fn(),
        createSessionToken = jest.fn(() => { })
    } = opts;

    window.google = {
        maps: {
            Geocoder: () => ({
                geocode: geoGetGeoCode
            }),
            LatLng: latLng,
            places: {
                AutocompleteService: () => ({
                    getPlacePredictions: autoCompleteGetPlace
                }),
                PlacesService: () => ({
                    getDetails: placesGetDetails
                }),
                AutoCompleteSessionToken: createSessionToken
            }
        }
    };

    return {
        autoCompleteGetPlace,
        geoGetGeoCode,
        latLng,
        placesGetDetails
    };
}

function getAddressComponentsMock () {
    return {
        address_components: [
            {
                long_name: 'Adelfia',
                short_name: 'Adelfia',
                types: [
                    'locality',
                    'political'
                ]
            },
            {
                long_name: 'Adelfia',
                short_name: 'Adelfia',
                types: [
                    'administrative_area_level_3',
                    'political'
                ]
            },
            {
                long_name: 'Metropolitan City of Bari',
                short_name: 'BA',
                types: [
                    'administrative_area_level_2',
                    'sublocality_level_1',
                    'political'
                ]
            },
            {
                short_name: 'route-name',
                types: [
                    'route'
                ]
            },
            {
                short_name: 'subpremise-number',
                types: [
                    'subpremise'
                ]
            },
            {
                short_name: 'street-number',
                types: [
                    'street_number'
                ]
            },
            {
                short_name: 'TEST-SHORT-NAME',
                types: [
                    'test_short_name',
                    'political'
                ]
            },
            {
                long_name: 'TEST-NO-SHORT-NAME',
                types: [
                    'test_no_short_name',
                    'political'
                ]
            },
            {
                types: [
                    'test_no_name'
                ]
            },
            {
                long_name: 'Apulia',
                short_name: 'Apulia',
                types: [
                    'administrative_area_level_1',
                    'political'
                ]
            },
            {
                long_name: 'Italy',
                short_name: 'IT',
                types: [
                    'country',
                    'political'
                ]
            },
            {
                long_name: '70010',
                short_name: '70010',
                types: [
                    'postal_code'
                ]
            }
        ],
        formatted_address: '70010 Adelfia, Metropolitan City of Bari, Italy',
        geometry: {
            location: {
                lat: () => 41.0037948,
                lng: () => 16.87218770000004
            },
            viewport: {
                south: 40.9974183,
                west: 16.858677599999965,
                north: 41.0093796,
                east: 16.883001400000012
            }
        },
        icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png',
        id: 'a14a262669053d2f6e245393891ff280e81bc872',
        name: 'Adelfia',
        place_id: 'ChIJde5K3d3qRxMRy_DlKnAZdOo',
        reference: 'ChIJde5K3d3qRxMRy_DlKnAZdOo',
        scope: 'GOOGLE',
        types: [
            'locality',
            'political'
        ],
        url: 'https://maps.google.com/?q=70010+Adelfia,+Metropolitan+City+of+Bari,+Italy&ftid=0x1347eadddd4aee75:0xea7419702ae5f0cb',
        utc_offset: 60,
        vicinity: 'Adelfia',
        html_attributions: []
    };
}

export {
    loadGoogleMapsMocks,
    getAddressComponentsMock
};
