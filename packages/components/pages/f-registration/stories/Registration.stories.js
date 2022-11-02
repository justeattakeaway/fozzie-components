import { withA11y } from '@storybook/addon-a11y';
import Registration from '../src/components/Registration.vue';
import RegistrationMock from '../src/mocks/registrationMock';

export default {
    title: 'Components/Pages',
    decorators: [withA11y]
};

const createAccountUrl = '/account/register';
RegistrationMock.setupEmailInUse(createAccountUrl);
RegistrationMock.passThroughAny();


export const RegistrationComponent = (args, { argTypes }) => ({
    components: { Registration },
    props: Object.keys(argTypes),
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

RegistrationComponent.argTypes = {
    locale: {
        control: { type: 'select' },
        description: 'Select a tenant',
        options: ['en-GB', 'en-AU', 'en-IE', 'en-NZ', 'es-ES', 'it-IT'],
        defaultValue: 'en-GB'
    },
    title: {
        control: { type: 'text' },
        description: 'Title Text',
        defaultValue: 'Create Account'
    },
    createAccountUrl: {
        control: { type: 'text' },
        description: 'Create Account URL',
        defaultValue: '/account/register'
    },
    buttonText: {
        control: { type: 'text' },
        description: 'Button Text',
        defaultValue: 'Create Account'
    },
    showLoginLink: {
        control: { type: 'boolean' },
        description: 'Show login link',
        defaultValue: true
    },
    loginUrl: {
        control: { type: 'text' },
        description: 'Login URL',
        defaultValue: '/account/login'
    }
};

RegistrationComponent.storyName = 'f-registration';
