const isValidNumberOfOptions = options => (options.length > 1 && options.length < 5);
const areOptionTypesValid = options => {
    let selectedCount = 0;

    return options.every(option => {
        if (typeof option !== 'object') {
            return false;
        }

        if (typeof option.label !== 'string' || !option.label) {
            return false;
        }

        if (option.iconName && typeof option.iconName !== 'string') {
            return false;
        }

        if (option.disabled && typeof option.disabled !== 'boolean') {
            return false;
        }

        if (option.selected) {
            selectedCount++;
            if (typeof option.selected !== 'boolean' || selectedCount > 1) {
                return false;
            }
        }

        return true;
    });
};

// eslint-disable-next-line import/prefer-default-export
export const validateOptions = value => {
    const isValid = isValidNumberOfOptions(value) && areOptionTypesValid(value);

    return isValid;
};
