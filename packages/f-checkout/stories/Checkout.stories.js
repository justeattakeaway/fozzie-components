import { withKnobs, select } from '@storybook/addon-knobs';
import { withTests } from '@storybook/addon-jest';
import { VALID_CHECKOUT_METHOD } from '../src/constants';
import VueCheckout from '../src/components/Checkout.vue';
import results from '../src/components/tests/.jest-test-results.json';

export default {
    title: 'Components/Organisms',
    decorators: [withKnobs, withTests({ results })]
};

export const Checkout = () => ({
    components: { VueCheckout },
    props: {
        checkoutMethod: {
            default: select('Checkout Method', VALID_CHECKOUT_METHOD)
        }
    },
    template:
        '<vue-checkout :checkoutMethod="checkoutMethod" />'
});

Checkout.parameters = {
    jest: ['Checkout.test.js', 'Selector.test.js']
};

Checkout.storyName = 'f-checkout';
