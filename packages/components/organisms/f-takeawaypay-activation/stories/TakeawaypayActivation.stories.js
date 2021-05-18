// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import TakeawayPayActivation from '../src/components/TakeawayPayActivation.vue';

export default {
    title: 'Components/Organisms',
    decorators: [withA11y]
};

export const TakeawayPayActivationComponent = () => ({
    components: { TakeawaypayActivation },
    props: {
    },
    template: `<takeawaypay-activation />`
});

TakeawayPayActivationComponent.storyName = 'f-takeawaypay-activation';
