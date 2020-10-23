import { withTests } from '@storybook/addon-jest';
import { VALID_CHECKOUT_METHOD, CHECKOUT_METHOD_COLLECTION } from '../src/constants';
import VueCheckout from '../src/components/Checkout.vue';
import results from '../src/components/tests/.jest-test-results.json';

export default {
    title: 'Components/Organisms',
    decorators: [withTests({ results })],
    argTypes: {
        checkoutMethod: { control: { type: 'select', options: VALID_CHECKOUT_METHOD } }
    }
};

export const Checkout = args => ({
    components: { VueCheckout },
    props: Object.keys(args),
    template:
        '<vue-checkout :checkoutMethod="checkoutMethod" />'
});

Checkout.parameters = {
    jest: ['Checkout.test.js', 'Selector.test.js']
};

Checkout.storyName = 'f-checkout';

Checkout.args = {
    checkoutMethod: CHECKOUT_METHOD_COLLECTION
};
