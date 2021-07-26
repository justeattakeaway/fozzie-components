import {
    withKnobs, select, text, boolean, object
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import FormField from '../src/components/FormField.vue';
import {
    CUSTOM_INPUT_TYPES,
    DEFAULT_FIELD_SIZE,
    VALID_INPUT_TYPES,
    VALID_FIELD_SIZES,
    VALID_LABEL_STYLES
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
        labelStyle: {
            default: select('Label Style', VALID_LABEL_STYLES)
        },
        hasError: {
            default: boolean('hasError', false)
        },
        dropdownOptions: {
            default: object('Dropdown Options', [
                { text: 'As soon as possible', value: '2021-01-01T01:00:00.000Z' },
                { text: 'Today in 5 minutes', value: '2021-01-01T01:05:00.000Z' }
            ])
        },
        isGrouped: {
            default: boolean('isGrouped', false)
        },
        hasInputDescription: {
            default: boolean('hasExtraLabelText', false)
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
            :label-style="labelStyle"
            :field-size="fieldSize"
            :has-error="hasError"
            :dropdown-options="dropdownOptions"
            :is-grouped="isGrouped"
            :disabled="isDisabled"
            :cols="30"
            :rows="7"
            :maxlength="200"
            :has-input-description="hasInputDescription">
                Here is a bit more text to show
        </form-field>`
});

FormFieldComponent.storyName = 'f-form-field';
