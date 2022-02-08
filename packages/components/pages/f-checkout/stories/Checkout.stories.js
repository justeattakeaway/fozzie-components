import Vue from 'vue';
import Vuex from 'vuex';
import { select, boolean } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { locales } from '@justeat/storybook/constants/globalisation';

import VueCheckout from '../src/components/Checkout.vue';
import fCheckoutModule from '../src/store/checkout.module';
import fCheckoutAnalyticsModule from '../src/store/checkoutAnalytics.module';
import fCheckoutExperimentationModule from '../src/store/checkoutExperimentation.module';
import CheckoutMock from './api/checkoutMock';
import { TENANT_MAP } from '../src/constants';
import { authToken } from './helpers';
import { propOptions, timeUnavailable } from './helpers/propOptions';

export default {
    title: 'Components/Pages',
    decorators: [withA11y],
    parameters: {
        layout: 'fullscreen'
    }
};

Vue.use(Vuex);
CheckoutMock();

export const CheckoutComponent = () => ({
    components: { VueCheckout },
    data () {
        return {
            loginUrl: '/login',
            paymentPageUrlPrefix: '#/pay',
            getGeoLocationUrl: '/get-geo-location',
            getCustomerUrl: '/get-customer'
        };
    },
    props: {
        isLoggedIn: {
            default: boolean('Is User Logged In', false)
        },

        serviceType: {
            default: select('Service Type', propOptions.serviceTypeOptions, 'delivery')
        },

        locale: {
            default: select('Locale', [locales.gb, locales.au, locales.nz], locales.gb)
        },

        isAsapAvailable: {
            default: boolean('Is ASAP available', true)
        },

        getCheckoutOptions: {
            default: select('Get Checkout Options', propOptions.getCheckoutOptions, null)
        },

        getBasketError: {
            default: select('Get Basket Options', propOptions.getBasketOptions, null)
        },

        patchCheckoutError: {
            default: select('Patch Checkout Errors', propOptions.patchCheckoutErrorOptions)
        },

        createGuestError: {
            default: select('Create Guest Errors', propOptions.createGuestErrorOptions, null)
        },

        placeOrderError: {
            default: select('Place Order Errors', propOptions.placeOrderErrorOptions)
        },

        fulfilmentTimeErrors: {
            default: select('Fulfilment Time Options', propOptions.fulfilmentTimeErrors)
        },

        noteType: {
            default: select('Note types', propOptions.noteTypeOptions, null)
        }
    },

    computed: {
        createGuestUrl () {
            return this.createGuestError ? '/create-guest-error' : '/create-guest';
        },

        getCheckoutUrl () {
            if (this.getCheckoutOptions && this.getCheckoutOptions !== timeUnavailable) {
                return `/checkout-${this.getCheckoutOptions}-error`;
            }

            return `/checkout-${this.serviceType}-${TENANT_MAP[this.locale]}`;
        },

        getBasketUrl () {
            return this.getBasketError ? `/get-basket-${this.getBasketError}` : `/get-basket-${this.serviceType}`;
        },

        getAddressUrl () {
            return `/get-address-${TENANT_MAP[this.locale]}`;
        },

        authToken () {
            return this.isLoggedIn ? authToken : '';
        },

        updateCheckoutUrl () {
            return this.patchCheckoutError ? `/update-checkout-${this.patchCheckoutError}` : '/update-checkout';
        },

        placeOrderUrl () {
            return this.placeOrderError ? `/place-order-${this.placeOrderError}` : '/place-order';
        },

        checkoutAvailableFulfilmentUrl () {
            if (this.fulfilmentTimeErrors) {
                return `/checkout-available-fulfilment-${this.fulfilmentTimeErrors}`;
            }

            return this.isAsapAvailable ? '/checkout-available-fulfilment' : '/checkout-available-fulfilment-preorder';
        },

        getNoteConfigUrl () {
            return this.noteType ? `/${this.noteType}` : '';
        },

        checkoutFeatures () {
            return {
                isSplitNotesEnabled: this.noteType !== null
            };
        }
    },

    methods: {
        otacToAuthExchanger () {
            return authToken;
        }
    },

    store: new Vuex.Store({
        modules: {
            fCheckoutModule,
            fCheckoutAnalyticsModule,
            fCheckoutExperimentationModule
        }
    }),

    template: '<vue-checkout ' +
        ':getCheckoutUrl="getCheckoutUrl" ' +
        ':updateCheckoutUrl="updateCheckoutUrl" ' +
        ':checkout-available-fulfilment-url="checkoutAvailableFulfilmentUrl" ' +
        ':create-guest-url="createGuestUrl" ' +
        ':get-basket-url="getBasketUrl" ' +
        ':authToken="authToken" ' +
        ':otacToAuthExchanger="otacToAuthExchanger"' +
        ':locale="locale" ' +
        ':loginUrl="loginUrl" ' +
        ':getAddressUrl="getAddressUrl" ' +
        ':placeOrderUrl="placeOrderUrl" ' +
        ':paymentPageUrlPrefix="paymentPageUrlPrefix" ' +
        'applicationName="Storybook" ' +
        ':getGeoLocationUrl="getGeoLocationUrl" ' +
        ':getCustomerUrl="getCustomerUrl" ' +
        ':getNoteConfigUrl="getNoteConfigUrl" ' +
        ':checkoutFeatures="checkoutFeatures"' +
        // eslint-disable-next-line no-template-curly-in-string
        ' :key="`${locale},${getCheckoutUrl},${updateCheckoutUrl},${checkoutAvailableFulfilmentUrl},${authToken},${createGuestUrl},${getBasketUrl},${getAddressUrl},${placeOrderUrl},${paymentPageUrlPrefix},${getGeoLocationUrl},${getNoteConfigUrl},${checkoutFeatures}`" />'
});

CheckoutComponent.storyName = 'f-checkout';
