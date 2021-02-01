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

export const MediaElementComponent = () => ({
    components: { MediaElement },
    props: {
    },
    template: `<media-element />`
});

MediaElementComponent.storyName = 'f-media-element';
