import { withA11y } from '@storybook/addon-a11y';
import FormField from '../src/components/FormField.vue';
import SharedArgTypes from './SharedArgTypes';
import {
    VALID_TEXT_INPUT_TYPES
} from '../src/constants';

export default {
    title: 'Components/Atoms/f-form-field',
    decorators: [withA11y]
};

export const TextareaComponent = (args, { argTypes }) => ({
    components: { FormField },
    props: Object.keys(argTypes),
    template:
        `<form-field
            :locale="locale"
            :label-text="labelText"
            :input-type="inputType"
            :should-show-label-text="shouldShowLabelText"
            :has-error="hasError"
            :is-grouped="isGrouped"
            :disabled="isDisabled"
            cols="30"
            :placeholder="placeholder"
            rows="7"
            maxlength="200"
            :label-details="labelDetails"
            :label-description="labelDescription"
            :assistive-text="assistiveText"
        />`
});

TextareaComponent.storyName = 'Textarea';

TextareaComponent.argTypes = {
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
        defaultValue: 'textarea'
    },
    labelDetails:
    {
        control: { type: 'text' },
        description: 'Enter a label details',
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
    }
};
