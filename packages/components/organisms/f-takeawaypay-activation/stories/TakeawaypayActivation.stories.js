import {
     withKnobs, text
 } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import TakeawaypayActivation from '../src/components/TakeawaypayActivation.vue';

export default {
    title: 'Components/Organisms',
    decorators: [withKnobs, withA11y]
};

export const TakeawaypayActivationComponent = () => ({
    components: { TakeawaypayActivation },
    props: {
        loginUrl: {
            default: text('Login URL', '/account/login')
        },
        registrationUrl: {
            default: text('Registration URL', '/account/register')
        },
        homeUrl: {
            default: text('Home URL', '/account/login')
        }
    },
    template: `
        <takeawaypay-activation
            :login-url="loginUrl"
            :registration-url="registrationUrl"
            :home-url="homeUrl" />`
});

TakeawaypayActivationComponent.storyName = 'f-takeawaypay-activation';
