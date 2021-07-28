import {
    withKnobs, select, boolean, text
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import {
    AllergyNutIcon,
    DriverIcon
} from '@justeat/f-vue-icons';
import FormField from '../src/components/FormField.vue';

export default {
    title: 'Components/Atoms/f-form-field',
    decorators: [withKnobs, withA11y]
};

export const AffixedFormFieldComponent = () => ({
    components: {
        FormField,
        AllergyNutIcon,
        DriverIcon
    },
    props: {
        locale: {
            default: select('Locale', ['en-GB', 'en-AU'])
        },
        isDisabled: {
            default: select('isDisabled', [null, 'disabled'])
        },
        hasError: {
            default: boolean('hasError', false)
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
            default: text('prefix', '')
        },
        suffix: {
            default: text('suffix', '')
        }
    },
    parameters: {
        notes: 'some documentation here'
    },
    template:
    `<form-field
        locale="en-GB"
        label-text="Field"
        input-type="text"
        field-size="medium"
        :has-error="hasError"
        :disabled="isDisabled"
        :placeholder="placeholder"
        :labelDetails="labelDetails"
        :assistiveText="assistiveText"
        :prefix="prefix"
        :suffix="suffix"/>`
});

AffixedFormFieldComponent.storyName = 'Affixed Form Fields';
