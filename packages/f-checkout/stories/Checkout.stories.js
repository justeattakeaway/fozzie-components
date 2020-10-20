import { withKnobs, select } from '@storybook/addon-knobs';
import { withTests } from '@storybook/addon-jest';
import { VALID_CHECKOUT_TYPES } from '../src/constants';
import VueCheckout from '../src/components/Checkout.vue';
import results from '../src/components/tests/.jest-test-results.json';

export default {
    title: 'Components/Organisms',
    decorators: [withKnobs, withTests({ results })]
};

export const Checkout = () => ({
    components: { VueCheckout },
    props: {
        type: {
            default: select('type', VALID_CHECKOUT_TYPES)
        }
    },
    template:
        '<vue-checkout :type="type" />'
});

Checkout.parameters = {
    jest: ['Checkout.test.js']
};

Checkout.storyName = 'f-checkout';
