import { withA11y } from '@storybook/addon-a11y';
import ImageTile from '../src/components/ImageTile.vue';
import ImageTileWallpaper from './images/wallpaper.png';
import ImageTileCuisine from './images/burgers.jpg';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y]
};

export const ImageTileComponent = (args, { argTypes }) => ({
    components: { ImageTile },
    props: Object.keys(argTypes),
    template: `<image-tile
                    :href='href'
                    :tile-id='tileId'
                    :is-selected='isSelected'
                    :is-link='isLink'
                    :display-text='displayText'
                    :img-src='imgSrc'
                    :alt-text='altText'
                    :fallback-image='fallbackImage'
                >
                </image-tile>`
});

ImageTileComponent.argTypes = {
    href: {
        control: { type: 'text' },
        description: 'Anchor link path',
        defaultValue: '/Chicken'
    },
    tileId: {
        control: { type: 'text' },
        description: 'Image tile filter id',
        defaultValue: 'Chicken'
    },
    displayText: {
        control: { type: 'text' },
        description: 'Component display text',
        defaultValue: 'Chicken'
    },
    imgSrc: {
        control: { type: 'text' },
        description: 'Cuisine image link',
        defaultValue: ImageTileCuisine
    },
    isSelected: {
        control: { type: 'boolean' },
        description: 'Marks the filter as selected',
        defaultValue: false
    },
    isLink: {
        control: { type: 'boolean' },
        description: 'Component acts as a link, rather than default toggle',
        defaultValue: false
    },
    altText: {
        control: { type: 'text' },
        description: 'Image alt text',
        defaultValue: ''
    },
    fallbackImage: {
        control: { type: 'text' },
        description: 'Fallback image url',
        defaultValue: ImageTileWallpaper
    }
};

ImageTileComponent.storyName = 'f-image-tile';
