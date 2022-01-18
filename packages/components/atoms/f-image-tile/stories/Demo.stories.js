import { withA11y } from '@storybook/addon-a11y';
import ImageTile from '../src/components/ImageTile.vue';
import TestContainer from './TestContainer.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y]
};

export const DemoImageTileComponent = (args, { argTypes }) => ({
    components: {
        ImageTile,
        TestContainer
    },
    props: Object.keys(argTypes),
    template: `
                <test-container
                :fallback-image="fallbackImage"
                :cuisine-image="cuisineImage"
                :cuisine-id="cuisineId">
                    <image-tile
                        :tile-id="cuisineId"
                        :href="cuisineId"
                        :img-src="cuisineImage"
                        :display-text="cuisineId"
                        :is-selected="selected"
                        :fallback-image="fallbackImage"
                        @toggle="toggleCuisine"
                    >
                    </image-tile>
                </test-container>
            `
});

DemoImageTileComponent.argTypes = {
    cuisineImage: {
        control: { type: 'text' },
        description: 'Cuisine image link',
        defaultValue: ''
    },
    cuisineId: {
        control: { type: 'text' },
        description: 'Cuisine id',
        defaultValue: 'Chicken'
    },
    fallbackImage: {
        control: { type: 'text' },
        description: 'Fallback image link',
        defaultValue: 'https://d30v2pzvrfyzpo.cloudfront.net/a/sw/img/wallpaper.png'
    }
};

DemoImageTileComponent.storyName = 'f-image-tile in container demo';
