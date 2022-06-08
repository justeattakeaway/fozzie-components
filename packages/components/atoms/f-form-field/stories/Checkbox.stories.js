import { withA11y } from '@storybook/addon-a11y';
import FormField from '../src/components/FormField.vue';
import SharedArgTypes, { sharedFieldProperties } from './SharedArgTypes';

export default {
    title: 'Components/Atoms/f-form-field',
    decorators: [withA11y]
};

export const CheckboxComponent = (args, { argTypes }) => ({
    components: { FormField },
    props: Object.keys(argTypes),
    template:
        `<form-field
            ${sharedFieldProperties}
            :label-text="labelText"
            :label-description="labelDescription"
            :is-grouped="isGrouped"
            input-type="checkbox"
            :assistive-text="assistiveText"
        />`
});

CheckboxComponent.storyName = 'Checkbox';

CheckboxComponent.argTypes = {
    ...SharedArgTypes,
    isGrouped:
    {
        control: { type: 'boolean' },
        description: 'Select whether to remove the margin between all grouped form fields or not.',
        defaultValue: false
    }
};
