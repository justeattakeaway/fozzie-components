import { withA11y } from '@storybook/addon-a11y';
import FormField from '../src/components/FormField.vue';
import SharedArgTypes, { sharedFieldProperties } from './SharedArgTypes';

export default {
    title: 'Components/Atoms/f-form-field',
    decorators: [withA11y]
};

export const RadioComponent = (args, { argTypes }) => ({
    components: { FormField },
    props: Object.keys(argTypes),
    template: `
        <div>
            <form-field
                ${sharedFieldProperties}
                :is-grouped="isGrouped"
                id="radio-1"
                input-type="radio"
                name="group-name" />

                <form-field
                ${sharedFieldProperties}
                :is-grouped="isGrouped"
                id="radio-2"
                input-type="radio"
                label-text="Second label"
                name="group-name"/>
        </div>
        `
});

RadioComponent.storyName = 'Radio';

RadioComponent.argTypes = {
    ...SharedArgTypes,
    isGrouped:
    {
        control: { type: 'boolean' },
        description: 'Select whether to remove the margin between all grouped form fields or not.',
        defaultValue: false
    },
    value: {
        control: { type: 'text' },
        defaultValue: 'radioLabel'
    }
};
