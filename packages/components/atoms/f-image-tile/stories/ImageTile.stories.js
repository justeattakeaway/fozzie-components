import { withA11y } from '@storybook/addon-a11y';
import ImageTile from '../src/components/ImageTile.vue';
import TestContainer from './TestContainer.vue';
import ImageTileWallpaper from './images/wallpaper.png';
import ImageTileCuisine from './images/burgers.jpg';
import ImageTileBreakout from './images/burgers.png';

const fakeImage = 'This creates a broken image';

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
                        :is-breakout-image='isBreakoutImage'
                        @toggle="toggleCuisine" 
                        slot-scope="{ toggleCuisine }"
                    >
                    </image-tile>
                </test-container>
            `
});

ImageTileComponent.args = {
    href: '/Chicken',
    tileId: 'Chicken',
    displayText: 'Chicken',
    imgSrc: ImageTileBreakout,
    isSelected: false,
    isLink: false,
    altText: '',
    fallbackImage: ImageTileWallpaper,
    isBreakoutImage: true
};

ImageTileComponent.argTypes = {
    href: {
        control: { type: 'text' },
        description: 'Anchor link path'
    },
    tileId: {
        control: { type: 'text' },
        description: 'Image tile filter id'
    },
    displayText: {
        control: { type: 'text' },
        description: 'Component display text'
    },
    imgSrc: {
        control: { type: 'select' },
        options: [ImageTileCuisine, null, fakeImage, ImageTileBreakout],
        description: 'Cuisine image link'
    },
    isSelected: {
        control: { type: 'boolean' },
        description: 'Marks the filter as selected'
    },
    isLink: {
        control: { type: 'boolean' },
        description: 'Component acts as a link, rather than default toggle'
    },
    altText: {
        control: { type: 'text' },
        description: 'Image alt text'
    },
    fallbackImage: {
        control: { type: 'text' },
        description: 'Fallback image url'
    },
    isBreakoutImage: {
        control: { type: 'boolean' },
        description: 'Images are displayed in breakout style'
    }
};

ImageTileComponent.storyName = 'f-image-tile';
