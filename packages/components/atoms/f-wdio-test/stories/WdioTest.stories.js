import { withA11y } from '@storybook/addon-a11y';
import WdioTest from '../src/components/WdioTest.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y]
};

export const WdioTestComponent = (args, { argTypes }) => ({
    components: { WdioTest },

    props: Object.keys(argTypes),

    template: '<wdio-test v-bind="$props" />'
});

WdioTestComponent.storyName = 'f-wdio-test';

WdioTestComponent.args = {
};

WdioTestComponent.argTypes = {
};
