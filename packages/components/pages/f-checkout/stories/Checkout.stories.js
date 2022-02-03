import Vue from 'vue';
import Vuex from 'vuex';
import { select, boolean } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { locales } from '@justeat/storybook/constants/globalisation';

import VueCheckout from '../src/components/Checkout.vue';
import fCheckoutModule from '../src/store/checkout.module';
import fCheckoutAnalyticsModule from '../src/store/checkoutAnalytics.module';
import fCheckoutExperimentationModule from '../src/store/checkoutExperimentation.module';
import CheckoutMock from './demo/checkoutMock';
import { TENANT_MAP } from '../src/constants';
import {
    noteTypeOptions,
    patchCheckoutErrorOptions,
    restrictionOptions,
    createGuestErrorOptions,
    getCheckoutErrorOptions,
    getBasketErrorOptions,
    placeOrderErrorOptions,
    fulfilmentTimeOptions,
    timeUnavailable
} from './options';


export default {
    title: 'Components/Pages',
    decorators: [withA11y],
    parameters: {
        layout: 'fullscreen'
    }
};

Vue.use(Vuex);
CheckoutMock();

const mockAuthToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvZS5ibG9nZ3NAanVzdGVhdHRha2Vhd2F5LmNvbSIsImNyZWF0ZWRfZGF0ZSI6IjIwMjEtMDItMDhUMTA6Mjc6NDkuMTkzMDAwMFoiLCJuYW1lIjoiSm9lIEJsb2dncyIsImdsb2JhbF91c2VyX2lkIjoiVTdOUkFsV0FnNXpPZHNkUmdmN25rVHlvaTkwWEVvPSIsImdpdmVuX25hbWUiOiJKb2UiLCJmYW1pbHlfbmFtZSI6IkJsb2dncyIsImlhdCI6MTYxNTQ2OTUxNn0.VapH6uHnn4lHIkvN_mS9A9IVVWL0YPNE39gDDD-l7SU';

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
            default: select('Service Type', ['collection', 'delivery', 'dinein', 'invalid-url'], 'delivery')
        },

        locale: {
            default: select('Locale', [locales.gb, locales.au, locales.nz], locales.gb)
        },

        isAsapAvailable: {
            default: boolean('Is ASAP available', true)
        },

        patchCheckoutError: {
            default: select('Patch Checkout Errors', patchCheckoutErrorOptions)
        },

        getCheckoutError: {
            default: select('Get Checkout Errors', getCheckoutErrorOptions, null)
        },

        createGuestError: {
            default: select('Create Guest Errors', createGuestErrorOptions, null)
        },

        getBasketError: {
            default: select('Get Basket Errors', getBasketErrorOptions, null)
        },

        placeOrderError: {
            default: select('Place Order Errors', placeOrderErrorOptions)
        },

        fulfilmentTimeSelection: {
            default: select('Fulfilment Time Options', fulfilmentTimeOptions)
        },

        restriction: {
            default: select('Restrictions', restrictionOptions)
        },

        noteType: {
            default: select('Note types', noteTypeOptions, null)
        }
    },

    computed: {
        createGuestUrl () {
            return this.createGuestError ? '/create-guest-error' : '/create-guest';
        },

        getCheckoutUrl () {
            let url;
            if (this.fulfilmentTimeSelection && this.fulfilmentTimeSelection !== 'issues') {
                url = `/checkout-${this.serviceType}-${this.fulfilmentTimeSelection}`;
            }

            if (this.getCheckoutError && this.getCheckoutError !== timeUnavailable) {
                url = `/checkout-${this.getCheckoutError}-get-error`;
            } else {
                url = `/${TENANT_MAP[this.locale]}/checkout-${this.serviceType}`;
            }

            return url;
        },

        getBasketUrl () {
            if (this.getBasketError) {
                return `/get-basket-${this.getBasketError}`;
            }

            return this.restriction ? `/get-basket-delivery-${this.restriction}` : `/get-basket-${this.serviceType}`;
        },

        getAddressUrl () {
            return `/${TENANT_MAP[this.locale]}/get-address.json`;
        },

        authToken () {
            return this.isLoggedIn ? mockAuthToken : '';
        },

        updateCheckoutUrl () {
            if (this.patchCheckoutError) {
                return `/update-checkout-${this.patchCheckoutError}`;
            }

            return '/update-checkout';
        },

        placeOrderUrl () {
            return this.placeOrderError ? `/place-order-${this.placeOrderError}` : '/place-order-duplicate';
        },

        checkoutAvailableFulfilmentUrl () {
            if (this.getCheckoutError === timeUnavailable) {
                return '/checkout-available-fulfilment-time-unavailable';
            }

            if (this.fulfilmentTimeSelection) {
                return `/checkout-available-fulfilment-${this.fulfilmentTimeSelection}`;
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
            return mockAuthToken;
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
