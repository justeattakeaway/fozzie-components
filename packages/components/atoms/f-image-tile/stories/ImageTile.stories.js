import { withA11y } from '@storybook/addon-a11y';
import ImageTile from '../src/components/ImageTile.vue';

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
                    :imgSrc='imgSrc'
                    :altText='altText'
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
        defaultValue: 'https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,f_auto,h_180,q_auto,w_290/v1/uk/cuisine-icons/burgers'
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
    }
};

ImageTileComponent.storyName = 'f-image-tile';
