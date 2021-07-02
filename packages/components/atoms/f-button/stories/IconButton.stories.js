import {
    withKnobs,
    boolean,
    select,
    text
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import FButton from '../src/components/Button.vue';
import {
    CrossIcon,
    PlusIcon,
    MoreVerticalIcon
} from '@justeat/f-vue-icons';

export default {
    title: 'Components/Atoms/f-button',
    decorators: [withKnobs, withA11y]
};

export const IconButtonComponent = () => ({
    components: {
        FButton,
        CrossIcon,
        PlusIcon,
        MoreVerticalIcon
    },

    props: {
        buttonType: {
            default: select('Button Type', ['primary', 'secondary', 'outline', 'ghost', 'link'], 'primary')
        },

        buttonSize: {
            default: select('Button Size', ['xsmall', 'small', 'medium', 'large'], 'medium')
        },

        isLoading: {
            default: boolean('isLoading', false)
        },

        actionType: {
            default: select('Action Type', ['button', 'submit', 'reset'], 'button')
        },

        href: {
            default: text('href', '')
        }
    },

    template: `
    <div class="wrapper--horizontal">
        <f-button
            :buttonType="buttonType"
            :buttonSize="buttonSize"
            :actionType="actionType"
            :href="href"
            :isIcon="true"
            :isLoading="isLoading">
            <CrossIcon />
        </f-button>

        <f-button
            :buttonType="buttonType"
            :buttonSize="buttonSize"
            :actionType="actionType"
            :href="href"
            :isIcon="true"
            :isLoading="isLoading">
            <PlusIcon />
        </f-button>

        <f-button
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

IconButtonComponent.storyName = 'Icon Button';
