import { withA11y } from '@storybook/addon-a11y';
import FormField from '../src/components/FormField.vue';
import SharedArgTypes, { sharedFieldProperties } from './SharedArgTypes';
import {
    DEFAULT_FIELD_SIZE,
    VALID_FIELD_SIZES
} from '../src/constants';

export default {
    title: 'Components/Atoms/f-form-field',
    decorators: [withA11y]
};

export const DropdownDefaultComponent = (args, { argTypes }) => ({
    components: { FormField },
    props: Object.keys(argTypes),
    template:
        `<form-field
            ${sharedFieldProperties}
            :label-text="labelText"
            :label-description="labelDescription"
            :label-details="labelDetails"
            :field-size="fieldSize"
            input-type="dropdown"
            :dropdown-options="dropdownOptions"
            :is-grouped="isGrouped"
            :placeholder="placeholder"
            maxlength="200"
            :assistive-text="assistiveText"
        />`
});

DropdownDefaultComponent.storyName = 'Dropdown - Default';

DropdownDefaultComponent.args = {
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

DropdownDefaultComponent.argTypes = {
    ...SharedArgTypes,
    isGrouped:
    {
        control: { type: 'boolean' },
        description: 'Select whether to remove the margin between all grouped form fields or not.',
        defaultValue: false
    },
    labelDetails:
    {
        control: { type: 'text' },
        description: 'Enter label details',
        defaultValue: ''
    },
    fieldSize: {
        control: { type: 'select' },
        options: VALID_FIELD_SIZES,
        description: 'Choose a field size',
        defaultValue: DEFAULT_FIELD_SIZE
    },
    shouldShowLabelText:
    {
        control: { type: 'boolean' },
        description: 'Select whether to show label text or not',
        defaultValue: true
    },
    placeholder:
    {
        control: { type: 'text' },
        description: 'Enter a placeholder text',
        defaultValue: ''
    }
};
