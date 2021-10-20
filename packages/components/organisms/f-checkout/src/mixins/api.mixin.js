import { mapActions } from 'vuex';
import { VUEX_CHECKOUT_MODULE } from '../constants';
import apis from '../services/apis';

export default {
    data () {
        return {
            registrationSource: 'Guest'
        };
    },

    computed: {
        firstName () {
            return this.customer.firstName;
        },

        lastName () {
            return this.customer.lastName;
        },

        emailAddress () {
            return this.customer.email;
        },

        language () {
            return this.$i18n.locale;
        },

        timeout () {
            return this.checkoutTimeout;
        },

        currentPostcode () {
            return this.$cookies.get('je-location');
        }
    },

    methods: {
        ...mapActions(VUEX_CHECKOUT_MODULE, [
            'createGuestUser',
            'getBasket',
            'getCheckout',
            'getAvailableFulfilment',
            'getAddress',
            'getCustomer'
        ]),

        getApiConfig (config) {
            const additionalConfig = {};

            if (config) {
                config.forEach(item => {
                    additionalConfig[item] = this[item];
                });
            }

            return additionalConfig;
        },

        getRequestData (data) {
            const requestData = {};

            if (data) {
                data.forEach(item => {
                    requestData[item] = this[item];
                });
            }

            return requestData;
        },

        async handleApiCall (endpoint, api) {
            const response = await apis[api][endpoint](this[`${endpoint}Url`], this.getApiConfig, this.getRequestData);

            this[endpoint]({ response, getApiConfig: this.getApiConfig });
            this.handleEventLogging(`${endpoint}Success`);
        }
    }
};
