import { withA11y } from '@storybook/addon-a11y';
import ImageTile from '../src/components/ImageTile.vue';
import TestContainer from './TestContainer.vue';
import ImageTileWallpaper from './images/wallpaper.png';
import ImageTileCuisine from './images/burgers.jpg';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y]
};

export const ImageTileComponent = (args, { argTypes }) => ({
    components: {
        ImageTile,
        TestContainer
    },
    props: Object.keys(argTypes),
    template: `
                <test-container>
                    <image-tile
                        :href='href'
                        :tile-id='tileId'
                        :is-selected='isSelected'
                        :is-link='isLink'
                        :display-text='displayText'
                        :img-src='imgSrc'
                        :alt-text='altText'
                        :fallback-image='fallbackImage'
                        @toggle="toggleCuisine"
                    >
                    </image-tile>
                </test-container>
            `
});

ImageTileComponent.args = {
    href: '/Chicken',
    tileId: 'Chicken',
    displayText: 'Chicken',
    imgSrc: ImageTileCuisine,
    isSelected: false,
    isLink: false,
    altText: '',
    fallbackImage: ImageTileWallpaper
};

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
        control: { type: 'select', options: [ImageTileCuisine, null] },
        description: 'Cuisine image link',
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
