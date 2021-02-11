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
        data-test-id="cookieBanner-component"
        :aria-hidden="shouldHideBanner">
        <div
            :class="[
                $style['c-cookieBanner-card'],
                { [$style['c-cookieBanner-ios']]: isIosBrowser() }
            ]">
            <div
                :class="$style['c-cookieBanner-content']"
                role="dialog"
                aria-labelledby="cookieConsentLabel"
                aria-modal="true">
                <h2
                    id="cookieConsentLabel"
                    ref="cookieBannerHeading"
                    :class="$style['c-cookieBanner-title']"
                    tabindex="0"
                    data-consent-title>
                    {{ $t('mainTitle') }}
                </h2>

                <p :class="$style['c-cookieBanner-text']">
                    {{ $t('textLine1') }}
                </p>
                <p :class="$style['c-cookieBanner-text']">
                    {{ $t('textLine2') }}
                </p>
                <p
                    :class="$style['c-cookieBanner-text']">
                    <i18n
                        path="textLine3">
                        <template #cookiePolicy>
                            <a
                                :href="$t('cookiePolicyLinkUrl')"
                                target="_blank">
                                <span>{{ $t('cookiePolicyLinkText') }}</span>
                            </a>
                        </template>
                    </i18n>
                </p>
            </div>

            <div :class="$style['c-cookieBanner-cta']">
                <button-component
                    is-full-width
                    @click.native="acceptAllCookiesActions">
                    {{ $t('acceptButtonText') }}
                </button-component>
                <button-component
                    button-type="ghost"
                    is-full-width
                    @click.native="acceptOnlyNecessaryCookiesActions">
                    {{ $t('nonAcceptButtonText') }}
                </button-component>
            </div>
        </div>
    </div>
    <legacy-banner
        v-else
        :should-hide-legacy-banner="shouldHideBanner"
        @hide-legacy-banner="hideBanner"
    />
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import { VueGlobalisationMixin } from '@justeat/f-globalisation';

import ButtonComponent from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';

import LegacyBanner from './LegacyBanner.vue';

import tenantConfigs from '../tenants';

export default {
    name: 'CookieBanner',

    components: {
        ButtonComponent,
        LegacyBanner
    },

    mixins: [VueGlobalisationMixin],

    props: {
        locale: {
            type: String,
            default: 'en-GB'
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
        const consentCookieName = 'je-cookieConsent';
        const legacyConsentCookieName = 'je-banner_cookie';

        return {
            config: { ...localeConfig },
            tenantConfigs,
            theme,
            shouldHideBanner: false,
            legacyBanner: false,
            consentCookieName,
            legacyConsentCookieName
        };
    },

    watch: {
        isHidden (newVal) {
            this.shouldHideBanner = !!newVal;
        },

        showLegacyBanner (newVal) {
            this.legacyBanner = !!newVal;
        }
    },

    mounted () {
        this.checkLegacyBannerFlag();
        this.checkCookieBannerCookie();
        this.focusOnTitle();
    },

    methods: {
        /**
         * Actions for "Accept all cookies" button
         */
        acceptAllCookiesActions () {
            this.setCookieBannerCookie('full');
            this.setLegacyCookieBannerCookie();
            this.dataLayerPush('full');
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
            this.$refs.cookieBannerHeading.focus();
        },
        /**
         * Hide the banner
         */
        hideBanner () {
            this.shouldHideBanner = true;
        },
        /**
         * Check if the legacy cookie banner should be used
         */
        checkLegacyBannerFlag () {
            this.legacyBanner = this.config.displayLegacy;
        },
        /**
         * Check if the cookie banner has been shown to this user
         */
        checkCookieBannerCookie () {
            if (this.legacyBanner) {
                this.shouldHideBanner = this.$cookies.get(this.legacyConsentCookieName) === 2;
                this.setLegacyCookieBannerCookie();
            } else {
                const cookieConsent = this.$cookies.get(this.consentCookieName);
                this.shouldHideBanner = cookieConsent === 'full' || cookieConsent === 'necessary';
            }
        },
        /**
         * Set the cookie for the user's choice
         * @param {String} cookieValue
         */
        setCookieBannerCookie (cookieValue) {
            this.$cookies.set(this.consentCookieName, cookieValue, {
                path: '/',
                maxAge: this.cookieExpiry
            });
        },
        /**
         * Set the legacy cookie banner cookie
         */
        setLegacyCookieBannerCookie () {
            this.$cookies.set(this.legacyConsentCookieName, '2', {
                path: '/',
                maxAge: this.cookieExpiry
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
            const cookies = Object.keys(this.$cookies.getAll());
            for (let i = 0; i < cookies.length; i++) {
                if (this.isNotExcluded(cookies[i])) this.$cookies.remove(cookies[i]);
            }
        },
        /**
         * Check for iOS browser
         * @returns {Bool}
         */
        isIosBrowser () {
            if (process.browser) {
                return /(iPhone|iPad).*Safari/.test(navigator.userAgent);
            }
            return false;
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
