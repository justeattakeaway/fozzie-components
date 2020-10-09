import {
    withKnobs, boolean, select, text
} from '@storybook/addon-knobs';
import ErrorMessage from '../src/components/ErrorMessage.vue';
import { withA11y } from '@storybook/addon-a11y';

export default {
    title: 'Components/Atoms',
    decorators: [withKnobs, withA11y]
};

export const ErrorMessageComponent = () => ({
    components: { ErrorMessage },
    props: {},
    template:
        '<error-message>Default error message</error-message>'
});

ErrorMessageComponent.storyName = 'f-error-message';
