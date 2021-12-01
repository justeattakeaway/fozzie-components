// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { boolean, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import ImageTile from '../src/components/ImageTile.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y]
};

export const ImageTileComponent = () => ({
    components: { ImageTile },
    data () {
        return {
            dataTestId: 'image-tile'
        };
    },
    props: {
        href: {
            default: text('Anchor link path', '/Chicken')
        },

        tileId: {
            default: text('Image tile filter id', 'Chicken12334')
        },

        isSelected: {
            default: boolean('Marks the filter as selected', false)
        },

        isLink: {
            default: boolean('Component acts as a link, rather than default toggle', false)
        },

        displayText: {
            default: text('Component display text', 'Chicken')
        }
    },
    template: `<image-tile
                    :data-test-id="dataTestId"
                    :href='href'
                    :tileId='tileId'
                    :isSelected='isSelected'
                    :isLink='isLink'
                    :displayText='displayText'
                >
                </image-tile>`
});

ImageTileComponent.storyName = 'f-image-tile';
