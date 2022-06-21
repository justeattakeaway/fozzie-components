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
                input-type="checkbox"/>
                <div>
                    <form-field
                        ${sharedFieldProperties}
                        label-text="Radio Grouped - 1"
                        input-type="radio"
                        :is-grouped="true"
                        id="radio-1"
                        name="group-name" />
                    <form-field
                        ${sharedFieldProperties}
                        label-text="Radio Grouped - 2"
                        input-type="radio"
                        :is-grouped="true"
                        id="radio-2"
                        name="group-name" />
                </div>
            <form-field
                ${sharedFieldProperties}
                label-text="Radio"
                input-type="radio"
                id="radio-3"
                name="no-group-name" />
            <form-field
                ${sharedFieldProperties}
                label-text="Dropdown"
                input-type="dropdown"
                field-size="medium"
                :dropdown-options="dropdownOptions"
                maxlength="200"/>
            <form-field
                ${sharedFieldProperties}
                label-text="Dropdown - Icon"
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
                input-type="textarea"
                cols="30"
                rows="7"
                maxlength="200"/>
            <form-field
                ${sharedFieldProperties}
                label-text="Text input - Prefix/Suffix"
                input-type="text"
                field-size="medium"
                prefix="£"
                suffix="GBP"/>
            <form-field
                ${sharedFieldProperties}
                label-text="Text input"
                input-type="text"
                field-size="medium"
                maxlength="200"/>
            <form-field
                ${sharedFieldProperties}
                label-text="Text input - Left Icon"
                input-type="text"
                field-size="small">
                    <template v-slot:icon-leading>
                        <NutsIcon />
                    </template>
            </form-field>
        <form-field
            ${sharedFieldProperties}
            label-text="Text input - Right Icon"
            input-type="text"
            field-size="medium">
            <template v-slot:icon-trailing>
                <DriverCarIcon />
            </template>
        </form-field>
        <form-field
            ${sharedFieldProperties}
            label-text="Text input - Both Icons"
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
    labelText: { description: 'not available in this story' },
    assistiveText: { description: 'not available in this story' }
};
