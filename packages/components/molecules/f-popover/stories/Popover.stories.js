// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import VPopover from '../src/components/Popover.vue';

export default {
    title: 'Components/Molecules',
    decorators: [withA11y]
};

export const VPopoverComponent = () => ({
    components: { VPopover },
    props: {
    },
    template: `<v-popover />`
});

VPopoverComponent.storyName = 'f-popover';
