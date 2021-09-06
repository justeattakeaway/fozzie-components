import {
    withKnobs, select, text, boolean
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import FormField from '../src/components/FormField.vue';
import {
    DEFAULT_FIELD_SIZE,
    VALID_FIELD_SIZES,
    VALID_TEXT_INPUT_TYPES
} from '../src/constants';

export default {
    title: 'Components/Atoms/f-form-field',
    decorators: [withKnobs, withA11y]
};

export const TextInputDefaultComponent = () => ({
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
        inputType: {
            default: select('Input Type', VALID_TEXT_INPUT_TYPES)
        },
        isDisabled: {
            default: select('isDisabled', [null, 'disabled'])
        },
        shouldShowLabelText: {
            default: boolean('shouldShowLabelText', true)
        },
        hasError: {
            default: boolean('hasError', false)
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
            :is-grouped="isGrouped"
            :disabled="isDisabled"
            :placeholder="placeholder"
            :maxlength="200"
            :labelDetails="labelDetails"
            :labelDescription="labelDescription"
            :assistiveText="assistiveText"/>`
});

TextInputDefaultComponent.storyName = 'Text Input - Default';
