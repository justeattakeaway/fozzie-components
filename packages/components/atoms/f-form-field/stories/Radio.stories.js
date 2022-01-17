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
            default: boolean('isDisabled', false)
        },
        hasError: {
            default: boolean('hasError', false)
        },
        isGrouped: {
            default: boolean('isGrouped', false)
        },
        assistiveText: {
            default: text('Assistive Text', 'Change my properties via knobs')
        }
    },
    parameters: {
        notes: 'some documentation here'
    },
    template: `
        <div>
            <form-field
                :assistiveText="assistiveText"
                :disabled="isDisabled"
                :has-error="hasError"
                :is-grouped="isGrouped"
                :label-text="labelText"
                :value="value"
                id="radio-1"
                input-type="radio"
                name="group-name" />

                <form-field
                :disabled="isDisabled"
                :is-grouped="isGrouped"
                id="radio-2"
                input-type="radio"
                label-text="Second label"
                name="group-name"
                value="second-value" />
        </div>
        `
});

RadioComponent.storyName = 'Radio';
