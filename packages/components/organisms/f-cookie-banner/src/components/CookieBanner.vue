<template>
    <div
        v-if="!legacyBanner"
        ref="cookieBanner"
        :class="[
            $style['c-cookieBanner'],
            $style['c-cookieBanner--overlay'],
            { [$style['c-cookieBanner--is-hidden']]: shouldHideBanner }
        ]"
        data-cookie-consent-overlay
        :aria-hidden="shouldHideBanner">
        <div
            :class="[
                $style['c-cookieBanner-card'],
                { [$style['c-cookieBanner-ios']]: isIosBrowser }
            ]"
            data-test-id="cookieConsentBanner"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookieConsentTitle"
            aria-describedby="cookieConsentDescription">
            <div
                :class="$style['c-cookieBanner-content']"
                data-test-id="cookieBannerContent">
                <h2
                    id="cookieConsentTitle"
                    ref="cookieBannerHeading"
                    tabindex="0"
                    :class="$style['c-cookieBanner-title']"
                    data-consent-title>
                    {{ copy.mainTitle }}
                </h2>
                <div id="cookieConsentDescription">
                    <p :class="$style['c-cookieBanner-text']">
                        {{ copy.textLine1 }}
                    </p>

                    <p :class="$style['c-cookieBanner-text']">
                        {{ copy.textLine2 }}
                    </p>

                    <p :class="$style['c-cookieBanner-text']">
                        {{ copy.textLine3 }}
                        <a
                            data-test-id="cookie-policy-link"
                            :href="copy.cookiePolicyLinkUrl"
                            :class="$style['c-cookieBanner-link']"
                            target="_blank">
                            {{ copy.cookiePolicyLinkText }}
                        </a>
                        {{ copy.textLine4 }}
                    </p>
                </div>
            </div>

            <div :class="$style['c-cookieBanner-cta']">
                <button-component
                    data-test-id="accept-all-cookies-button"
                    is-full-width
                    @click="acceptAllCookiesActions">
                    {{ copy.acceptButtonText }}
                </button-component>

                <button-component
                    button-type="ghost"
                    data-test-id="accept-necessary-cookies-button"
                    is-full-width
                    @click="acceptOnlyNecessaryCookiesActions">
                    {{ copy.nonAcceptButtonText }}
                </button-component>
            </div>
        </div>
    </div>

    <legacy-banner
        v-else
        :should-hide-legacy-banner="shouldHideBanner"
        :legacy-banner-text="copy.legacyBannerText"
        :cookie-policy-link-url="copy.cookiePolicyLinkUrl"
        :legacy-banner-link-text="copy.legacyBannerLinkText"
        :legacy-banner-close-banner-text="copy.legacyBannerCloseBannerText"
        @hide-legacy-banner="hideBanner"
    />
</template>

<script>
import CookieHelper from 'js-cookie';

import { globalisationServices } from '@justeat/f-services';

import ButtonComponent from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';

import LegacyBanner from './LegacyBanner.vue';

import tenantConfigs from '../tenants';

