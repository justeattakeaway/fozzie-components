import { withA11y } from '@storybook/addon-a11y';
import {
    AllergyNutIcon,
    DriverIcon
} from '@justeat/f-vue-icons';
import FormField from '../src/components/FormField.vue';
import SharedArgTypes from './SharedArgTypes';

export default {
    title: 'Components/Atoms/f-form-field',
    decorators: [withA11y]
};

export const TextInputIconComponent = (args, { argTypes }) => ({
    components: {
        FormField,
        AllergyNutIcon,
        DriverIcon
    },
    props: Object.keys(argTypes),
    template: `
    <div class="wrapper--vertical">
        <form-field
            :locale="locale"
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
        :locale="locale"
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
            :locale="locale"
            label-text="Text input - Both Icons"
            :shouldShowLabelText="shouldShowLabelText"
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

TextInputIconComponent.argTypes = {
    ...SharedArgTypes,
    labelText: { description: 'no control on this story' },
    labelDescription: { description: 'no control on this story' },
    assistiveText: { description: 'no control on this story' },
    shouldShowLabelText:
    {
        control: { type: 'boolean' },
        description: 'Select whether to show label text or not',
        defaultValue: true
    }
};
