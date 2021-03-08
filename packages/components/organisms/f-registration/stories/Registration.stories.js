import { withKnobs, select, text, boolean } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import Registration from '../src/components/Registration.vue';
import RegistrationMock from '../src/mocks/registrationMock';

export default {
    title: 'Components/Organisms',
    decorators: [withKnobs, withA11y]
};

const createAccountUrl = '/account/register';
RegistrationMock.setupEmailInUse(createAccountUrl)
RegistrationMock.passThroughAny();


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
            default: text('Create Account URL', createAccountUrl)
        },
        buttonText: {
            default: text('Button Text', 'Create Account')
        },
        showLoginLink: {
            default: boolean('Show Login Link', true)
        },
        loginUrl: {
            default: text('Login URL', '/account/login')
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
