<template>
    <header
        :data-theme="theme"
        :class="[
            $style['c-header'],
            headerBackgroundClass,
            transparentBackgroundClasses,
            { [$style['c-header--navInView']]: mobileNavIsOpen }
        ]"
        data-test-id='header-component'>
        <skip-to-main
            v-if="showSkipLink"
            :text="copy.skipToMainContentText"
            :transparent-bg="showTransparentHeader" />

        <div :class="$style['c-header-container']">
            <logo
                :theme="theme"
                :company-name="copy.companyName"
                :is-logo-disabled="isLogoLinkDisabled"
                :logo-gtm-label="copy.logo.gtm"
                :header-background-theme="headerBackgroundTheme"
                :is-open="mobileNavIsOpen" />

            <navigation
                :copy="copy"
                :show-delivery-enquiry="showDeliveryEnquiryWithContent"
                :show-offers-link="showOffersLinkWithContent"
                :show-help-link="showHelpLink"
                :error-log="errorLog"
                :user-info-prop="userInfoProp"
                :user-info-url="userInfoUrl"
                :order-count-url="orderCountUrl"
                :is-order-count-supported="isOrderCountSupported"
                :header-background-theme="headerBackgroundTheme"
                :show-login-info="showLoginInfo"
                :show-country-selector="showCountrySelector"
                @onMobileNavToggle="mobileNavToggled" />
        </div>
    </header>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import Logo from './Logo.vue';
import SkipToMain from './SkipToMain.vue';
import { tenantConfigs } from '../tenants';
import Navigation from './Navigation.vue';

export default {
    name: 'VueHeader',

    components: {
        Logo,
        SkipToMain,
        Navigation
    },

    props: {
        locale: {
            type: String,
            default: ''
        },

        errorLog: {
            type: [Function, Boolean],
            default: false
        },

        headerBackgroundTheme: {
            type: String,
            default: 'white'
        },

        isOrderCountSupported: {
            type: Boolean,
            default: true
        },

        isLogoLinkDisabled: {
            type: Boolean,
            default: false
        },

        orderCountUrl: {
            type: String,
            default: '/api/analytics/ordercount'
        },

        showDeliveryEnquiry: {
            type: Boolean,
            default: true
        },

        showLoginInfo: {
            type: Boolean,
            default: true
        },

        showHelpLink: {
            type: Boolean,
            default: true
        },

        showOffersLink: {
            type: Boolean,
            default: false
        },

        showSkipLink: {
            type: Boolean,
            default: true
        },

        userInfoProp: {
            type: [Object, Boolean],
            default: false
        },

        userInfoUrl: {
            type: String,
            default: '/api/account/details'
        },

        showCountrySelector: {
            type: Boolean,
            default: false
        }
    },

    data () {
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];
        const mobileNavIsOpen = false;

        return {
            copy: { ...localeConfig },
            mobileNavIsOpen
        };
    },

    computed: {
        theme () {
            return globalisationServices.getTheme(this.locale);
        },

        showDeliveryEnquiryWithContent () {
            return this.copy.deliveryEnquiry && this.showDeliveryEnquiry;
        },

        showTransparentHeader () {
            return this.headerBackgroundTheme === 'transparent' && !this.mobileNavIsOpen;
        },

        showOffersLinkWithContent () {
            return this.copy.offers && this.showOffersLink;
        },

        headerBackgroundClass () {
            return this.headerBackgroundTheme === 'highlight' ? this.$style['c-header--highlightBg'] : '';
        },

        transparentBackgroundClasses () {
            return this.showTransparentHeader ? `${this.$style['c-header--transparent']} ${this.$style['c-header--gradient']}` : '';
        }
    },

    methods: {
        mobileNavToggled (value) {
            this.mobileNavIsOpen = value;
        }
    }
};
</script>

<style lang="scss" module>
// when the off-screen navigation is active (on mobile), it fixes to the top of the screen.
// this stops the content being forced upwards when this happens (preventing slight visual glitch)
html:global(.is-navInView) {
    .c-header {
        @include media('<=mid') {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: zIndex(high);
        }
    }
}

.c-header {
    background-color: $header-bg;
    min-width : 300px;
    position: relative;
    z-index: zIndex(mid);
    box-shadow: $header-box-shadow;

    // Styles for a sticky header on mobile
    @include media('<=mid') {
        &.is-sticky {
            left: 0;
            top: -60px;
            position: fixed;
        }

        &.is-sticky-scrollingUp {
            top: 0;
        }
    }
}

    // Adds a border to the header to separate it from the
    // main content at all widths
    .c-header--bordered {
        box-shadow: $header-box-shadow;
    }

    .c-header--transparent {
        background-color: transparent;
        box-shadow: none;
        position: absolute;
        width: 100%;
    }

    .c-header--gradient {
        &:before {
            content: '';
            height: $header--transparent-gradient;
            opacity: $header--transparent-opacity;
            background-image: linear-gradient(to top, transparent, $header--transparent-gradient-color);
            pointer-events: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
        }
    }

    .c-header--highlightBg {
        background-color: $color-support-brand-01;
        min-height: 88px;
    }

    .c-header-container {
        width: 100%;
        max-width: #{$layout-max-width}px;
        margin: 0 auto;
        padding-left: #{$layout-margin}px;
        padding-right: #{$layout-margin}px;
        position: relative;
        min-height: $header-height--narrow;

        @include media('<wide') {
            padding-left: #{$layout-margin--mid}px;
            padding-right: #{$layout-margin--mid}px;
        }

        @include media('>mid') {
            display: flex;
            min-height: $header-height;
        }

        @include media('<narrow') {
            padding-left: #{$layout-margin--narrow}px;
            padding-right: #{$layout-margin--narrow}px;
        }
    }

    // Header button Styling
    // Example – searchWeb filter button at narrow views
    .c-header-button {
        top: 0;
        right: 0;
        border: 0;
        padding: 0;
        line-height: 1;
        background: none;
        appearance: none;
        position: absolute;
        width: $header-button--width;
        height: $header-button--height;
        z-index: zIndex(belowHighest);

        .is-sticky & {
            top: -#{$header-button--height};
        }
    }

    .c-header-buttonIcon {
        width: 28px;
        height: 15px;
        display: inline-block;

        svg {
            fill: $header-buttonIcon-color;
        }
    }

    .c-header-button--primary {
        display: block;
        width: 40px;
        padding-right: spacing();
    }

    .c-header-button--secondary {
        right: 40px;
    }
</style>
