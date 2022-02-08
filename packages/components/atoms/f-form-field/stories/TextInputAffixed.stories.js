import { withA11y } from '@storybook/addon-a11y';
import FormField from '../src/components/FormField.vue';
import SharedArgTypes from './SharedArgTypes';
import {
    DEFAULT_INPUT_TYPE,
    DEFAULT_FIELD_SIZE,
    VALID_TEXT_INPUT_TYPES,
    VALID_FIELD_SIZES
} from '../src/constants';

export default {
    title: 'Components/Atoms/f-form-field',
    decorators: [withA11y]
};

export const TextInputAffixedComponent = (args, { argTypes }) => ({
    components: { FormField },
    props: Object.keys(argTypes),
    template:
    `<form-field
        :locale="locale"
        :label-text="labelText"
        :should-show-label-text="shouldShowLabelText"
        :input-type="inputType"
        :field-size="fieldSize"
        :has-error="hasError"
        :disabled="isDisabled"
        :placeholder="placeholder"
        :label-details="labelDetails"
        :assistive-text="assistiveText"
        :prefix="prefix"
        :suffix="suffix"
    />`
});

TextInputAffixedComponent.storyName = 'Text Input - Affixed';

TextInputAffixedComponent.argTypes = {
    ...SharedArgTypes,
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
