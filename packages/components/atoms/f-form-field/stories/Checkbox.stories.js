import {
    withKnobs, select, text, boolean
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import FormField from '../src/components/FormField.vue';

export default {
    title: 'Components/Atoms/f-form-field',
    decorators: [withKnobs, withA11y]
};

export const CheckboxComponent = () => ({
    components: { FormField },
    props: {
        locale: {
            default: select('Locale', ['en-GB', 'en-AU'])
        },
        labelText: {
            default: text('Label Text', 'Checkbox Label')
        },
        isDisabled: {
            default: select('isDisabled', [null, 'disabled'])
        },
        shouldShowLabelText: {
            default: boolean('shouldShowLabelText', false)
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
        }
    },
    parameters: {
        notes: 'some documentation here'
    },
    template:
        `<form-field
            :label-text="labelText"
            :has-error="hasError"
            :is-grouped="isGrouped"
			:shouldShowLabelText="shouldShowLabelText"
			inputType="checkbox"
            :disabled="isDisabled"
            :labelDetails="labelDetails"
            :labelDescription="labelDescription"
            :assistiveText="assistiveText"/>`
});

CheckboxComponent.storyName = 'Checkbox';
