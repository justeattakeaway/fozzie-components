import Vue from 'vue';
import Vuex from 'vuex';
import { select } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

import {
    VALID_LOCALES,
    ENGLISH_LOCALE
} from '../../storybook/constants/globalisation';

import VueCheckout from '../src/components/Checkout.vue';
import CheckoutMock from '../src/demo/checkoutMock';

Vue.use(Vuex);

const deliveryUrl = '/checkout-delivery.json';
const collectionUrl = '/checkout-collection.json';

const restaurantUrl = '/restaurant.json';
const restaurantMcDonaldsUrl = '/restaurant-mcdonalds.json';

CheckoutMock.setupCheckoutMethod(deliveryUrl);
CheckoutMock.setupCheckoutMethod(collectionUrl);

CheckoutMock.setupRestaurant(restaurantUrl);
CheckoutMock.setupRestaurant(restaurantMcDonaldsUrl);

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
        },
        restaurantUrl: {
            default: select('Restaurant Url', [restaurantUrl, restaurantMcDonaldsUrl], restaurantUrl)
        }
    },
    store: new Vuex.Store({}),
    template:
        '<vue-checkout :checkoutUrl="checkoutUrl" :restaurantUrl="restaurantUrl" :locale="locale" />'
});

CheckoutComponent.storyName = 'f-checkout';
