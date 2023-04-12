import { withA11y } from '@storybook/addon-a11y';
import SegmentedControl from '../src/components/SegmentedControl.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y],
    component: SegmentedControl,
    argTypes: {
        screenreaderLabel: { control: 'text' },
        options: { control: 'array' }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { SegmentedControl },
    template: '<segmented-control v-bind="$props" />'
});

export const Default = Template.bind({});
Default.args = {
    screenreaderLabel: 'Please select a language',
    options: [
        { label: 'EN', icon: 'icon-classname-1' },
        { label: 'DK', icon: 'icon-classname-2' },
        { label: 'FR', icon: 'icon-classname-3' }
    ]
};
