import { withA11y } from '@storybook/addon-a11y';
import VSpinner from '../src/components/Spinner.vue';
import TestComponent from './TestComponent.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y]
};

export const VSpinnerComponent = (args, { argTypes }) => ({
    components: { VSpinner, TestComponent },

    props: Object.keys(argTypes),

    template: `<v-spinner>
        <TestComponent :duration="duration" />
    </v-spinner>`
});

VSpinnerComponent.storyName = 'f-spinner';

VSpinnerComponent.args = {
    duration: 2000
};

VSpinnerComponent.argTypes = {
    duration: {
        control: { type: 'select' },
        description: 'How long to show the spinner for before the test component loads. You can change this to restart the spinner.',
        options: [1000, 2000, 5000, 10000, 30000, 60000]
    }
};