export default {
    components: {
        ButtonComponent,
        LegacyBanner
    },

    props: {
        locale: {
            type: String,
            default: ''
        },

        isHidden: {
            type: Boolean,
            default: false
        },

        showLegacyBanner: {
            type: Boolean,
            default: false
        },

        cookieExpiry: {
            type: Number,
            default: 7776000
        }
    },

    data () {
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];
        const theme = globalisationServices.getTheme(locale);
        const copy = localeConfig.messages;
        const consentCookieName = 'je-cookieConsent';
        const legacyConsentCookieName = 'je-banner_cookie';

        return {
            config: { ...localeConfig },
            theme,
            copy,
            shouldHideBanner: true,
            consentCookieName,
            legacyConsentCookieName,
            isIosBrowser: false
        };
    },

    computed: {
        /**
         * Check if the legacy cookie banner should be used
         */
        legacyBanner () {
            return this.config.displayLegacy;
        }
    },

    watch: {
        isHidden (newVal) {
            this.shouldHideBanner = !!newVal;
        }
    },

    mounted () {
        this.checkCookieBannerCookie();
        this.focusOnTitle();

        this.isIosBrowser = /(iPhone|iPad).*Safari/.test(navigator.userAgent);
    },

    methods: {
        /**
         * Actions for "Accept all cookies" button
         */
        acceptAllCookiesActions () {
            this.setCookieBannerCookie('full');
            this.setLegacyCookieBannerCookie();
            this.dataLayerPush('full');
            this.resendEvents();
            this.shouldHideBanner = true;
        },

        /**
         * Actions for "Accept only required cookies" button
         */
        acceptOnlyNecessaryCookiesActions () {
            this.setCookieBannerCookie('necessary');
            this.setLegacyCookieBannerCookie();
            this.dataLayerPush('necessary');
            this.resendEvents();
            this.removeUnnecessaryCookies();
            this.shouldHideBanner = true;
        },

        /**
         * Set focus to the cookie consent banner title for accessibility
         */
        focusOnTitle () {
            if (!this.legacyBanner) {
                this.$refs.cookieBannerHeading.focus();
            }
        },

        /**
         * Hide the banner
         */
        hideBanner () {
            this.shouldHideBanner = true;
        },

        /**
         * Check if the cookie banner has been shown to this user
         */
        checkCookieBannerCookie () {
            if (this.legacyBanner) {
                this.shouldHideBanner = CookieHelper.get(this.legacyConsentCookieName) === '130315';
                this.setLegacyCookieBannerCookie();
            } else {
                const cookieConsent = CookieHelper.get(this.consentCookieName);
                const isConsentCookiePresent = cookieConsent === 'full' || cookieConsent === 'necessary';
                if (isConsentCookiePresent) {
                    this.shouldHideBanner = true;
                } else {
                    this.shouldHideBanner = false;
                    this.dataLayerPush('shown');
                }
            }
        },

        /**
         * Set the cookie for the user's choice
         * @param {String} cookieValue
         */
        setCookieBannerCookie (cookieValue) {
            CookieHelper.set(this.consentCookieName, cookieValue, {
                path: '/',
                expires: this.cookieExpiry
            });
        },

        /**
         * Set the legacy cookie banner cookie
         */
        setLegacyCookieBannerCookie () {
            CookieHelper.set(this.legacyConsentCookieName, '130315', {
                path: '/',
                expires: this.cookieExpiry
            });
        },

        /**
         * Push tracking events
         * @param {String} consentLevel
         */
        dataLayerPush (consentLevel) {
            const dataLayer = window.dataLayer || [];
            dataLayer.push({ event: 'trackConsent', userData: { consent: consentLevel } });
            dataLayer.push({ platformData: { consentLoading: true } });
        },

        /**
         * Check whether a cookie with name `cookieName` is to be excluded from being removed
         * @param {String} cookieName
         * @returns {Bool}
         */
        isNotExcluded (cookieName) {
            return this.config.cookieExclusionList.every(excludedCookieName => cookieName.lastIndexOf(excludedCookieName, excludedCookieName.length - 1) === -1);
        },

        /**
         * Remove unnecessary cookies
         */
        removeUnnecessaryCookies () {
            const cookies = Object.keys(CookieHelper.get());
            for (let i = 0; i < cookies.length; i++) {
                if (this.isNotExcluded(cookies[i])) CookieHelper.remove(cookies[i]);
            }
        },

        /**
         * Resend GTM events
         */
        resendEvents () {
            const dataLayer = window.dataLayer || [];
            const excludeEvents = ['gtm.js', 'gtm.click', 'gtm.linkClick', 'gtm.triggerGroup', 'trackConsent', 'showConsent'];
            let i;
            for (i = 0; i < dataLayer.length; i++) {
                if (dataLayer[i].event && !excludeEvents.includes(dataLayer[i].event)) {
                    dataLayer[i].eventResent = dataLayer[i].event;
                    dataLayer[i]['gtm.uniqueEventId'] = Math.floor(100000 + Math.random() * 900000);
                    dataLayer.push(dataLayer[i]);
                }
                if (dataLayer[i].event && dataLayer[i].event === 'trackConsent' && (dataLayer[i].userData.consent === 'full' || dataLayer[i].userData.consent === 'necessary')) {
                    dataLayer.push({ eventResent: false });
                    break;
                }
            }
        }
    }
};
</script>

<style lang="scss" module>
    .c-cookieBanner--overlay {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 99999991;
    }

    .c-cookieBanner--is-hidden {
        display: none;
    }

    .c-cookieBanner-card {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: $white;
        z-index: 99999992;
    }

    .c-cookieBanner-cta {
        min-width: 352px;
    }

    .c-cookieBanner-text {
        margin: 0;
        padding: 0;
    }

    .c-cookieBanner-title {
        @include font-size(heading-m);
        font-weight: $font-weight-bold;
        margin: spacing() 0;
        padding: 0;
        color: $color-headings;
        &:hover,
        &:focus {
            a {
                text-decoration: none;
            }
        }
    }

    .c-cookieBanner-content,
    .c-cookieBanner-cta {
        margin: 0 auto;
        padding: spacing(x4);
    }

    @include media ('<mid') {
        .c-cookieBanner-card {
            flex-direction: column;
            padding: spacing(x2) 0;
        }

        .c-cookieBanner-ios {
            padding-bottom: 80px;
        }

        .c-cookieBanner-content,
        .c-cookieBanner-cta {
            padding: spacing(x0.5) spacing(x3);
        }

        .c-cookieBanner-cta {
            min-width: initial;
            display: flex;
            flex-direction: row-reverse;
            margin: 0;
        }
    }

    @include media('<=narrow') {
        .c-cookieBanner-title {
            @include font-size(heading-s);
        }

        .c-cookieBanner-cta {
            display: block;
            margin: 0;
        }
    }
</style>
