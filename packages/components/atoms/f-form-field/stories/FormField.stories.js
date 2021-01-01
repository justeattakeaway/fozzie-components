import {
    withKnobs, select, text, boolean, array
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import FormField from '../src/components/FormField.vue';
import { CUSTOM_INPUT_TYPES, VALID_INPUT_TYPES, VALID_LABEL_STYLES } from '../src/constants';

export default {
    title: 'Components/Atoms',
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
            default: array('Dropdown Options', ['As soon as possible', 'Today in 5 minutes'], ',')
        },
        isGrouped: {
            default: boolean('isGrouped', false)
        }
    },
    parameters: {
        notes: 'some documentation here'
    },
    template:
        '<form-field :locale="locale" :labelText="labelText" :inputType="inputType" :labelStyle="labelStyle" :hasError="hasError" :dropdownOptions="dropdownOptions" :isGrouped="isGrouped" />'
});

FormFieldComponent.storyName = 'f-form-field';
