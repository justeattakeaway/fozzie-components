import {
    withKnobs, select, boolean, text
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import FormField from '../src/components/FormField.vue';
import { DEFAULT_FIELD_SIZE, VALID_TEXT_INPUT_TYPES, VALID_FIELD_SIZES } from '../src/constants';

export default {
    title: 'Components/Atoms/f-form-field',
    decorators: [withKnobs, withA11y]
};

export const TextInputAffixedComponent = () => ({
    components: {
        FormField
    },
    props: {
        locale: {
            default: select('Locale', ['en-GB', 'en-AU'])
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
        hasError: {
            default: boolean('hasError', false)
        },
        shouldShowLabelText: {
            default: boolean('shouldShowLabelText', true)
        },
        labelDetails: {
            default: text('Label Details', '')
        },
        assistiveText: {
            default: text('Assistive Text', '')
        },
        placeholder: {
            default: text('Placeholder', '')
        },
        prefix: {
            default: text('prefix', '£')
        },
        suffix: {
            default: text('suffix', 'GBP')
        }
    },
    parameters: {
        notes: 'some documentation here'
    },
    template:
    `<form-field
        locale="en-GB"
        label-text="Affixed Field"
        :shouldShowLabelText="shouldShowLabelText"
        :input-type="inputType"
        :field-size="fieldSize"
        :has-error="hasError"
        :disabled="isDisabled"
        :placeholder="placeholder"
        :labelDetails="labelDetails"
        :assistiveText="assistiveText"
        :prefix="prefix"
        :suffix="suffix"/>`
});

TextInputAffixedComponent.storyName = 'Text Input - Affixed';
