import { withA11y } from '@storybook/addon-a11y';
import { NutsIcon } from '@justeattakeaway/pie-icons-vue';
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

export const DropdownIconComponent = (args, { argTypes }) => ({
    components: {
        FormField,
        NutsIcon
    },
    props: Object.keys(argTypes),
    template:
        `<form-field
            ${sharedFieldProperties}
            input-type="dropdown"
            :field-size="fieldSize"
            :is-grouped="isGrouped"
            :placeholder="placeholder"
            maxlength="200"
            :label-details="labelDetails"
            :dropdown-options="dropdownOptions">
            <template v-slot:icon-leading>
                <NutsIcon />
            </template>
        </form-field>`
});

DropdownIconComponent.storyName = 'Dropdown - Icon';

DropdownIconComponent.args = {
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

DropdownIconComponent.argTypes = {
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
    placeholder:
    {
        control: { type: 'text' },
        description: 'Enter a placeholder text',
        defaultValue: ''
    }
};
