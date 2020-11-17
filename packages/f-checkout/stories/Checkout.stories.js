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
import CheckoutMock from '../src/demo/checkoutMock';

const deliveryUrl = '/checkout-delivery.json';
const collectionUrl = '/checkout-collection.json';

CheckoutMock.setupDelivery(deliveryUrl);
CheckoutMock.setupCollection(collectionUrl);

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
        checkoutUrl: {
            default: select('Checkout Url', [deliveryUrl, collectionUrl], deliveryUrl)
        }
    },
    template:
        '<vue-checkout :checkoutUrl="checkoutUrl" :locale="locale" />'
});

CheckoutComponent.storyName = 'f-checkout';
