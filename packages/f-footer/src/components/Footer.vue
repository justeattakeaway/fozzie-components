<template>
    <footer class="c-footer">
        <h1>Footer component</h1>
        <div class="c-footer-row">
            <footer-link-list
                v-for="(linkList, index) in copy.linkLists"
                :key="index"
                :link-list="linkList" />
        </div>
        <div class="c-footer-row">
            <footer-app-list
                :title="copy.downloadOurApps"
                :apps-icons="copy.appStoreIcons"
            />
            <footer-feedback
                :title="copy.feedback"
                :text="copy.improveOurWebsite"
                :button-text="copy.sendFeedback" />
            <footer-social-list
                :title="copy.followUs"
                :social-icons="copy.socialIcons" />
        </div>
        <div class="c-footer-row">
            <footer-country-selector />
            <footer-legal-field
                v-if="copy.vatInfo"
                :text="copy.vatInfo" />
            <footer-payment-list
                :payment-icons="copy.paymentIcons" />
        </div>
    </footer>
</template>

<script>
import FooterLinkList from './FooterLinkList.vue';
import FooterAppList from './FooterAppList.vue';
import FooterFeedback from './FooterFeedback.vue';
import FooterSocialList from './FooterSocialList.vue';
import FooterCountrySelector from './FooterCountrySelector.vue';
import FooterLegalField from './FooterLegalField.vue';
import FooterPaymentList from './FooterPaymentList.vue';
import tenantConfigs from '../tenants';

export default {
    name: 'VueFooter',
    components: {
        FooterLinkList,
        FooterAppList,
        FooterFeedback,
        FooterSocialList,
        FooterCountrySelector,
        FooterLegalField,
        FooterPaymentList
    },
    props: {
        locale: {
            type: String,
            required: false,
            default: ''
        }
    },
    data () {
        const locale = this.getLocale();
        const localeConfig = tenantConfigs[locale];

        return {
            copy: { ...localeConfig }
        };
    },
    methods: {
        getLocale () {
            let locale = this.locale || (this.$i18n ? this.$i18n.locale : null); // use prop, or the i18n locale value set

            // if the locale is either
            // a) not set
            // or b) set to a country code that this component does not recognise
            // it will be set to 'en-GB'
            if (!tenantConfigs[locale]) {
                locale = 'en-GB';
            }

            return locale;
        }
    }
};
</script>

<style>
.c-footer {
    border: 2px solid red;
}

.c-footer-row {
    border: 2px solid blue;
}
</style>
