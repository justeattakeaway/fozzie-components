import {
    withKnobs, select, boolean, object
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

export const IconFormFieldComponent = () => ({
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
        dropdownOptions: {
            default: object('Dropdown Options', [
                { text: 'As soon as possible', value: '2021-01-01T01:00:00.000Z' },
                { text: 'Today in 5 minutes', value: '2021-01-01T01:05:00.000Z' }
            ])
        }
    },
    parameters: {
        notes: 'some documentation here'
    },
    template: `
    <div class="wrapper--vertical">
        <form-field
            locale="en-GB"
            label-text="Text input - Left Icon"
            input-type="text"
            field-size="small"
            :has-error="hasError">
                <template v-slot:icon-leading>
                    <AllergyNutIcon />
                </template>
        </form-field>

        <form-field
            locale="en-GB"
            label-text="Text input - Right Icon"
            input-type="text"
            field-size="medium"
            :has-error="hasError">
                <template v-slot:icon-trailing>
                    <DriverIcon />
                </template>
        </form-field>

        <form-field
            locale="en-GB"
            label-text="Text input - Both Icons"
            input-type="text"
            field-size="large"
            :has-error="hasError">
                <template v-slot:icon-leading>
                    <AllergyNutIcon />
                </template>
                <template v-slot:icon-trailing>
                    <DriverIcon />
                </template>
        </form-field>

        <form-field
            locale="en-GB"
            label-text="Dropdown - Left Icon"
            input-type="dropdown"
            field-size="medium"
            :has-error="hasError"
            :dropdown-options="dropdownOptions">
                <template v-slot:icon-leading>
                    <AllergyNutIcon />
                </template>
        </form-field>
    </div>`
});

IconFormFieldComponent.storyName = 'Icon Form Fields';
