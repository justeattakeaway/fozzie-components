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
    required: {
        control: { type: 'boolean' },
        description: 'Is this a required field?'
    },
    isVisuallyRequired: {
        control: { type: 'boolean' },
        description: 'Should there be a visual indicator that this field is required?'
    }
};
export const sharedArgs = {
    locale: 'en-GB',
    hasError: false,
    isDisabled: false,
    shouldShowLabelText: true,
    required: true,
    isVisuallyRequired: true
};

export const sharedFieldProperties = `
    :locale="locale"
    :label-text="labelText"
    :label-description="labelDescription"
    :assistive-text="assistiveText"
    :should-show-label-text="shouldShowLabelText"
    :required="required"
    :is-visually-required="isVisuallyRequired"
    :disabled="isDisabled"
    :has-error="hasError"
`;
