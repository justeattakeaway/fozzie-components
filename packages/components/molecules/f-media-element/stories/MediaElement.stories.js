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
    title: 'Stampcards',
    text: 'See the stamps you’ve collected and any discounts you’ve earned.',
    stacked: false,
    reverse: true,
    contentAlign: 'left',
    imageAlign: 'center',
    imageUrl: 'https://via.placeholder.com/250',
    textSize: 'xxl'
};
