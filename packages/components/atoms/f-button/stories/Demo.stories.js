import { withA11y } from '@storybook/addon-a11y';
import { CollectionIcon } from '@justeat/f-vue-icons';
import {
    VALID_BUTTON_TYPES,
    VALID_BUTTON_SIZES,
    VALID_BUTTON_ICON_POSITION } from '../src/constants';
import FButton from '../src/components/Button.vue';

export default {
    title: 'Components/Atoms/f-button',
    decorators: [withA11y]
};

export const DemoButtonComponent = (args, { argTypes }) => ({
    components: {
        FButton,
        CollectionIcon
    },
    props: Object.keys(argTypes),
    template: `
        <f-button
            :buttonType="buttonType"
            :buttonSize="buttonSize"
            :disabled="disabled"
            :isFullWidth="isFullWidth"
            :actionType="actionType"
            :href="href"
            :isIcon="false"
            :isLoading="isLoading"
            :hasIcon="hasIcon">
            <template #leading-icon>
                <collection-icon />
            </template>
            Label
            <template #trailing-icon>
                <collection-icon />
            </template>
        </f-button>`
});

DemoButtonComponent.argTypes = {
    buttonType: {
        control: { type: 'select', options: VALID_BUTTON_TYPES.button },
        description: 'Choose the button type',
        defaultValue: 'primary'
    },
    buttonSize: {
        control: { type: 'select', options: VALID_BUTTON_SIZES },
        description: 'Choose the button size',
        defaultValue: 'medium'
    },
    disabled: {
        control: { type: 'boolean' },
        defaultValue: false
    },
    isFullWidth: {
        control: { type: 'boolean' },
        description: 'Button will take the whole free space of the container',
        defaultValue: false
    },
    isLoading: {
        control: { type: 'boolean' },
        description: 'Spinner instead of button text',
        defaultValue: false
    },
    actionType: {
        control: { type: 'select', options: ['button', 'submit', 'reset'] },
        description: 'Choose the action type of the button',
        defaultValue: 'button'
    },
    hasIcon: {
        control: { type: 'select', options: VALID_BUTTON_ICON_POSITION },
        description: 'Adds icon to the button text',
        defaultValue: false
    },
    href: {
        control: { type: 'text' },
        description: 'Should be presented for the button to become a link <a> element',
        defaultValue: ''
    }
};

DemoButtonComponent.storyName = 'Demo';
