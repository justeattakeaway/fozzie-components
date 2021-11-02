import { withA11y } from '@storybook/addon-a11y';
import VSpinner from '../src/components/Spinner.vue';
import TestComponent from './TestComponent.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y]
};

export const VSpinnerComponent = () => ({
    components: { VSpinner, TestComponent },

    template: '<v-spinner><TestComponent /></v-spinner>'
});

VSpinnerComponent.storyName = 'f-spinner';
