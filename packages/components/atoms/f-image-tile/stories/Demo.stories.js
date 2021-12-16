import { withA11y } from '@storybook/addon-a11y';
import ImageTile from '../src/components/ImageTile.vue';
import TestContainer from './TestContainer.vue';

export default {
    title: 'Components/Atoms/f-image-tile',
    decorators: [withA11y]
};

export const DemoImageTileComponent = (args, { argTypes }) => ({
    components: {
        ImageTile,
        TestContainer
    },
    props: Object.keys(argTypes),
    template: `
                <test-container>
                    <image-tile
                        :tile-id="cuisineId"
                        :href="cuisineId"
                        :img-src="cuisineImage"
                        :display-text="cuisineId"
                        :is-selected="selected"
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
        defaultValue: 'https://via.placeholder.com/150'
    },
    cuisineId: {
        control: { type: 'text' },
        description: 'Cuisine id',
        defaultValue: 'Chicken'
    },
    isLink: {
        control: { type: 'boolean' },
        description: 'Component acts as a link, rather than default toggle',
        defaultValue: false
    }
};

DemoImageTileComponent.storyName = 'f-image-tile container demo';
