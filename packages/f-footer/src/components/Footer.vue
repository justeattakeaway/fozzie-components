<template>
    <footer class="c-footer">
        <div class="c-footer-layout c-footer-row c-footer-linkList">
            <link-list
                v-for="(linkList, index) in copy.linkLists"
                :key="index"
                :link-list="linkList" />
        </div>
        <div class="c-footer-row c-footer-row--light">
            <div class="c-footer-layout c-footer-row c-footer-row--narrow-columns">
                <icon-list
                    class="c-icon-list c-icon-list--apps"
                    :title="copy.downloadOurApps"
                    :icons="copy.appStoreIcons"
                    :isApps="true"
                />
                <feedback-block
                    data-feedback-block
                    :title="copy.feedback"
                    :text="copy.improveOurWebsite"
                    :button-text="copy.sendFeedback" />
                <icon-list
                    class="c-icon-list c-icon-list--social"
                    data-social-icons
                    :icons="copy.socialIcons"
                    :title="copy.followUs" />
            </div>
        </div>
        <div class="c-footer-layout c-footer-row c-footer-row--wrap-reverse">
            <country-selector />
            <legal-block
                v-if="copy.vatInfo"
                :text="copy.vatInfo" />
            <icon-list
                class="c-icon-list c-icon-list--payments"
                :icons="copy.paymentIcons"
                data-payment-icons />
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
        padding: 0;
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
}

.c-footer-list--inline {
    align-items: center;
    flex-flow: row wrap;

    @include media('>=wide') {
        margin-bottom: 0;
    }
}

.c-footer-linkList {
    display: flex;
    flex-flow: column nowrap;

    @include media('>=wide') {
        flex-flow: row nowrap;
    }
}

.c-footer-row--wrap-reverse {
    flex-flow: row wrap-reverse;
}

.c-footer-row--narrow-columns {
    @include media('<=mid') {
        flex-flow: column nowrap;
    }
    
    @include media('>mid') {
        flex-flow: row wrap;
    }

}

ul {
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    padding: 0;
}

</style>
