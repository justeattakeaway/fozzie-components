import { withA11y } from '@storybook/addon-a11y';
import SegmentedControl from '../src/components/SegmentedControl.vue';

export default {
    title: 'Components/Atoms/f-segmented-control',
    decorators: [withA11y],
    component: SegmentedControl,
    argTypes: {
        screenreaderLabel: { control: 'text' },
        options: { control: 'array' },
        size: {
            control: { type: 'select', options: ['small', 'large'] },
            defaultValue: 'small'
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { SegmentedControl },
    template: '<segmented-control v-bind="$props" />'
});

export const Small = Template.bind({});
Small.args = {
    screenreaderLabel: 'Please select a language',
    options: [
        { label: 'EN' },
        { label: 'DK' },
        { label: 'FR' }
    ],
    size: 'small'
};

export const Large = Template.bind({});
Large.args = {
    ...Small.args,
    size: 'large'
};

export const WithIcons = Template.bind({});
WithIcons.args = {
    ...Small.args,
    options: [
        { label: 'EN', icon: 'icon-classname-1' },
        { label: 'DK', icon: 'icon-classname-2' },
        { label: 'FR', icon: 'icon-classname-3' }
    ]
};
