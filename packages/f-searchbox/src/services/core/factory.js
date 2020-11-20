const isGeoAvailable = typeof window !== 'undefined' && 'geolocation' in window.navigator;
const suggestionLimit = 5;
const geoOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

const getGeoError = error => {
    let message;
    switch (error.code) {
        case 0: message = 'GEO_UNKNOWN_ERROR'; break;
        case 1: message = 'GEO_PERMISSION_DENIED'; break;
        case 2: message = 'GEO_POSITION_UNAVAILABLE'; break;
        case 3: message = 'GEO_TIMEOUT'; break;
        default: message = `GEO_ERROR_${error.code}`;
    }
    return message;
};

const geoSearch = (service, lat, lng) => (
    service
    .getLocationFromGeo(lat, lng)
    .then(results => {
        if (results && results.length) {
            return results;
        }
        throw new Error('NO_SUGGESTION_FOUND');
    })
);

const getLocationFromGeo = service => ((lat, lng) => (
    lat && lng
        ? geoSearch(service, lat, lng)
        : new Promise((resolve, reject) => (
            !isGeoAvailable
                ? reject(new Error('GEO_UNAVAILABLE'))
                : navigator.geolocation.getCurrentPosition(
                    result => {
                        geoSearch(
                            service,
                            result.coords.latitude,
                            result.coords.longitude
                        ).then(resolve, reject);
                    },
                    error => {
                        const message = getGeoError(error);
                        reject(new Error(message));
                    },
                    geoOptions
                )
        ))
));

const getLocationPostcode = geolocate => (
    (location, streetNumber) => (
        // find postcode if no postcode returned
        // but enough data is present to determine postcode
        (location.streetNumber || streetNumber)
        && location.street
        && location.locality
        && !location.postcode

            // 1. find nearby locations with latitude and longitude
            // 2. return the first location with postcode data
            // 3. add postcode to current suggestion data
            ? geolocate(location.latitude, location.longitude)
            .then(results => results.find(result => result.postcode))
            .then(result => {
                location.postcode = result && result.postcode;
                return location;
            })
            : location
    )
);

const searchLocations = (service, country) => (address => (
    !address
        ? Promise.resolve([])
        : service
        .searchLocations(address, country)
        .then(result => {
            if (result && result.length) {
                return result.slice(0, suggestionLimit);
            }
            throw new Error('NO_SUGGESTION_FOUND');
        }, () => {
            throw new Error('SEARCH_ERROR');
        })
));

// create a response to methods where a service
// hasn't implemented common API methods
const serviceUnavailable = () => (
    Promise.reject(new Error('SERVICE_UNAVAILABLE'))
);

export default (Service, countryCode) => {
    const service = Service();
    const geolocate = service.getLocationFromGeo && getLocationFromGeo(service);

    return {
        clientInit: service.clientInit,
        getLocationDetails: service.getLocationDetails || serviceUnavailable,
        getLocationFromGeo: geolocate || serviceUnavailable,
        getLocationPostcode: geolocate
            ? getLocationPostcode(geolocate)
            : location => Promise.resolve(location),

        // determine if geo hardware available
        // and service has geo capabilities
        isGeoAvailable: isGeoAvailable && !!service.getLocationFromGeo,

        // return empty array if service doesn't have this method
        searchLocations: service.searchLocations
            ? searchLocations(service, countryCode)
            : () => Promise.resolve([])
    };
};
