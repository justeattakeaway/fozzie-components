import { VALID_CHECKOUT_METHOD, CHECKOUT_METHOD_COLLECTION, CHECKOUT_METHOD_DELIVERY, VALID_LOCALES } from '../src/constants';
import {
    withKnobs, boolean, select, object, text
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import VueCheckout from '../src/components/Checkout.vue';

export default {
    title: 'Components/Organisms',
    decorators: [withA11y]
};

export const CheckoutComponent = () => ({
    components: { VueCheckout },
    props: {
        locale: {
            default: select('Locale', ['en-GB', 'es-ES'], 'en-GB')
        },
        checkoutMethod: {
            default: select('Checkout Method', VALID_CHECKOUT_METHOD, CHECKOUT_METHOD_DELIVERY)
        },
    },
    template:
        '<vue-checkout :checkoutMethod="checkoutMethod" locale="es-ES" />'
});

CheckoutComponent.storyName = 'f-checkout';
