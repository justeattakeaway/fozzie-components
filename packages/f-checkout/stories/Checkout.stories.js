import { select } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

import {
    VALID_CHECKOUT_METHOD,
    CHECKOUT_METHOD_DELIVERY
} from '../src/constants';

import {
    VALID_LOCALES,
    ENGLISH_LOCALE
} from '../../storybook/constants/globalisation';

import VueCheckout from '../src/components/Checkout.vue';

export default {
    title: 'Components/Organisms',
    decorators: [withA11y]
};

export const CheckoutComponent = () => ({
    components: { VueCheckout },
    props: {
        locale: {
            default: select('Locale', VALID_LOCALES, ENGLISH_LOCALE)
        },
        checkoutMethod: {
            default: select('Checkout Method', VALID_CHECKOUT_METHOD, CHECKOUT_METHOD_DELIVERY)
        }
    },
    template:
        '<vue-checkout :checkoutMethod="checkoutMethod" :locale="locale" />'
});

CheckoutComponent.storyName = 'f-checkout';
