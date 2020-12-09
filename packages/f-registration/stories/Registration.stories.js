import { withKnobs, select, text, boolean } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import Registration from '../src/components/Registration.vue';

export default {
    title: 'Components/Organisms',
    decorators: [withKnobs, withA11y]
};

export const RegistrationComponent = () => ({
    components: { Registration },
    props: {
        locale: {
            default: select('Locale', ['en-GB', 'en-AU'])
        },
        title: {
            default: text('Title', 'Create Account')
        },
        createAccountUrl: {
            default: text('Create Account URL', '/account/register')
        },
        buttonText: {
            default: text('Button Text', 'Create Account')
        },
        showLoginLink: {
            default: boolean('Show Login Link', true)
        },
        loginUrl: {
            default: text('Login URL', '/account/register')
        }
    },
    parameters: {
        notes: 'some documentation here'
    },
    template: `
        <registration
            :locale="locale"
            :title="title"
            :button-text="buttonText"
            :create-account-url="createAccountUrl"
            :show-login-link="showLoginLink"
            :login-url="loginUrl" />`
});

RegistrationComponent.storyName = 'f-registration';
