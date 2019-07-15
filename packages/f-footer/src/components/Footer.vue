<template>
    <footer class="c-footer">
        <div class="c-footer-layout c-footer-row c-footer-linkList">
            <footer-link-list
                v-for="(linkList, index) in copy.linkLists"
                :key="index"
                :link-list="linkList" />
        </div>
        <div class="c-footer-row--light">
            <div class="c-footer-layout c-footer-row">
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
        </div>
        <div class="c-footer-layout c-footer-row">
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

<style lang="scss">

.c-footer {
    background-color: $footer-bgColor;
    color: $footer-textColor;
}

.c-footer-layout {
    width: 100%;
    max-width: #{$layout-max-width}px;
    margin: 0 auto;
    padding-left: #{$layout-margin}px;
    padding-right: #{$layout-margin}px;

    @include media('<mid') {
        padding-left: #{$layout-margin--mid}px;
        padding-right: #{$layout-margin--mid}px;
    }

    @include media('<narrow') {
        padding-left: #{$layout-margin--narrow}px;
        padding-right: #{$layout-margin--narrow}px;
    }
}

.c-footer-heading {
    @include font-size(mid);
    padding: spacing(x2);

    @include media('>=wide') {
        padding-left: 0;
        padding-top: 0;
    }
}

.c-footer-row {
    padding: 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    @include media('>=wide') {
        padding: spacing(x4);
    }
}

.c-footer-row--light {
    background-color: $footer-bgLight;
    margin: 0;
    padding: spacing(x2);

    @include media('>=wide') {
        margin: 0;
        padding: 0;
    }
}

.c-footer-linkList {
    display: flex;
    flex-flow: column nowrap;

    @include media('>=wide') {
        flex-flow: row nowrap;
    }
}

</style>
