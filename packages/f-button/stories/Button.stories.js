import {
    withKnobs, select, boolean
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
            default: select('Button Type', ['primary', 'secondary', 'outline', 'ghost', 'link', 'icon'], 'primary')
        },
        buttonSize: {
            default: select('Button Size', ['xsmall', 'small', 'medium', 'large'], 'medium')
        },
        isFullWidth: {
            default: boolean('isFullWidth', false)
        }
    },
    template: '<f-button :buttonType="buttonType" :buttonSize="buttonSize" :isFullWidth="isFullWidth">Default Button Text</f-button>'
});

ButtonComponent.storyName = 'f-button';
