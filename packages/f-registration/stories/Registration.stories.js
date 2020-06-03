import { withKnobs, select, text } from '@storybook/addon-knobs';
import Registration from '../src/components/Registration.vue';

export default {
    title: 'Components',
    decorators: [withKnobs]
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

RegistrationComponent.story = {
    name: 'f-registration'
};
