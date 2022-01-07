import {
    withKnobs, select, text, boolean
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import FormField from '../src/components/FormField.vue';

export default {
    title: 'Components/Atoms/f-form-field',
    decorators: [withKnobs, withA11y]
};

export const RadioComponent = () => ({
    components: { FormField },
    props: {
        locale: {
            default: select('Locale', ['en-GB', 'en-AU'])
        },
        labelText: {
            default: text('Label Text', 'Radio Label')
        },
        value: {
            default: text('Value', 'radioLabel')
        },
        isDisabled: {
            default: select('isDisabled', [null, 'disabled'])
        },
        hasError: {
            default: boolean('hasError', false)
        },
        isGrouped: {
            default: boolean('isGrouped', false)
        },
        assistiveText: {
            default: text('Assistive Text', '')
        }
    },
    parameters: {
        notes: 'some documentation here'
    },
    template:
        `<form-field
            :label-text="labelText"
            :value="value"
            :has-error="hasError"
            :is-grouped="isGrouped"
            input-type="radio"
            :disabled="isDisabled"
            :assistiveText="assistiveText"/>`
});

RadioComponent.storyName = 'Radio';
