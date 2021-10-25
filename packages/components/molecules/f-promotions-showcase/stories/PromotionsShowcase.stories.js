// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import PromotionsShowcase from '../src/components/PromotionsShowcase.vue';

export default {
    title: 'Components/Molecules',
    decorators: [withA11y]
};

export const PromotionsShowcaseComponent = () => ({
    components: { PromotionsShowcase },
    props: {
    },
    template: `<promotions-showcase />`
});

PromotionsShowcaseComponent.storyName = 'f-promotions-showcase';
