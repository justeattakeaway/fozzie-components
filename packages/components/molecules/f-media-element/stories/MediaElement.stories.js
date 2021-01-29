// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import MediaElement from '../src/components/MediaElement.vue';

export default {
    title: 'Components/Molecules',
    decorators: [withA11y]
};

export const MediaElementComponent = (args, { argTypes }) => ({
    components: { MediaElement },
    props: Object.keys(argTypes),
    template: '<media-element v-bind="$props" />'
});

MediaElementComponent.storyName = 'f-media-element';

MediaElementComponent.args = {
    title: 'Earn',
    text: 'Each stamp you collect from a restaurant is worth up to 15% of your order’s value and will be saved under its own StampCard.',
    stacked: true,
    reverse: true,
    contentAlign: 'center',
    imageAlign: 'center',
    imageUrl: 'https://via.placeholder.com/250'
};
