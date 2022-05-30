import { withA11y } from '@storybook/addon-a11y';
import {
    CloseIcon,
    PlusIcon,
    MoreVerticalIcon
} from '@justeattakeaway/pie-icons-vue';
import SharedButtonArgTypes from './sharedButtonArgTypes';
import FButton from '../src/components/Button.vue';
import { VALID_BUTTON_TYPES, VALID_BUTTON_SIZES } from '../src/constants';

export default {
    title: 'Components/Atoms/f-button',
    decorators: [withA11y]
};

export const DemoIconButtonComponent = (args, { argTypes }) => ({
    components: {
        FButton,
        CloseIcon,
        PlusIcon,
        MoreVerticalIcon
    },
    props: Object.keys(argTypes),
    template: `
    <div class="storybook-grid storybook-grid-columns--3 storybook-grid-stack--lessThanWide">
        <f-button
            class="u-spacingRight u-spacingBottom--large"
            :buttonType="buttonType"
            :buttonSize="buttonSize"
            :actionType="actionType"
            :href="href"
            :isIcon="true"
            :isLoading="isLoading">
            <CloseIcon />
        </f-button>
        <f-button
            class="u-spacingRight u-spacingBottom--large"
            :buttonType="buttonType"
            :buttonSize="buttonSize"
            :actionType="actionType"
            :href="href"
            :isIcon="true"
            :isLoading="isLoading">
            <PlusIcon />
        </f-button>
        <f-button
            class="u-spacingRight u-spacingBottom--large"
            :buttonType="buttonType"
            :buttonSize="buttonSize"
            :actionType="actionType"
            :href="href"
            :isIcon="true"
            :isLoading="isLoading">
            <MoreVerticalIcon />
        </f-button>
    </div>`
});

DemoIconButtonComponent.argTypes = {
    buttonType: {
        control: { type: 'select', options: VALID_BUTTON_TYPES.iconButton },
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
    isLoading: SharedButtonArgTypes.isLoading,
    href: SharedButtonArgTypes.href
};


DemoIconButtonComponent.storyName = 'Icon Button Demo';
