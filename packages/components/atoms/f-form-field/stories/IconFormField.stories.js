import {
    withKnobs, select, boolean, object
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import {
    AllergyNutIcon,
    DriverIcon
} from '@justeat/f-vue-icons';
import FormField from '../src/components/FormField.vue';
import {
    DEFAULT_FIELD_SIZE,
    VALID_FIELD_SIZES,
    VALID_ICON_INPUT_TYPES
} from '../src/constants';

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
        fieldSize: {
            default: select('Field Size', VALID_FIELD_SIZES, DEFAULT_FIELD_SIZE)
        },
        isDisabled: {
            default: select('isDisabled', [null, 'disabled'])
        },
        inputType: {
            default: select('Input Type', VALID_ICON_INPUT_TYPES)
        },
        hasError: {
            default: boolean('hasError', false)
        },
        dropdownOptions: {
            default: object('Dropdown Options', [
                { text: 'As soon as possibleAs soon as possibleAs soon as possibleAs soon as possibleAs soon as possible', value: '2021-01-01T01:00:00.000Z' },
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
            label-text="Left Icon"
            :input-type="inputType"
            :field-size="fieldSize"
            :has-error="hasError"
            :dropdown-options="dropdownOptions">
                <template v-slot:icon-left>
                    <AllergyNutIcon />
                </template>
        </form-field>

        <form-field
            locale="en-GB"
            label-text="Right Icon"
            :input-type="inputType"
            :field-size="fieldSize"
            :has-error="hasError"
            :dropdown-options="dropdownOptions">
                <template v-slot:icon-right>
                    <DriverIcon />
                </template>
        </form-field>

        <form-field
            locale="en-GB"
            label-text="Both Icons"
            :input-type="inputType"
            :field-size="fieldSize"
            :has-error="hasError"
            :dropdown-options="dropdownOptions">
                <template v-slot:icon-left>
                    <AllergyNutIcon />
                </template>
                <template v-slot:icon-right>
                    <DriverIcon />
                </template>
        </form-field>
    </div>`
});

IconFormFieldComponent.storyName = 'Icon Form Fields';
