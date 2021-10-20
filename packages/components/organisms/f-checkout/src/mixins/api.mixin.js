import { mapActions } from 'vuex';
import { VUEX_CHECKOUT_MODULE } from '../constants';
import apiController from '../services/apiController';

export default {
    data () {
        return {
            registrationSource: 'Guest'
        }
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

        language() {
            return this.$i18n.locale;
        },

        currentPostcode () {
            return this.$cookies.get('je-location')
        }
    },

    methods: {
        ...mapActions(VUEX_CHECKOUT_MODULE, [
            'createGuestUser',
            'getBasket',
            'getCheckout',
            'getAvailableFulfilment',
            'getAddress',
            'getCustomer',
        ]),

        createConfig (endpoint) {
            const config  = apiController[endpoint].config;
            let additionalConfig = {};

            config?.forEach(item => {
                additionalConfig[item] = this[item]
            });

            const baseConfig = {
                url: this[`${endpoint}Url`],
                timeout: this.checkoutTimeout
            };

            return additionalConfig ? {...baseConfig, ...additionalConfig} : baseConfig;
        },

        createRequestData (endpoint) {
            const data  = apiController[endpoint].data;
            let requestData = {};

            if (data) {
                data.forEach(item => {
                    requestData[item] = this[item]
                });
            }

            return requestData;
        },

        async handleApiCall (endpoint) {
            const config = this.createConfig(endpoint);
            const data = this.createRequestData(endpoint);
            console.log(endpoint, config, data);

            await this[endpoint]({
                ...config,
                ...(data && {data})
            });

            this.handleEventLogging(`${endpoint}Success`);
        }
    }
};
