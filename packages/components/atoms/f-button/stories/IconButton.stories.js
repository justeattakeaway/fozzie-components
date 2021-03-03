import {
    withKnobs, select, boolean, text
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import FButton from '../src/components/Button.vue';
import { CrossIcon, PlusIcon,  MoreVerticalIcon} from '../../../../tools/f-vue-icons/dist/f-vue-icons.js';

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
        actionType: {
            default: select('Action Type', ['button', 'submit', 'reset'], 'button')
        },
        href: {
            default: text('href', '')
        }
    },
    template: `
    <div style="display: flex; width: 300px; justify-content: space-between">
        <f-button
            :buttonType="buttonType"
            :buttonSize="buttonSize"
            :actionType="actionType"
            :href="href"
            :isIcon="true">
                <CrossIcon />
        </f-button>

        <f-button
            :buttonType="buttonType"
            :buttonSize="buttonSize"
            :actionType="actionType"
            :href="href"
            :isIcon="true">
                <PlusIcon />
        </f-button>

        <f-button
            :buttonType="buttonType"
            :buttonSize="buttonSize"
            :actionType="actionType"
            :href="href"
            :isIcon="true">
                <MoreVerticalIcon />
        </f-button>
    </div>`
});

IconButtonComponent.storyName = 'f-button--icon';
