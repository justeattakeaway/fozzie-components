import {
    withKnobs, select, boolean, text
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import FButton from '../src/components/Button.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withKnobs, withA11y]
};

export const ButtonComponent = () => ({
    components: { FButton },
    props: {
        buttonType: {
            default: select('Button Type', ['primary', 'secondary', 'outline', 'ghost', 'link'], 'primary')
        },
        buttonSize: {
            default: select('Button Size', ['xsmall', 'small', 'medium', 'large'], 'medium')
        },
        isFullWidth: {
            default: boolean('isFullWidth', false)
        },
        actionType: {
            default: select('Action Type', ['button', 'submit', 'reset'], 'button')
        },
        href: {
            default: text('href', '')
        },
        isIcon: {
            default: boolean('isIcon', false)
        }
    },
    template: '<f-button :buttonType="buttonType" :buttonSize="buttonSize" :isFullWidth="isFullWidth" :actionType="actionType" :href="href" :isIcon="isIcon">Default Button Text</f-button>'
});

ButtonComponent.storyName = 'f-button';
