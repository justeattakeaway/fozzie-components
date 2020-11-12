import {
    withKnobs, select, boolean
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import VueButton from '../src/components/Button.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withKnobs, withA11y]
};

export const ButtonComponent = () => ({
    components: { VueButton },
    props: {
        buttonType: {
            default: select('Button Type', ['primary', 'secondary', 'outline', 'ghost', 'link', 'icon'])
        },
        buttonSize: {
            default: select('Button Size', ['XSmall', 'small', 'medium', 'large'], 'medium')
        },
        fullWidth: {
            default: boolean('fullWidth', false)
        }
    },
    template: '<vue-button :buttonType="buttonType" :buttonSize="buttonSize" :fullWidth="fullWidth">Default Button Text</vue-button>'
});

ButtonComponent.storyName = 'f-button';
