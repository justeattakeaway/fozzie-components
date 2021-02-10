// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import StatusBanner from '../src/components/StatusBanner.vue';

export default {
    title: 'Components/Organisms',
    decorators: [withA11y]
};

export const StatusBannerComponent = () => ({
    components: { StatusBanner },
    props: {
    },
    template: `<status-banner />`
});

StatusBannerComponent.storyName = 'f-status-banner';
