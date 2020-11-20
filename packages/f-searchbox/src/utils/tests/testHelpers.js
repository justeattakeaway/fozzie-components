/* eslint-disable import/prefer-default-export */

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

export {
    loadGoogleMapsMocks
};
