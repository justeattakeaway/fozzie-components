import {
    withKnobs, select, text, boolean
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import FormSelectionControl from '../src/components/FormSelectionControl.vue';

export default {
    title: 'Components/Atoms/f-form-field',
    decorators: [withKnobs, withA11y]
};

export const CheckboxComponent = () => ({
    components: { FormSelectionControl },
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
        }
    },
    parameters: {
        notes: 'some documentation here'
    },
    template:
        `<form-selection-control
            :label-text="labelText"
            :has-error="hasError"
            :is-grouped="isGrouped"
            :disabled="isDisabled"
            :labelDetails="labelDetails"
            :labelDescription="labelDescription"
            :assistiveText="assistiveText"/>`
});

CheckboxComponent.storyName = 'Checkbox';
