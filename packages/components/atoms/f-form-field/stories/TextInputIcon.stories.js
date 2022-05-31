import { withA11y } from '@storybook/addon-a11y';
import { NutsIcon, DriverCarIcon } from '@justeattakeaway/pie-icons-vue';
import FormField from '../src/components/FormField.vue';
import SharedArgTypes from './SharedArgTypes';

export default {
    title: 'Components/Atoms/f-form-field',
    decorators: [withA11y]
};

export const TextInputIconComponent = (args, { argTypes }) => ({
    components: {
        FormField,
        NutsIcon,
        DriverCarIcon
    },
    props: Object.keys(argTypes),
    template: `
    <div class="wrapper--vertical">
        <form-field
            :locale="locale"
            label-text="Text input - Left Icon"
            :should-show-label-text="shouldShowLabelText"
            input-type="text"
            :disabled="isDisabled"
            field-size="small"
            :has-error="hasError">
                <template v-slot:icon-leading>
                    <NutsIcon />
                </template>
        </form-field>

        <form-field
        :locale="locale"
            label-text="Text input - Right Icon"
            :should-show-label-text="shouldShowLabelText"
            input-type="text"
            field-size="medium"
            :disabled="isDisabled"
            :has-error="hasError">
                <template v-slot:icon-trailing>
                    <DriverCarIcon />
                </template>
        </form-field>

        <form-field
            :locale="locale"
            label-text="Text input - Both Icons"
            :should-show-label-text="shouldShowLabelText"
            input-type="text"
            :disabled="isDisabled"
            field-size="large"
            :has-error="hasError">
                <template v-slot:icon-leading>
                    <NutsIcon />
                </template>
                <template v-slot:icon-trailing>
                    <DriverCarIcon />
                </template>
        </form-field>
    </div>`
});

TextInputIconComponent.storyName = 'Text Input - Icon';

TextInputIconComponent.argTypes = {
    ...SharedArgTypes,
    labelText: { description: 'not available in this story' },
    labelDescription: { description: 'not available in this story' },
    assistiveText: { description: 'not available in this story' },
    shouldShowLabelText:
    {
        control: { type: 'boolean' },
        description: 'Select whether to show label text or not',
        defaultValue: true
    }
};
