import {
    withKnobs, select, text, boolean, object
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import FormField from '../src/components/FormField.vue';
import {
    CUSTOM_INPUT_TYPES,
    DEFAULT_FIELD_SIZE,
    VALID_INPUT_TYPES,
    VALID_FIELD_SIZES
} from '../src/constants';

export default {
    title: 'Components/Atoms/f-form-field',
    decorators: [withKnobs, withA11y]
};

export const FormFieldComponent = () => ({
    components: { FormField },
    props: {
        locale: {
            default: select('Locale', ['en-GB', 'en-AU'])
        },
        labelText: {
            default: text('Label Text', 'First name')
        },
        fieldSize: {
            default: select('Field Size', VALID_FIELD_SIZES, DEFAULT_FIELD_SIZE)
        },
        isDisabled: {
            default: select('isDisabled', [null, 'disabled'])
        },
        inputType: {
            default: select('Input Type', VALID_INPUT_TYPES.concat(CUSTOM_INPUT_TYPES))
        },
        shouldShowLabelText: {
            default: boolean('shouldShowLabelText', true)
        },
        hasError: {
            default: boolean('hasError', false)
        },
        dropdownOptions: {
            default: object('Dropdown Options', [
                {
                    disabled: true,
                    selected: true,
                    text: 'Disabled option',
                    value: ''
                },
                {
                    text: 'As soon as possible',
                    value: '2021-01-01T01:00:00.000Z'
                },
                {
                    text: 'Today in 5 minutes',
                    value: '2021-01-01T01:05:00.000Z'
                }
            ])
        },
        isGrouped: {
            default: boolean('isGrouped', false)
        },
        labelDescription: {
            default: text('Label Description', '')
        },
        labelDetails: {
            default: text('Label Details', '')
        },
        assistiveText: {
            default: text('Assistive Text', '')
        },
        placeholder: {
            default: text('Placeholder', '')
        }
    },
    parameters: {
        notes: 'some documentation here'
    },
    template:
        `<form-field
            :locale="locale"
            :label-text="labelText"
            :input-type="inputType"
            :shouldShowLabelText="shouldShowLabelText"
            :field-size="fieldSize"
            :has-error="hasError"
            :dropdown-options="dropdownOptions"
            :is-grouped="isGrouped"
            :disabled="isDisabled"
            :cols="30"
            :placeholder="placeholder"
            :rows="7"
            :maxlength="200"
            :labelDetails="labelDetails"
            :labelDescription="labelDescription"
            :assistiveText="assistiveText"/>`
});

FormFieldComponent.storyName = 'Form Field';
