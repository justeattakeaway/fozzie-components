import { withA11y } from '@storybook/addon-a11y';
import { NutsIcon, DriverCarIcon } from '@justeattakeaway/pie-icons-vue';
import FormField from '../src/components/FormField.vue';
import SharedArgTypes, { sharedFieldProperties, sharedArgs } from './SharedArgTypes';

export default {
    title: 'Components/Atoms/f-form-field',
    decorators: [withA11y]
};

export const FormFieldComponent = (args, { argTypes }) => ({
    components: {
        FormField,
        NutsIcon,
        DriverCarIcon
    },
    props: Object.keys(argTypes),
    template: `
        <div
        class="u-spacingBottom--large storybook-grid storybook-grid-columns--4 storybook-grid-stack--lessThanWide">
            <form-field
                ${sharedFieldProperties}
                label-text="Checkbox"
                :label-description="labelDescription"
                input-type="checkbox"/>
                <div>
                    <form-field
                        ${sharedFieldProperties}
                        label-text="Radio Grouped - 1"
                        :label-description="labelDescription"
                        input-type="radio"
                        :is-grouped="true"
                        id="radio-1"
                        name="group-name" />
                    <form-field
                        ${sharedFieldProperties}
                        label-text="Radio Grouped - 2"
                        :label-description="labelDescription"
                        input-type="radio"
                        :is-grouped="true"
                        id="radio-2"
                        name="group-name" />
                </div>
            <form-field
                ${sharedFieldProperties}
                label-text="Radio"
                :label-description="labelDescription"
                input-type="radio"
                id="radio-3"
                name="no-group-name" />
            <form-field
                ${sharedFieldProperties}
                label-text="Dropdown"
                :label-description="labelDescription"
                input-type="dropdown"
                field-size="medium"
                :dropdown-options="dropdownOptions"
                maxlength="200"/>
            <form-field
                ${sharedFieldProperties}
                label-text="Dropdown - Icon"
                :label-description="labelDescription"
                input-type="dropdown"
                field-size="medium"
                :dropdown-options="dropdownOptions"
                maxlength="200">
                <template v-slot:icon-leading>
                    <NutsIcon />
                </template>
            </form-field>
            <form-field
                ${sharedFieldProperties}
                label-text="Textarea input"
                :label-description="labelDescription"
                input-type="textarea"
                cols="30"
                rows="7"
                maxlength="200"/>
            <form-field
                ${sharedFieldProperties}
                label-text="Text input - Prefix/Suffix"
                :label-description="labelDescription"
                input-type="text"
                field-size="medium"
                prefix="£"
                suffix="GBP"/>
            <form-field
                ${sharedFieldProperties}
                label-text="Text input"
                :label-description="labelDescription"
                input-type="text"
                field-size="medium"
                maxlength="200"/>
            <form-field
                ${sharedFieldProperties}
                label-text="Text input - Left Icon"
                :label-description="labelDescription"
                input-type="text"
                field-size="small">
                    <template v-slot:icon-leading>
                        <NutsIcon />
                    </template>
            </form-field>
        <form-field
            ${sharedFieldProperties}
            label-text="Text input - Right Icon"
            :label-description="labelDescription"
            input-type="text"
            field-size="medium">
            <template v-slot:icon-trailing>
                <DriverCarIcon />
            </template>
        </form-field>
        <form-field
            ${sharedFieldProperties}
            label-text="Text input - Both Icons"
            :label-description="labelDescription"
            input-type="text"
            field-size="large">
            <template v-slot:icon-leading>
                <NutsIcon />
            </template>
            <template v-slot:icon-trailing>
                <DriverCarIcon />
            </template>
        </form-field>
    </div>`
});


FormFieldComponent.storyName = 'Form Fields';

FormFieldComponent.args = {
    ...sharedArgs,
    shouldShowLabelText: true,
    dropdownOptions:  [
        {
            disabled: true,
            selected: true,
            text: 'Disabled option',
            value: ''
        },
        {
            text: 'As soon as possible',
            value: '2021-01-01T01:00:00.000Z'
        },
        {
            text: 'Today in 5 minutes',
            value: '2021-01-01T01:05:00.000Z'
        }
    ]
};

FormFieldComponent.argTypes = {
    ...SharedArgTypes,
    shouldShowLabelText:
    {
        control: { type: 'boolean' },
        description: 'Select whether to show label text or not'
    },
    labelText: { description: 'not available in this story' },
    assistiveText: { description: 'not available in this story' }
};
