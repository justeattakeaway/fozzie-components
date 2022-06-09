export default {
    locale: {
        control: { type: 'select' },
        options: ['en-GB', 'en-AU'],
        description: 'Choose a locale'
    },
    labelText:
    {
        control: { type: 'text' },
        description: 'Enter a label text'
    },
    labelDescription:
    {
        control: { type: 'text' },
        description: 'Enter a label description'
    },
    hasError:
    {
        control: { type: 'boolean' },
        description: 'Select whether has error or not'
    },
    isDisabled: {
        control: { type: 'boolean' },
        description: 'Select whether disabled or not'
    },
    assistiveText: {
        control: { type: 'text' },
        description: 'Enter assistive text'
    },
    isRequired: {
        control: { type: 'boolean' },
        description: 'Is field value required'
    }
};
export const sharedArgs = {
    locale:  'en-GB',
    labelText: 'Label Text',
    labelDescription: '',
    hasError: false,
    isDisabled:  false,
    assistiveText: '',
    isRequired:  true
};

export const sharedFieldProperties = `
    :locale="locale"
    :should-show-label-text="shouldShowLabelText"
    :is-required="isRequired"
    :disabled="isDisabled"
    :has-error="hasError"
`;
