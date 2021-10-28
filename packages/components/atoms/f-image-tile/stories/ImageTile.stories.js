// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import ImageTile from '../src/components/ImageTile.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y]
};

export const ImageTileComponent = () => ({
    components: { ImageTile },
    props: {
    },
    template: '<image-tile />'
});

ImageTileComponent.storyName = 'f-image-tile';
