import LocationFactory from './factory';

export default (options = {}) => {
    const {
        validation = {}
    } = options;

    const blankService = () => ({});
    const service = LocationFactory(blankService);

    return {
        get validation () {
            return validation;
        },
        /* eslint-disable-next-line no-empty-function */
        set validation (value) { },
        clientInit (dependentApiPromise) {
            if (service.clientInit !== undefined) {
                service.clientInit(dependentApiPromise);
            }
        },
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
        }
    };
};
