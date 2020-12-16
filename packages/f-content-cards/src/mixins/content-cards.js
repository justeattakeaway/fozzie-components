import { globalisationServices } from '@justeat/f-services';
import tenantConfigs from '../tenants';

export default {
    props: {
        apiKey: {
            type: String,
            default: ''
        },

        locale: {
            type: String,
            default: ''
        },

        testId: {
            type: String,
            default: null
        },

        userId: {
            type: String,
            default: ''
        }
    },
    computed: {
        /**
         * Determines the tenant based on the currently selected locale in order to choose correct translations
         * @return {String}
         **/
        tenant () {
            return {
                'en-GB': 'uk',
                'en-AU': 'au',
                'en-NZ': 'nz',
                'da-DK': 'dk',
                'es-ES': 'es',
                'en-IE': 'ie',
                'it-IT': 'it',
                'nb-NO': 'no'
            }[this.locale] || 'uk';
        }
    },
    data () {
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];
        return {
            copy: { ...localeConfig }
        };
    },
    /**
     * Sets up dependencies required by descendant components
     **/
    provide () {
        const component = this;

        return {
            copy: component.copy
        };
    },
};
