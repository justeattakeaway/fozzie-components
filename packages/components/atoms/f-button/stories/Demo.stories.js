import { withA11y } from '@storybook/addon-a11y';
import { WalkingIcon } from '@justeattakeaway/pie-icons-vue';
import {
    VALID_BUTTON_TYPES,
    VALID_BUTTON_SIZES
} from '../src/constants';
import SharedButtonArgTypes from './sharedButtonArgTypes';
import FButton from '../src/components/Button.vue';

export default {
    title: 'Components/Atoms/f-button',
    decorators: [withA11y]
};

export const DemoButtonComponent = (args, { argTypes }) => ({
    components: {
        FButton,
        WalkingIcon
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
                <walking-icon />
            </template>
            Label
            <template #trailing-icon>
                <walking-icon />
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
    actionType: {
        control: { type: 'select', options: ['button', 'submit', 'reset'] },
        description: 'Choose the action type of the button',
        defaultValue: 'button'
    },
    ...SharedButtonArgTypes
};

DemoButtonComponent.storyName = 'Demo';
