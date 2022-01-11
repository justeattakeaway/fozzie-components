export const FORM_EVENTS = {
    fieldUpdated: 'updated',
    submitting: 'form-submitting'
};

export const PROP_VALIDATION_MESSAGES = {
    requiredFormFields: '`formFields` Not found in `formData` prop, please add an array of `formFields`',
    invalidFormFields: '`formFields` are invalid, please add an array of formFields',
    requiredNameProperty: 'Each field in `formFields` should contain "name" property',
    requiredTranslationsProperty: 'Each field in `formFields` should contain "translations" property',
    requiredLabelProperty: 'Each field in `formFields` should contain "translations.label" property'
};

export const DEFAULT_BUTTON_TEXT = 'Submit';
