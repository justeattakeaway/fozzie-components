export default {
    locale: {
        control: { type: 'select' },
        options: ['en-GB', 'en-AU'],
        description: 'Choose a locale',
        defaultValue: 'en-GB'
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
        description: 'Select whether has error or not',
        defaultValue: false
    },
    isDisabled: {
        control: { type: 'boolean' },
        description: 'Select whether disabled or not',
        defaultValue: false
    },
    assistiveText: {
        control: { type: 'text' },
        description: 'Enter assistive text',
        defaultValue: ''
    }
};
