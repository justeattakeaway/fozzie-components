import {
    GEO_UNKNOWN_ERROR,
    GEO_PERMISSION_DENIED,
    GEO_POSITION_UNAVAILABLE,
    GEO_TIMEOUT,
    GEO_ERROR,
    GEO_UNAVAILABLE,
    NO_SUGGESTION_FOUND,
    SEARCH_ERROR,
    SERVICE_UNAVAILABLE
} from '../service.types';

const isGeoAvailable = typeof window !== 'undefined' && 'geolocation' in window.navigator;
const suggestionLimit = 5;
const geoOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

/**
 * Return specific Geo Error states, method to be used in conjunction with`getLocationFromGeo`.
 *
 *
 * @param error
 * @returns {*}
 */
const getGeoError = error => {
    let message;
    switch (error.code) {
        case 0: message = GEO_UNKNOWN_ERROR; break;
        case 1: message = GEO_PERMISSION_DENIED; break;
        case 2: message = GEO_POSITION_UNAVAILABLE; break;
        case 3: message = GEO_TIMEOUT; break;
        default: message = `${GEO_ERROR}_${error.code}`;
    }
    return message;
};

/**
 * Geo search helper, each tenant (the ones that use google places) will supply their own
 * service config this definition primarily comes from the Base.vue where the `service`
 * is passed through to the component.
 *
 * @param service
 * @param lat
 * @param lng
 */
const geoSearch = (service, lat, lng) => (
    service
    .getLocationFromGeo(lat, lng)
    .then(results => {
        if (results && results.length) {
            return results;
        }
        throw new Error(NO_SUGGESTION_FOUND);
    })
);

/**
 * Checks for lat & lng then attempts to make a `geoSearch`
 * otherwise we look up the users geolocation manually.
 *
 * @param service
 */
const getLocationFromGeo = service => ((lat, lng) => (
    lat && lng
        ? geoSearch(service, lat, lng)
        : new Promise((resolve, reject) => (
            !isGeoAvailable
                ? reject(new Error(GEO_UNAVAILABLE))
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

/**
 * Triggered via our config `service` so we can determine the following whilst the user makes a selection
 * from the suggestions list:
 *
 * 1. Find postcode if no postcode returned then just return the location.
 * 2. If there's enough data then find nearby locations via `geolocate` with latitude and longitude.
 *  2.1 return the first location with postcode data
 *  2.2 add postcode to current suggestion data
 *
 * @param geolocate
 */
const getLocationPostcode = geolocate => (
    (location, streetNumber) => (
        (location.streetNumber || streetNumber)
        && location.street
        && location.locality
        && !location.postcode

            ? geolocate(location.latitude, location.longitude)
            .then(results => results.find(result => result.postcode))
            .then(result => {
                location.postcode = result && result.postcode;
                return location;
            })

            : location
    )
);

/**
 * Relies on an `address` being provided otherwise we resolve the method with an empty
 * array so our component can handle the rest. If the address exists we attempt to resolve via
 * `searchLocations` method. The service parameter is provided by the service setup from the core services directory
 * `LocationFactory`
 *
 *
 * @param service
 * @param country
 */
const searchLocations = (service, country) => (address => (
    !address
        ? Promise.resolve([])
        : service
            .searchLocations(address, country)
            .then(result => {
                if (result && result.length) {
                    return result.slice(0, suggestionLimit);
                }
                throw new Error(NO_SUGGESTION_FOUND);
            }, () => {
                throw new Error(SEARCH_ERROR);
            })
));

/**
 * Creates a response to methods where a service hasn't implemented common API methods.
 * Essentially creates a Prmoise rejection.
 *
 */
const serviceUnavailable = () => (
    Promise.reject(new Error(SERVICE_UNAVAILABLE))
);

/**
 * Sets up the main `service` via a callback which then exposes either the Google service or a blank service
 * (dependant on the tenant specific service `autocomplete`). This setup eventually allows us to invoke
 * search related calls within our vue components.
 *
 * @param Service
 * @param countryCode
 * @returns {{clientInit: (clientInit|*),
 * getLocationDetails: (function(): Promise.<*>),
 * getLocationFromGeo: (function(): Promise.<*>),
 * getLocationPostcode: (function(*=): Promise.<T>),
 * isGeoAvailable: boolean,
 * searchLocations: (function(): Promise.<Array>)}}
 *
 */
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

        isGeoAvailable: isGeoAvailable && !!service.getLocationFromGeo,

        searchLocations: service.searchLocations
            ? searchLocations(service, countryCode)
            : () => Promise.resolve([])
    };
};
