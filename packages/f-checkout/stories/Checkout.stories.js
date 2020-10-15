import { withTests } from '@storybook/addon-jest';
import VueCheckout from '../src/components/Checkout.vue';
import results from '../src/components/tests/.jest-test-results.json';

export default {
    title: 'Components/Organisms',
    decorators: [withTests({ results })]
};

export const Checkout = () => ({
    components: { VueCheckout },
    template:
        '<vue-checkout />'
});

Checkout.parameters = {
    jest: ['Checkout.test.js']
};

Checkout.storyName = 'f-checkout';
