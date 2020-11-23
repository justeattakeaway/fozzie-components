/* global google */
import { formatLocation } from './helpers';

const baseUrl = 'https://maps.googleapis.com/maps/api/js';
const loadTimeout = 5000;
const errors = {
    API_FAIL: 'MAPS_API_FAIL',
    LOAD_FAIL: 'MAPS_LOAD_FAIL',
    NOT_INITIALISED:  'MAPS_NOT_INITIALISED'
};

// define the fields we want to return from getDetails
const fields = [
    'address_components',
    'formatted_address',
    'place_id',
    'geometry',
    'types'
];

/**
 * Service provider responsible for checking and returning the google `AutocompleteService`.
 *
 * @returns {{
 *  autocomplete: Window.google.maps.places.AutocompleteService,
 *  geocoder: Window.google.maps.Geocoder,
 *  latlng: (function(...[*])),
 *  places: Window.google.maps.places.PlacesService,
 *  createSessionToken: (function(): google.maps.places.AutocompleteSessionToken)
 * }}
 */
function getServices () {
    if (
        !google.maps ||
        !google.maps.Geocoder ||
        !google.maps.places ||
        !google.maps.places.PlacesService ||
        !google.maps.places.AutocompleteService
    ) {
        throw new Error(errors.API_FAIL);
    }

    const dummyElement = document.createElement('div');

    return {
        autocomplete: new google.maps.places.AutocompleteService(),
        geocoder: new google.maps.Geocoder(),
        latlng: (...args) => new google.maps.LatLng(...args),
        places: new google.maps.places.PlacesService(dummyElement),
        createSessionToken: () => new google.maps.places.AutocompleteSessionToken()
    };
}

/**
 * Loads the google api via a Promise. Responsible for generating the script settings
 * & appending to the DOM.
 *
 * @param client
 * @param libraries
 * @returns {Promise}
 */
function loadGoogleApi ({ client, libraries }) {
    return new Promise((resolve, reject) => {
        // resolve on load
        window.googleMapsApiLoaded = window.googleMapsApiLoaded || (() => resolve());

        // generate url
        let url = `${baseUrl}?client=${client}`;
        if (libraries) {
            url += `&libraries=${libraries.join(',')}`;
        }
        url += '&callback=googleMapsApiLoaded';

        // load script async
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        script.src = url;
        document.body.appendChild(script);

        // reject after set period
        // NOTE: reject will fail (silently) if already resolved successfully
        setTimeout(() => {
            reject(new Error(errors.LOAD_FAIL));
        }, loadTimeout);
    });
}

export default () => {
    let sessionToken;
    let initPromise;

    /**
     * Checks to make sure we only get the service that's fully loaded.
     *
     * @returns {*}
     */
    function getService () {
        if (!initPromise) {
            throw new Error(errors.NOT_INITIALISED);
        }
        return initPromise;
    }

    return {
        /**
         * This method uses a two step process:
         *
         * 1. Checks to determine a promise that resolves when the google maps api has loaded.
         * 2. Creates  a promise chain that resolves to a service instance bound to the resolved google maps api
         *
         *
         * @param googleApiPromise {Promise|undefined} If defined, is assumed to resolve when google maps api has loaded
         * @returns {Promise}
         */
        clientInit: googleApiPromise => {
            let loadingPromise;

            if (window.google !== undefined) {
                loadingPromise = Promise.resolve();
            } else if (googleApiPromise !== undefined && typeof googleApiPromise.then === 'function') {
                loadingPromise = googleApiPromise;
            } else {
                loadingPromise = loadGoogleApi({
                    client: 'gme-justeat',
                    libraries: ['places']
                });
            }

            initPromise = loadingPromise.then(() => getServices()).then(services => {
                sessionToken = services.createSessionToken();
                return services;
            });

            return initPromise;
        },

        /**
         * Resolves the `getService` with a formatted location from `getDetails`.
         *
         * @param placeId
         */
        getLocationDetails: placeId => getService().then(services => new Promise(resolve => {
            sessionToken = services.createSessionToken();

            services.places.getDetails({ placeId, sessionToken, fields }, results => (
                resolve(formatLocation(results))
            ));
        })),

        /**
         * Resolves the `getService` with a formatted location from `geocoder`.
         *
         * @param lat
         * @param lng
         */
        getLocationFromGeo: (lat, lng) => getService().then(services => new Promise(resolve => {
            services.geocoder.geocode({
                location: services.latlng(lat, lng)
            }, results => {
                resolve(results.map(formatLocation));
            });
        })),

        /**
         * Resolves the `getService` with a formatted location from autocomplete `getPlacePredictions`.
         *
         * @param address
         * @param country
         */
        searchLocations: (address, country) => getService().then(services => new Promise(resolve => {
            services.autocomplete.getPlacePredictions({
                componentRestrictions: {
                    country
                },
                input: address,
                sessionToken
            }, resolve);
        })),

        /**
         * Create session token from `services.createSessionToken`.
         */
        getSessionToken: () => sessionToken
    };
};
