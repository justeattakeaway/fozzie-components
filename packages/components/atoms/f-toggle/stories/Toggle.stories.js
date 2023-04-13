import { withA11y } from '@storybook/addon-a11y';
import Toggle from '../src/components/Toggle.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y]
};

export const ToggleComponent = (args, { argTypes }) => ({
    components: { Toggle },

    props: Object.keys(argTypes),

    template: '<toggle v-bind="$props" />'
});

ToggleComponent.storyName = 'f-toggle';

ToggleComponent.args = {
};

ToggleComponent.argTypes = {
};
