const kebabCase = fieldName => fieldName.replace(/([a-z0-9]|(?=[A-Z]))([A-Z1-9])/g, '$1-$2').toLowerCase();

const inputType = fieldName => {
    const inputTypes = {
        mobileNumber: 'tel',
        email: 'email',
        default: 'text'
    };

    return inputTypes[fieldName] || inputTypes.default;
};

const ariaLabel = value => [...value].join(' ');

const labels = fieldData => {
    const fieldKebabCase = kebabCase(fieldData.name);

    return {
        ...fieldData.translations,
        name: `${fieldKebabCase}`,
        errorName: `${fieldKebabCase}-error`,
        emptyError: `error-${fieldKebabCase}-empty`,
        invalidError: `error-${fieldKebabCase}-invalid`
    };
};

const fieldProps = fieldData => {
    const fieldLabels = labels(fieldData);

    return {
        name: fieldLabels.name,
        value: fieldData.value,
        'label-text': fieldLabels.label,
        'input-type': inputType(fieldData.name),
        'max-length': fieldData.maxLength || null,
        ...(inputType(fieldData.name) === 'mobileNumber' ? {
            'aria-label': ariaLabel
        } : {})
    };
};

const errorProps = (messages, errorType) => ({
    'has-error': true,
    'aria-invalid': true,
    'aria-describedby': messages[errorType]
});

const errorMessageProps = (fieldData, errorType) => {
    const fieldLabels = labels(fieldData);
    console.log(fieldLabels, errorType);

    const a = {
        props: {
            id: fieldLabels.errorName,
            'data-test-id': fieldLabels[`${errorType}Error`]
        },
        text: fieldLabels.validationMessages[errorType]
    };
    console.log(a);
    return a;
};

const createFormField = fieldData => ({
    labels: labels(fieldData),
    fieldProps: fieldProps(fieldData)
});

const createFormFieldError = (fieldData, errorType) => ({
    labels: labels(fieldData),
    fieldProps: {
        ...fieldProps(fieldData, errorType),
        ...errorProps(fieldData, errorType)
    }
});

export {
    createFormField,
    createFormFieldError,
    errorMessageProps
};
