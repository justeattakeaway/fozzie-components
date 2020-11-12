import LocationFactory from './factory';

export default (options = {}) => {
    const {
        validation = {},
    } = options;
    
    const blankService = () => ({});
    const service = LocationFactory(blankService);
    
    return {
        /* eslint-disable-next-line no-empty-function */
        set validation (value) { },
        get validation () {
            return validation;
        },
        clientInit (dependentApiPromise) {
            if (service.clientInit !== undefined) {
                service.clientInit(dependentApiPromise);
            }
        },
        isValid (value, validationOverride) {
            // loop through validation methods
            const validationService = validationOverride || validation;
            const errors = Object.keys(validationService).reduce((p, key) => (
                validationService[key](value)
                    ? p
                    : p.concat(key || false)
            ), []);

            // return keys where validation failed
            // or true if ALL validation is passed
            return errors.length ? errors : true;
        }
    };
};
