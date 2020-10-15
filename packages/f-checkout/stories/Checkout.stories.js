import { withKnobs } from '@storybook/addon-knobs';
import VueCheckout from '../src/components/Checkout.vue';

export default {
    title: 'Components/Oganisms',
    decorators: [withKnobs]
};

export const CheckoutComponent = () => ({
    components: { VueCheckout },
    template:
        '<vue-checkout />'
});

CheckoutComponent.storyName = 'f-checkout';
