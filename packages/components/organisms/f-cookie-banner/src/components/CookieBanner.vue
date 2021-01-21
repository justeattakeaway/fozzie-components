<template>
    <div
        ref="cookieBanner"
        :class="[$style['c-cookieBanner'], $style['c-cookieBanner-overlay'], { [$style['c-cookieBanner--hidden']]: hideBanner }]"
        data-cookie-consent-overlay
        data-test-id="cookieBanner-component"
        :aria-hidden="hideBanner">
        <div
            v-if="!legacyBanner"
            :class="$style['c-cookieBanner-card']">
            <div
                :class="$style['c-cookieBanner-content']"
                role="dialog"
                aria-labelledby="cookieConsentLabel"
                aria-modal="true">
                <h2
                    id="cookieConsentLabel"
                    :class="$style['c-cookieBanner-title']">
                    <a
                        ref="cookieBannerHeadingFocus"
                        name="cookieConsentTitle"
                        tabindex="0"
                        data-consent-title>
                        {{ copy.mainTitle }}
                    </a>
                </h2>

                <p :class="$style['c-cookieBanner-text']">
                    {{ copy.text1 }}
                </p>
                <p :class="$style['c-cookieBanner-text']">
                    {{ copy.text2 }}
                </p>
                <p
                    :class="$style['c-cookieBanner-text']">
                    {{ copy.text3 }}
                    <a
                        :href="copy.linkHref"
                        :class="$style['c-cookieBanner-link']"
                        target="_blank">
                        {{ copy.linkText }}</a>{{ copy.text4 }}
                </p>
            </div>

            <div :class="$style['c-cookieBanner-CTA']">
                <button-component
                    tabindex="0"
                    role="button"
                    is-full-width
                    @click.native="acceptActions">
                    {{ copy.buttonText2 }}
                </button-component>
                <button-component
                    tabindex="0"
                    role="button"
                    button-type="ghost"
                    is-full-width
                    @click.native="nonAcceptActions">
                    {{ copy.buttonText1 }}
                </button-component>
            </div>
        </div>
        <div v-if="legacyBanner">
            <div :class="[$style['c-cookieWarning'], { [$style['c-cookieBanner--hidden']]: hideBanner }]">
                <div :class="$style['c-cookieWarning-inner']">
                    <p>
                        {{ copy.legacyBannerText }}
                        <a
                            class="c-cookieWarning-link"
                            :href="copy.linkHref">
                            {{ copy.legacyBannerLinkText }}
                        </a>
                    </p>
                    <button
                        class="c-cookieWarning-btn"
                        data-test-id="cookieBanner-close-button"
                        aria-label="Close"
                        @click="hideBanner = true" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';

import ButtonComponent from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import tenantConfigs from '../tenants';

export default {
    name: 'CookieBanner',

    components: {
        ButtonComponent
    },

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

        return {
            copy: { ...localeConfig },
            theme,
            hideBanner: false,
            legacyBanner: false
        };
    },

    watch: {
        isHidden (newVal) {
            if (newVal) {
                this.hideBanner = true;
            } else {
                this.hideBanner = false;
            }
        },
        showLegacyBanner (newVal) {
            if (newVal) {
                this.legacyBanner = true;
            } else {
                this.legacyBanner = false;
            }
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
        acceptActions () {
            this.setCookieBannerCookie('full');
            this.setLegacyCookieBannerCookie();
            this.dataLayerPush('full');
            this.hideBanner = true;
        },
        /**
         * Actions for "Accept only required cookies" button
         */
        nonAcceptActions () {
            this.setCookieBannerCookie('necessary');
            this.setLegacyCookieBannerCookie();
            this.dataLayerPush('necessary');
            this.resendEvents();
            this.removeUnnecessaryCookies();
            this.hideBanner = true;
        },
        /**
         * Set focus to the cookie consent banner title for accessibility
         */
        focusOnTitle () {
            this.$refs.cookieBannerHeadingFocus.focus();
        },
        /**
         * Check if the cookie banner has been shown to this user
         */
        checkLegacyBannerFlag () {
            this.legacyBanner = this.copy.config.displayLegacy;
        },
        /**
         * Check if the cookie banner has been shown to this user
         */
        checkCookieBannerCookie () {
            if (this.legacyBanner) {
                this.hideBanner = this.$cookies.get('je-banner_cookie') === 2;
                this.setLegacyCookieBannerCookie();
            } else {
                const cookieConsent = this.$cookies.get('je-cookieConsent');
                this.hideBanner = cookieConsent === 'full' || cookieConsent === 'necessary';
            }
        },
        /**
         * Set the cookie for the user's choice
         */
        setCookieBannerCookie (cookieValue) {
            this.$cookies.set('je-cookieConsent', cookieValue, {
                path: '/',
                maxAge: this.cookieExpiry
            });
        },
        /**
         * Set the legacy cookie banner cookie
         */
        setLegacyCookieBannerCookie () {
            this.$cookies.set('je-banner_cookie', '2', {
                path: '/',
                maxAge: this.cookieExpiry
            });
        },
        /**
         * Push tracking events
         */
        dataLayerPush (consentLevel) {
            const dataLayer = window.dataLayer || [];
            dataLayer.push({ event: 'trackConsent', userData: { consent: consentLevel } });
        },
        /**
         * Check for excluded cookies/storage
         */
        isNotExcluded (cookieName) {
            return this.copy.config.cookieExclusionList.every(arrVal => cookieName.lastIndexOf(arrVal, arrVal.length - 1) === -1);
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
    .c-cookieBanner {
        font-family: $font-family-base;
    }

    .c-cookieBanner-overlay {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 99999991;
    }

    .c-cookieBanner--hidden {
        display: none;
    }

    .c-cookieBanner-card {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: $white;
        z-index: 99999992;
    }

    .c-cookieBanner-CTA {
        min-width: 352px;
    }

    .c-cookieBanner-text {
        margin: 0;
        padding: 0;
    }

    .c-cookieBanner-link {
        color: $color-link-default;
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
    .c-cookieBanner-CTA {
        margin: 0 auto;
        padding: spacing(x4);
    }

    .c-cookieWarning {
        box-sizing: border-box;
        background-color: $grey--darkest;
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 99999990;
    }

    .c-cookieWarning-inner {
        margin: 0 auto;
        padding: spacing() spacing(x3) spacing() spacing();
        overflow: hidden;

            p {
                @include font-size(caption);
                color: $white;
                text-align: center;
                margin: 0 auto;

                    a {
                        color: $white;
                    }
            }

            button {
                text-size-adjust: 100%;
                font-size: 100%;
                line-height: 1.15;
                margin: 0;
                display: block;
                position: absolute;
                top: 12px;
                right: 8px;
                width: 10px;
                height: 10px;
                background: url('//dy3erx8o0a6nh.cloudfront.net/images/icon-close-banner.png') no-repeat 50%;
                background-size: 10px 10px;
                border: none;
                cursor: pointer;
            }
    }

    @media (max-width: 768px) {
        .c-cookieBanner-card {
            flex-direction: column;
            padding: spacing(x2) 0;
        }

        .c-cookieBanner-content,
        .c-cookieBanner-CTA {
            padding: spacing(x0.5) spacing(x3);
        }

        .c-cookieBanner-CTA {
            min-width: initial;
            display: flex;
            flex-direction: row-reverse;
            margin: 0;
        }
    }

    @media (max-width: 600px) {
        .c-cookieBanner-title {
            @include font-size(heading-s);
        }

        .c-cookieBanner-CTA {
            display: block;
            margin: 0;
        }
    }
</style>
