import Vue from 'vue';
import Vuex from 'vuex';
import { withA11y } from '@storybook/addon-a11y';
import { locales } from '@justeat/storybook/constants/globalisation';

import VueCheckout from '../src/components/Checkout.vue';
import fCheckoutModule from '../src/store/checkout.module';
import fCheckoutAnalyticsModule from '../src/store/checkoutAnalytics.module';
import fCheckoutExperimentationModule from '../src/store/checkoutExperimentation.module';
import CheckoutMock from './api/checkoutMock';
import { TENANT_MAP } from '../src/constants';
import { authToken } from './helpers';
import { propOptions } from './helpers/propOptions';

export default {
    title: 'Components/Pages',
    decorators: [withA11y],
    parameters: {
        layout: 'fullscreen'
    }
};

Vue.use(Vuex);
CheckoutMock();

export const CheckoutComponent = (args, { argTypes }) => ({
    components: { VueCheckout },

    data () {
        return {
            loginUrl: '/login',
            paymentPageUrlPrefix: '#/pay',
            getGeoLocationUrl: '/get-geo-location',
            getCustomerUrl: '/get-customer',

            // default values are lost when opening storybook canvas in new tab
            tenant: this.locale || locales.gb,
            service: this.serviceType || 'delivery',
            isAsap: this.isAsapAvailable || true,
            isAuthenticated: this.isLoggedIn || false,
            notes: this.noteType || propOptions.noteTypeOptions['Legacy notes']
        };
    },

    props: Object.keys(argTypes),

    computed: {
        createGuestUrl () {
            return this.createGuestError ? '/create-guest-error' : '/create-guest';
        },

        getCheckoutUrl () {
            if (this.getCheckoutOptions) {
                return `/checkout-${this.service}-${this.getCheckoutOptions}`;
            }

            return `/checkout-${this.service}-${TENANT_MAP[this.tenant]}`;
        },

        getBasketUrl () {
            return this.getBasketError ? `/get-basket-${this.getBasketError}` : `/get-basket-${this.service}`;
        },

        getAddressUrl () {
            return `/get-address-${TENANT_MAP[this.tenant]}`;
        },

        authToken () {
            return this.isAuthenticated ? authToken : '';
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

            return this.isAsap ? '/checkout-available-fulfilment' : '/checkout-available-fulfilment-preorder';
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
        ':locale="tenant" ' +
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

CheckoutComponent.args = {
    isLoggedIn: false,
    serviceType: 'delivery',
    locale: locales.gb,
    isAsapAvailable: true,
    getCheckoutOptions:  propOptions.getCheckoutOptions.None,
    getBasketError:  propOptions.getBasketOptions.None,
    patchCheckoutError:  propOptions.patchCheckoutErrorOptions.None,
    createGuestError: propOptions.createGuestErrorOptions.None,
    placeOrderError: propOptions.placeOrderErrorOptions.None,
    fulfilmentTimeErrors: propOptions.fulfilmentTimeErrors.none,
    noteType: propOptions.noteTypeOptions['Legacy notes']
};

CheckoutComponent.argTypes = {
    isLoggedIn: {
        control: { type: 'boolean' },
        description: 'Is User Logged In'
    },

    serviceType: {
        control: { type: 'select' },
        options: propOptions.serviceTypeOptions,
        description: 'Service Type'
    },

    locale: {
        control: { type: 'select' },
        options: [locales.gb, locales.au, locales.nz],
        description: 'Locale'
    },

    isAsapAvailable: {
        control: { type: 'boolean' },
        description: 'Is ASAP available'
    },

    getCheckoutOptions: {
        control: { type: 'select' },
        options: propOptions.getCheckoutOptions,
        description: 'Get Checkout Options'
    },

    getBasketError: {
        control: { type: 'select' },
        options: propOptions.getBasketOptions,
        description: 'Get Basket Options'
    },

    patchCheckoutError: {
        control: { type: 'select' },
        options: propOptions.patchCheckoutErrorOptions,
        description: 'Patch Checkout Errors'
    },

    createGuestError: {
        control: { type: 'select' },
        options: propOptions.createGuestErrorOptions,
        description: 'Create Guest Errors'
    },

    placeOrderError: {
        control: { type: 'select' },
        options: propOptions.placeOrderErrorOptions,
        description: 'Place Order Errors'
    },

    fulfilmentTimeErrors: {
        control: { type: 'select' },
        options: propOptions.fulfilmentTimeErrors,
        description: 'Fulfilment Time Options'
    },

    noteType: {
        control: { type: 'select' },
        options: propOptions.noteTypeOptions,
        description: 'Note types'
    }
};

CheckoutComponent.storyName = 'f-checkout';
