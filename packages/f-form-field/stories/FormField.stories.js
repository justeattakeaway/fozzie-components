import {
    withKnobs, select, text, boolean
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import FormField from '../src/components/FormField.vue';
import { VALID_INPUT_TYPES, VALID_LABEL_STYLES } from '../src/constants';

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
            default: text('Label Text', 'First Name')
        },
        inputType: {
            default: select('Input Type', VALID_INPUT_TYPES)
        },
        labelStyle: {
            default: select('Label Style', VALID_LABEL_STYLES)
        },
        hasError: {
            default: boolean('hasError', false)
        }
    },
    parameters: {
        notes: 'some documentation here'
    },
    template:
        '<form-field :locale="locale" :labelText="labelText" :inputType="inputType" :labelStyle="labelStyle" :hasError="hasError" />'
});

FormFieldComponent.storyName = 'f-form-field';
