import {
    withKnobs,
    select,
    boolean,
    text
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { EyeglassIcon } from '@justeat/f-vue-icons';
import {
    VALID_BUTTON_TYPES,
    VALID_BUTTON_SIZES,
    VALID_BUTTON_ICON_POSITION
} from '../src/constants';
import FButton from '../src/components/Button.vue';

export default {
    title: 'Components/Atoms/f-button',
    decorators: [withKnobs, withA11y]
};

export const ButtonComponent = () => ({
    components: {
        FButton,
        EyeglassIcon
    },

    props: {
        buttonType: {
            default: select('Button Type', VALID_BUTTON_TYPES.button, 'primary')
        },

        buttonSize: {
            default: select('Button Size', VALID_BUTTON_SIZES, 'medium')
        },

        disabled: {
            default: boolean('disabled', false)
        },

        isFullWidth: {
            default: boolean('isFullWidth', false)
        },

        isLoading: {
            default: boolean('isLoading', false)
        },

        actionType: {
            default: select('Action Type', ['button', 'submit', 'reset'], 'button')
        },

        href: {
            default: text('href', '')
        },

        hasIcon: {
            default: select('Add icon to the button text', VALID_BUTTON_ICON_POSITION, false)
        }
    },

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
            <template v-if="hasIcon ==='leading'" #leading-icon>
                <eyeglass-icon />
            </template>
            Label
            <template v-if="hasIcon ==='trailing'" #trailing-icon>
                <eyeglass-icon />
            </template>
            </f-button>`
});

ButtonComponent.storyName = 'Button';
