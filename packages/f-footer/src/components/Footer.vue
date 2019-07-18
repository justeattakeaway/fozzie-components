<template>
    <footer class="c-footer">
        <div class="c-footer-container c-footer-row c-footer-row--noPadBelowWide">
            <link-list
                v-for="(linkList, index) in copy.linkLists"
                :key="index"
                :link-list="linkList" />
        </div>
        <div class="c-footer-light">
            <div class="c-footer-row c-footer-container">
                <icon-list
                    class="c-iconList c-iconList--apps"
                    :title="copy.downloadOurApps"
                    :icons="copy.appStoreIcons"
                    :is-apps="true"
                    :locale="copy.locale" />
                <feedback-block
                    :title="copy.feedback"
                    :text="copy.improveOurWebsite"
                    :button-text="copy.sendFeedback" />
                <icon-list
                    class="c-iconList c-iconList--social"
                    :icons="copy.socialIcons"
                    :title="copy.followUs" />
            </div>
        </div>
        <div class="c-footer-container c-footer-row">
            <country-selector />
            <legal-block
                v-if="copy.vatInfo"
                :text="copy.vatInfo" />
            <icon-list
                class="c-iconList c-iconList--payments"
                :icons="copy.paymentIcons" />
        </div>
    </footer>
</template>

<script>
import LinkList from './LinkList.vue';
import FeedbackBlock from './FeedbackBlock.vue';
import IconList from './IconList.vue';
import CountrySelector from './CountrySelector.vue';
import LegalBlock from './LegalBlock.vue';
import tenantConfigs from '../tenants';

export default {
    name: 'VueFooter',
    components: {
        CountrySelector,
        FeedbackBlock,
        IconList,
        LegalBlock,
        LinkList
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

.c-footer-light {
    background-color: $footer-bgLight;
}

.c-footer-container {
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
    padding-left: 0;

}

.c-footer-heading--shortBelowWide {
    @include media('<wide') {
        padding: 0 0 spacing();
    }
}

.c-footer-row {
    padding: 0;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    padding: spacing(x2);

    @include media('>=wide') {
        padding: spacing(x4);
        flex-flow: row nowrap;
    }

    .c-iconList--apps {
        flex-basis: 42%;
    }

    .c-iconList--social {
        flex-basis: 25%;
    }
}

.c-footer-row--noPadBelowWide {
    @include media('<wide') {
        padding: 0;
    }
}

.c-footer-list {
    padding: 0;
    list-style: none;
    list-style-image: none;
    margin-top: 0;
    margin-bottom: spacing(x2);
    margin-left: spacing(x2);
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;

    & > li {
        margin-bottom: 0;

        &:before {
            content: none;
        }
    }

    @include media('>=wide') {
        margin: spacing(x2) 0 0 0;
    }

    .is-collapsed & {
        display: none;
    }
}

.c-footer-list--inline {
    margin: 0 0 spacing(x2);
    align-items: center;
    flex-flow: row wrap;

    @include media('>=wide') {
        margin-bottom: 0;
    }
}

.c-footer-list-item {
    margin-right: spacing(x2);

    &:last-child {
        margin-right: 0;
    }
}

</style>
