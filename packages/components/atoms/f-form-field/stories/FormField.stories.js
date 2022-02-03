import {
    withKnobs, select, text, boolean, object
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import FormField from '../src/components/FormField.vue';
import {
    AllergyNutIcon,
    DriverIcon
} from '@justeat/f-vue-icons';
import {
    DEFAULT_FIELD_SIZE,
    VALID_FIELD_SIZES,
    VALID_TEXT_INPUT_TYPES
} from '../src/constants';

export default {
    title: 'Components/Atoms/f-form-field',
    decorators: [withKnobs, withA11y]
};

export const FormFieldComponent = () => ({
    components: { FormField, AllergyNutIcon, DriverIcon },
    props: {
        locale: {
            default: select('Locale', ['en-GB', 'en-AU'])
        },
        labelText: {
            default: text('Label Text', 'Checkbox Label')
        },
        labelDescription: {
            default: text('Label Description', '')
        },
        value: {
            default: text('Value', 'checkboxLabel')
        },
        isDisabled: {
            default: boolean('isDisabled', false)
        },
        hasError: {
            default: boolean('hasError', false)
        },
        isGrouped: {
            default: boolean('isGrouped', false)
        },
        assistiveText: {
            default: text('Assistive Text', '')
        },
        labelText: {
            default: text('Label Text', 'First name')
        },
        fieldSize: {
            default: select('Field Size', VALID_FIELD_SIZES, DEFAULT_FIELD_SIZE)
        },
        shouldShowLabelText: {
            default: boolean('shouldShowLabelText', true)
        },
        dropdownOptions: {
            default: object('Dropdown Options', [
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
            ])
        },
        labelDetails: {
            default: text('Label Details', '')
        },
        placeholder: {
            default: text('Placeholder', '')
        },
        labelText: {
            default: text('Label Text', 'Dropdown Icon - Left')
        },
        labelText: {
            default: text('Label Text', 'Radio Label')
        },
        valueRadio: {
            default: text('Value', 'radioLabel')
        },
        assistiveText: {
            default: text('Assistive Text', 'Change my properties via knobs')
        },
        inputType: {
            default: select('Input Type', VALID_TEXT_INPUT_TYPES)
        },
        prefix: {
            default: text('prefix', '£')
        },
        suffix: {
            default: text('suffix', 'GBP')
        },
    },
    parameters: {
        notes: 'some documentation here'
    },
    template:`
        <div
        class="u-spacingBottom--large storybook-grid storybook-grid-columns--4 storybook-grid-stack--lessThanWide">
            <form-field
                :label-text="labelText"
                :label-description="labelDescription"
                :value="value"
                :has-error="hasError"
                :is-grouped="isGrouped"
                input-type="checkbox"
                :disabled="isDisabled"
                :assistiveText="assistiveText"/>
            <form-field
                :assistiveText="assistiveText"
                :disabled="isDisabled"
                :has-error="hasError"
                :is-grouped="isGrouped"
                :label-text="labelText"
                :valueRadio="value"
                id="radio-1"
                input-type="radio"
                name="group-name" />
            <form-field
                :disabled="isDisabled"
                :is-grouped="isGrouped"
                id="radio-2"
                input-type="radio"
                label-text="Second label"
                name="group-name"
                valueRadio="second-value" />
            <form-field
                :locale="locale"
                :label-text="labelText"
                input-type="dropdown"
                :shouldShowLabelText="shouldShowLabelText"
                :field-size="fieldSize"
                :has-error="hasError"
                :dropdown-options="dropdownOptions"
                :is-grouped="isGrouped"
                :disabled="isDisabled"
                :placeholder="placeholder"
                :maxlength="200"
                :labelDetails="labelDetails"
                :labelDescription="labelDescription"
                :assistiveText="assistiveText"/>
            <form-field
                :locale="locale"
                :label-text="labelText"
                input-type="dropdown"
                :shouldShowLabelText="shouldShowLabelText"
                :field-size="fieldSize"
                :has-error="hasError"
                :is-grouped="isGrouped"
                :disabled="isDisabled"
                :placeholder="placeholder"
                :maxlength="200"
                :labelDetails="labelDetails"
                :labelDescription="labelDescription"
                :assistiveText="assistiveText"
                :dropdown-options="dropdownOptions">
                <template v-slot:icon-leading>
                    <AllergyNutIcon />
                </template>
            </form-field>
            <form-field
                :locale="locale"
                :label-text="labelText"
                input-type="textarea"
                :shouldShowLabelText="shouldShowLabelText"
                :has-error="hasError"
                :is-grouped="isGrouped"
                :disabled="isDisabled"
                :cols="30"
                :placeholder="placeholder"
                :rows="7"
                :maxlength="200"
                :labelDetails="labelDetails"
                :labelDescription="labelDescription"
                :assistiveText="assistiveText"/>
            <form-field
                locale="en-GB"
                label-text="Affixed Field"
                :shouldShowLabelText="shouldShowLabelText"
                :input-type="inputType"
                :field-size="fieldSize"
                :has-error="hasError"
                :disabled="isDisabled"
                :placeholder="placeholder"
                :labelDetails="labelDetails"
                :assistiveText="assistiveText"
                :prefix="prefix"
                :suffix="suffix"/>
            <form-field
                :locale="locale"
                :label-text="labelText"
                :input-type="inputType"
                :shouldShowLabelText="shouldShowLabelText"
                :field-size="fieldSize"
                :has-error="hasError"
                :is-grouped="isGrouped"
                :disabled="isDisabled"
                :placeholder="placeholder"
                :maxlength="200"
                :labelDetails="labelDetails"
                :labelDescription="labelDescription"
                :assistiveText="assistiveText"/>
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


FormFieldComponent.storyName = 'Form Fields';
