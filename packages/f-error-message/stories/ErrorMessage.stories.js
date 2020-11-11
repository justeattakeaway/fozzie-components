import {
    withKnobs, boolean, select, text
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import ErrorMessage from '../src/components/ErrorMessage.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withKnobs, withA11y]
};

export const ErrorMessageComponent = () => ({
    components: { ErrorMessage },
    props: {},
    template:
        '<error-message>Your phone number should be at least 10 characters long and shouldn\'t contain letters or special characters</error-message>'
});

ErrorMessageComponent.storyName = 'f-error-message';
