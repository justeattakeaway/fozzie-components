import { VALID_CHECKOUT_METHOD, CHECKOUT_METHOD_COLLECTION } from '../src/constants';
import VueCheckout from '../src/components/Checkout.vue';

export default {
    title: 'Components/Organisms',
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

Checkout.storyName = 'f-checkout';

Checkout.args = {
    checkoutMethod: CHECKOUT_METHOD_COLLECTION
};
