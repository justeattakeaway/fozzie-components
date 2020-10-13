import { withKnobs, select, text } from '@storybook/addon-knobs';
import Registration from '../src/components/Registration.vue';
import { withA11y } from '@storybook/addon-a11y';
import { withTests } from '@storybook/addon-jest';
import results from '../src/components/tests/f-registration-test-results.json';

export default {
    title: 'Components/Organisms',
    decorators: [withKnobs, withA11y, withTests({ results })]
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
        buttonText: {
            default: text('Button Text', 'Create Account')
        }
    },
    parameters: {
        notes: 'some documentation here'
    },
    template: '<registration :locale="locale" :title="title" :button-text="buttonText" />'
});

RegistrationComponent.parameters = {
    jest: [
        'Registration.test.js',
        'f-registration.integration.test.js',
        'RegistrationServiceApi.test.js'
    ],
}

RegistrationComponent.storyName = 'f-registration';
