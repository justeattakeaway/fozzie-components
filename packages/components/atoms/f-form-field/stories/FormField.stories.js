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

export const FormFieldComponent = (args, { argTypes }) => ({
    components: {
        FormField,
        AllergyNutIcon,
        DriverIcon
    },
    props: Object.keys(argTypes),
    template: `
        <div
        class="u-spacingBottom--large storybook-grid storybook-grid-columns--4 storybook-grid-stack--lessThanWide">
            <form-field
                :disabled="isDisabled"
                :has-error="hasError"
                label-text="Checkbox"
                :label-description="labelDescription"
                input-type="checkbox"
                value="value-text"/>
                <div>
                    <form-field
                        :disabled="isDisabled"
                        :has-error="hasError"
                        label-text="Radio Grouped - 1"
                        :label-description="labelDescription"
                        input-type="radio"
                        :is-grouped="true"
                        id="radio-1"
                        name="group-name" />
                    <form-field
                        :disabled="isDisabled"
                        :has-error="hasError"
                        label-text="Radio Grouped - 2"
                        :label-description="labelDescription"
                        input-type="radio"
                        :is-grouped="true"
                        id="radio-2"
                        name="group-name" />
                </div>
            <form-field
                :disabled="isDisabled"
                :has-error="hasError"
                label-text="Radio"
                :label-description="labelDescription"
                input-type="radio"
                id="radio-3"
                name="no-group-name" />
            <form-field
                :disabled="isDisabled"
                :has-error="hasError"
                :locale="locale"
                label-text="Dropdown"
                :label-description="labelDescription"
                input-type="dropdown"
                :should-show-label-text="shouldShowLabelText"
                field-size="medium"
                :dropdown-options="dropdownOptions"
                placeholder=""
                max-length="200"
                label-details=""/>
            <form-field
                :disabled="isDisabled"
                :has-error="hasError"
                :locale="locale"
                label-text="Dropdown - Icon"
                :label-description="labelDescription"
                input-type="dropdown"
                :should-show-label-text="shouldShowLabelText"
                field-size="medium"
                :dropdown-options="dropdownOptions"
                placeholder=""
                max-length="200"
                label-dDetails="">
                <template v-slot:icon-leading>
                    <AllergyNutIcon />
                </template>
            </form-field>
            <form-field
                :disabled="isDisabled"
                :has-error="hasError"
                :locale="locale"
                label-text="Textarea input"
                :label-description="labelDescription"
                input-type="textarea"
                :should-show-label-text="shouldShowLabelText"
                cols="30"
                placeholder=""
                rows="7"
                max-length="200"
                labelDetails=""/>
            <form-field
                :disabled="isDisabled"
                :has-error="hasError"
                :locale="locale"
                label-text="Text input - Prefix/Suffix"
                :label-description="labelDescription"
                input-type="text"
                :should-show-label-text="shouldShowLabelText"
                field-size="medium"
                placeholder=""
                label-details=""
                prefix="£"
                suffix="GBP"/>
            <form-field
                :disabled="isDisabled"
                :has-error="hasError"
                :locale="locale"
                label-text="Text input"
                :label-description="labelDescription"
                input-type="text"
                :should-show-label-text="shouldShowLabelText"
                field-size="medium"
                placeholder=""
                max-length="200"
                label-details=""/>
            <form-field
                :disabled="isDisabled"
                :has-error="hasError"
                :locale="locale"
                label-text="Text input - Left Icon"
                :label-description="labelDescription"
                input-type="text"
                :should-show-label-text="shouldShowLabelText"
                field-size="small">
                    <template v-slot:icon-leading>
                        <AllergyNutIcon />
                    </template>
            </form-field>
        <form-field
            :disabled="isDisabled"
            :has-error="hasError"
            :locale="locale"
            label-text="Text input - Right Icon"
            :label-description="labelDescription"
            input-type="text"
            :should-show-label-text="shouldShowLabelText"
            field-size="medium">
            <template v-slot:icon-trailing>
                <DriverIcon />
            </template>
        </form-field>
        <form-field
            :disabled="isDisabled"
            :has-error="hasError"
            :locale="locale"
            label-text="Text input - Both Icons"
            :label-description="labelDescription"
            input-type="text"
            field-size="large">
            <template v-slot:icon-leading>
                <AllergyNutIcon />
            </template>
            <template v-slot:icon-trailing>
                <DriverIcon />
            </template>
        </form-field>
    </div>`
});


FormFieldComponent.storyName = 'Form Fields';

FormFieldComponent.args = {
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
        description: 'Select whether to show label text or not',
        defaultValue: true
    },
    labelText: { description: 'not available in this story' },
    assistiveText: { description: 'not available in this story' }
};
