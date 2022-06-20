export default {
    locale: {
        control: { type: 'select' },
        options: ['en-GB', 'en-AU'],
        description: 'Choose a locale'
    },
    labelText:
    {
        control: { type: 'text' },
        description: 'Enter a label text',
        defaultValue: 'Label Text'
    },
    labelDescription:
    {
        control: { type: 'text' },
        description: 'Enter a label description',
        defaultValue: ''
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
        description: 'Enter assistive text',
        defaultValue: ''
    },
    shouldShowLabelText:
    {
        control: { type: 'boolean' },
        description: 'Select whether to show label text or not'
    },
    isRequired: {
        control: { type: 'boolean' },
        description: 'Is field value required'
    }
};
export const sharedArgs = {
    locale: 'en-GB',
    hasError: false,
    isDisabled: false,
    shouldShowLabelText: true,
    isRequired: true
};

export const sharedFieldProperties = `
    :locale="locale"
    :label-text="labelText"
    :label-description="labelDescription"
    :assistive-text="assistiveText"
    :should-show-label-text="shouldShowLabelText"
    :is-required="isRequired"
    :disabled="isDisabled"
    :has-error="hasError"
`;
