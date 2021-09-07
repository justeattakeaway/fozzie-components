import {
    withKnobs, select, boolean
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

export const TextInputIconComponent = () => ({
    components: {
        FormField,
        AllergyNutIcon,
        DriverIcon
    },
    props: {
        locale: {
            default: select('Locale', ['en-GB', 'en-AU'])
        },
        shouldShowLabelText: {
            default: boolean('shouldShowLabelText', true)
        },
        isDisabled: {
            default: select('isDisabled', [null, 'disabled'])
        },
        hasError: {
            default: boolean('hasError', false)
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
            :shouldShowLabelText="shouldShowLabelText"
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
            :shouldShowLabelText="shouldShowLabelText"
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
    </div>`
});

TextInputIconComponent.storyName = 'Text Input - Icon';
