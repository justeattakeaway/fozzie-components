// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import MediaElement from '../src/components/MediaElement.vue';
import { ALIGN, FONT_SIZE } from '../src/constants';

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
    flex: {
        default: {
            column: false,
            reverse: false
        },
        modifier: {
            rule: [
                '<',
                'narrowMid'
            ],
            column: true,
            reverse: true
        }
    },
    altText: 'Test alt text',
    imageUrl: 'https://via.placeholder.com/250'
};

MediaElementComponent.argTypes = {
    textSize: {
        control: { type: 'select', options: [...Object.entries(FONT_SIZE).map(([, value]) => value)] },
        defaultValue: 'xxl'
    },
    contentAlign: {
        control: { type: 'select', options: [...Object.entries(ALIGN).map(([, value]) => value)] },
        defaultValue: 'left'
    },
    imageAlign: {
        control: { type: 'select', options: [...Object.entries(ALIGN).map(([, value]) => value)] },
        defaultValue: 'center'
    }
};
