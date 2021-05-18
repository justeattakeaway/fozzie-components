import {
    withKnobs, select, text, boolean, object
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
            :has-error="hasError"
            :dropdown-options="dropdownOptions"
            :is-grouped="isGrouped"
            :cols="30"
            :rows="7"
            :maxlength="200"
            :has-input-description="hasInputDescription">
            <div>
                Here is a bit more text to show
            </div>
        </form-field>`
});

FormFieldComponent.storyName = 'f-form-field';
