import { withA11y } from '@storybook/addon-a11y';
import FormField from '../src/components/FormField.vue';
import SharedArgTypes from './SharedArgTypes';
import {
    DEFAULT_INPUT_TYPE,
    DEFAULT_FIELD_SIZE,
    VALID_FIELD_SIZES,
    VALID_TEXT_INPUT_TYPES
} from '../src/constants';

export default {
    title: 'Components/Atoms/f-form-field',
    decorators: [withA11y]
};

export const TextInputDefaultComponent = (args, { argTypes }) => ({
    components: { FormField },
    props: Object.keys(argTypes),
    template:
        `<form-field
            :locale="locale"
            :label-text="labelText"
            :input-type="inputType"
            :should-show-label-text="shouldShowLabelText"
            :field-size="fieldSize"
            :has-error="hasError"
            :is-grouped="isGrouped"
            :disabled="isDisabled"
            :placeholder="placeholder"
            maxlength="200"
            :label-details="labelDetails"
            :label-description="labelDescription"
            :assistive-text="assistiveText"/>`
});

TextInputDefaultComponent.storyName = 'Text Input - Default';

TextInputDefaultComponent.argTypes = {
    ...SharedArgTypes,
    isGrouped:
    {
        control: { type: 'boolean' },
        description: 'Select whether to remove the margin between all grouped form fields or not.',
        defaultValue: false
    },
    inputType: {
        control: { type: 'select' },
        options: VALID_TEXT_INPUT_TYPES,
        description: 'Select input type',
        defaultValue: DEFAULT_INPUT_TYPE
    },
    fieldSize: {
        control: { type: 'select' },
        options: VALID_FIELD_SIZES,
        description: 'Choose a field size',
        defaultValue: DEFAULT_FIELD_SIZE
    },
    labelDetails:
    {
        control: { type: 'text' },
        description: 'Enter label details',
        defaultValue: ''
    },
    shouldShowLabelText:
    {
        control: { type: 'boolean' },
        description: 'Select whether to show label text or not',
        defaultValue: true
    },
    placeholder:
    {
        control: { type: 'text' },
        description: 'Enter a placeholder text',
        defaultValue: ''
    },
    prefix:
    {
        control: { type: 'text' },
        description: 'Enter a prefix',
        defaultValue: '£'
    },
    suffix:
    {
        control: { type: 'text' },
        description: 'Enter a suffix',
        defaultValue: 'GBP'
    }
};
