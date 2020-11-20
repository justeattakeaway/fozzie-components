import LocationFactory from './factory';
import GoogleLocationService from '../location/google';

export default (options = {}) => {
    const {
        validation = {},
        autocomplete = false
    } = options;

    const blankService = () => ({});

    const service = autocomplete
        ? LocationFactory(GoogleLocationService, options.autocomplete)
        : LocationFactory(blankService);

    return {
        get validation () {
            return validation;
        },
        /* eslint-disable-next-line no-empty-function */
        set validation (value) { },
        get options () {
            return options;
        },
        /* eslint-disable-next-line no-empty-function */
        set options (value) { },
        clientInit (dependentApiPromise) {
            if (service.clientInit !== undefined) {
                service.clientInit(dependentApiPromise);
            }
            this.isGeoAvailable = service.isGeoAvailable;
            this.isAutocompleteEnabled = !!autocomplete;
        },
        getLocationDetails: service.getLocationDetails,
        getLocationFromGeo: service.getLocationFromGeo,
        getLocationPostcode: service.getLocationPostcode,
        isAutocompleteEnabled: false,
        isGeoAvailable: false,
        /**
         * Core validation method, loops though all the validation methods (injected via validation)
         * & returns keys if the validation fails or `true` if it passes.
         * @param value
         * @param validationOverride
         * @returns {boolean}
         */
        isValid (value, validationOverride) {
            const validationService = validationOverride || validation;
            const errors = Object.keys(validationService).reduce((p, key) => (
                validationService[key](value)
                    ? p
                    : p.concat(key || false)
            ), []);

            return errors.length ? errors : true;
        },
        /* eslint-disable prefer-promise-reject-errors */
        search (address) {
            const response = this.isValid(address);
            return response === true
                ? service.searchLocations(address)
                : Promise.reject({
                    errors: response
                });
        }
    };
};
