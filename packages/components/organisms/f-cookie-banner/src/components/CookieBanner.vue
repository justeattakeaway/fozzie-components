<template>
    <div v-if="!shouldHideBanner">
        <mega-modal
            v-if="!legacyBanner"
            ref="cookieBanner"
            :is-open="!shouldHideBanner"
            is-positioned-bottom
            :has-close-button="false"
            aria-label="cookieConsentTitle"
            data-cookie-consent-overlay>
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
                            <v-link
                                data-test-id="cookie-policy-link"
                                is-distinct
                                :href="copy.cookiePolicyLinkUrl"
                                target="_blank">
                                {{ copy.cookiePolicyLinkText }}
                            </v-link>
                            {{ copy.textLine4 }}
                        </p>
                    </div>
                </div>

                <div
                    ref="buttonContainer"
                    :class="$style['c-cookieBanner-cta']">
                    <button-component
                        data-test-id="accept-all-cookies-button"
                        is-full-width
                        @click="acceptAllCookiesActions">
                        {{ copy.acceptButtonText }}
                    </button-component>

                    <button-component
                        button-type="outline"
                        data-test-id="accept-necessary-cookies-button"
                        is-full-width
                        @click="acceptOnlyNecessaryCookiesActions">
                        {{ copy.nonAcceptButtonText }}
                    </button-component>
                </div>
            </div>
        </mega-modal>

        <legacy-banner
            v-else
            :should-hide-legacy-banner="shouldHideBanner"
            :legacy-banner-text="copy.legacyBannerText"
            :cookie-policy-link-url="copy.cookiePolicyLinkUrl"
            :legacy-banner-link-text="copy.legacyBannerLinkText"
            :legacy-banner-close-banner-text="copy.legacyBannerCloseBannerText"
            @hide-legacy-banner="hideBanner"
        />
    </div>
    <div v-else>
        <reopen-banner-link
            v-if="!legacyBanner"
            ref="reopenCookieBannerLink"
            :message="copy.reopenCookieBannerLinkText"
            :use-grey-background="shouldUseGreyBackground"
            :class="{ [$style['reopen-link-wrapper']]: isBodyHeightLessThanWindowHeight }"
            @reopenBanner="reopenBanner" />
    </div>
</template>

<script>
import CookieHelper from 'js-cookie';
import { globalisationServices } from '@justeat/f-services';
import ButtonComponent from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import MegaModal from '@justeat/f-mega-modal';
import '@justeat/f-mega-modal/dist/f-mega-modal.css';
import VLink from '@justeat/f-link';
import '@justeat/f-link/dist/f-link.css';
import LegacyBanner from './LegacyBanner.vue';
import ReopenBannerLink from './ReopenBannerLink.vue';
import tenantConfigs from '../tenants';
import { LEGACY_CONSENT_COOKIE_NAME, CONSENT_COOKIE_NAME } from '../constants';

export default {
    components: {
        ButtonComponent,
        LegacyBanner,
        MegaModal,
        ReopenBannerLink,
        VLink
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

        shouldShowLegacyBanner: {
            type: Boolean,
            default: null
        },

        cookieExpiry: {
            type: Number,
            default: 90
        },

        shouldUseGreyBackground: {
            type: Boolean,
            default: true
        },

        shouldAbsolutePositionReopenLink: {
            type: Boolean,
            default: true
        },

        nameSuffix: {
            type: String,
            default: ''
        },

        domain: {
            type: String,
            default: null
        }
    },

    data () {
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];
        const theme = globalisationServices.getTheme(locale);
        const copy = localeConfig.messages;

        return {
            config: { ...localeConfig },
            theme,
            copy,
            shouldHideBanner: true,
            isIosBrowser: false,
            bodyObserver: undefined,
            isBodyHeightLessThanWindowHeight: false,
            bodyHeight: 0
        };
    },

    computed: {
        /**
         * Check if the legacy cookie banner should be used
         * @returns {Boolean}
         */
        legacyBanner () {
            return this.shouldShowLegacyBanner === null ? this.config.displayLegacy : this.shouldShowLegacyBanner;
        },

        /**
         * Return the cookie consent name with the suffix if provided.
         * @returns {String}
         */
        consentCookieName () {
            return this.nameSuffix
                ? `${CONSENT_COOKIE_NAME}-${this.nameSuffix}`
                : CONSENT_COOKIE_NAME;
        }
    },

    watch: {
        isHidden (newVal) {
            this.shouldHideBanner = !!newVal;
        },

        bodyHeight (newVal, oldVal) {
            if (newVal !== oldVal) {
                this.updateIsBodyHeightLessThanWindowHeight();
            }
        }
    },

    destroyed () {
        if (typeof window === 'object') {
            // eslint-disable-next-line no-unused-expressions
            this.bodyObserver?.disconnect();
        }
    },

    mounted () {
        this.checkCookieBannerCookie();
        if (!this.shouldHideBanner) {
            this.$nextTick(() => {
                this.addKeyboardHandler();
                this.focusOnTitle();
            });
        }
        this.isIosBrowser = /(iPhone|iPad).*Safari/.test(navigator.userAgent);

        if (typeof window === 'object' && this.shouldAbsolutePositionReopenLink && !this.legacyBanner) {
            this.createResizeObserver();
        }
    },

    methods: {
        /**
         * Creates <body> ResizeObserver to watch for body content height changes, triggers watch.bodyHeight method
         */
        createResizeObserver () {
            if (typeof ResizeObserver !== 'function') return;

            const resizeCallback = entry => {
                window.requestAnimationFrame(() => {
                    const [{ contentRect: { height } }] = entry;
                    this.bodyHeight = height;
                });
            };
            this.bodyObserver = new ResizeObserver(resizeCallback);
            const bodyElement = document.documentElement || document.body;
            this.bodyObserver.observe(bodyElement);
        },

        /**
         * Triggered by watch.bodyHeight, calculates if body height is less than window height to absolutely position the reopen link
         */
        updateIsBodyHeightLessThanWindowHeight () {
            if (typeof window === 'object' && this.shouldHideBanner) {
                const reopenElementHeight = this.$refs?.reopenCookieBannerLink?.$el?.clientHeight || 0;
                this.isBodyHeightLessThanWindowHeight =
                        (window.innerHeight - reopenElementHeight) - document.body.offsetHeight > 0;
            }
        },

        /**
         * Actions for "Accept all cookies" button
         */
        acceptAllCookiesActions () {
            this.hideBanner().then(() => {
                this.setCookieBannerCookie('full');
                this.setLegacyCookieBannerCookie();
                this.dataLayerPush('full');
                this.resendEvents();
                this.dispatchCustomEvent();
                this.hideAllBanners();
                this.updateIsBodyHeightLessThanWindowHeight();
            });
        },

        /**
         * Actions for "Accept only required cookies" button
         */
        acceptOnlyNecessaryCookiesActions () {
            this.hideBanner().then(() => {
                this.setCookieBannerCookie('necessary');
                this.setLegacyCookieBannerCookie();
                this.dataLayerPush('necessary');
                this.resendEvents();
                this.removeUnnecessaryCookies();
                this.dispatchCustomEvent();
                this.hideAllBanners();
                this.updateIsBodyHeightLessThanWindowHeight();
            });
        },

        /**
         * Set focus to the cookie consent banner title for accessibility
         */
        focusOnTitle () {
            if (!this.legacyBanner && this.$refs.cookieBannerHeading) {
                this.$refs.cookieBannerHeading.focus();
            }
        },

        /**
         * Add keyboard handler
         */
        addKeyboardHandler () {
            if (this.$refs.cookieBanner && this.$refs.cookieBanner.$refs.megaModal) {
                this.$refs.cookieBanner.$refs.megaModal.addEventListener('keydown', this.setTabLoop);
            }
        },

        /**
         * Set the tab loop for accessibility
         */
        setTabLoop (e) {
            if (e.key === 'Tab') {
                if (e.shiftKey && e.target === this.$refs.cookieBannerHeading) {
                    this.$refs.buttonContainer.lastChild.focus();
                    e.preventDefault();
                } else if (!e.shiftKey && e.target === this.$refs.buttonContainer.lastChild) {
                    this.$refs.cookieBannerHeading.focus();
                    e.preventDefault();
                }
            }
        },

        /**
         * Hide the banner
         */
        hideBanner () {
            return new Promise(resolve => {
                resolve(this.shouldHideBanner = true);
            });
        },

        /**
         * Hide the legacy banners
         */
        hideAllBanners () {
            const allBanners = document.getElementsByClassName('cpOverlay');
            if (allBanners.length) {
                allBanners[0].classList.add('hideCPBanner');
            }
        },

        /**
         * Show the cookie consent banner
         */
        reopenBanner () {
            this.shouldHideBanner = false;
            this.$nextTick(() => {
                this.addKeyboardHandler();
                this.focusOnTitle();
            });
        },

        /**
         * Check if the cookie banner has been shown to this user
         */
        checkCookieBannerCookie () {
            if (this.legacyBanner) {
                this.shouldHideBanner = CookieHelper.get(LEGACY_CONSENT_COOKIE_NAME) === '130315';
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
                expires: this.cookieExpiry,
                domain: this.domain
            });
        },

        /**
         * Set the legacy cookie banner cookie
         */
        setLegacyCookieBannerCookie () {
            CookieHelper.set(LEGACY_CONSENT_COOKIE_NAME, '130315', {
                path: '/',
                expires: this.cookieExpiry,
                domain: this.domain
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
        },

        /**
         * Dispatch custom window event
         * */
        dispatchCustomEvent () {
            if (typeof window === 'object') {
                window.dispatchEvent(new CustomEvent('f-cookie-banner-accepted', {
                    detail: {
                        consentCookieName: this.consentCookieName,
                        cookieExclusionList: this.config.cookieExclusionList
                    }
                }));
            }
        }
    }
};
</script>

<style lang="scss" module>
[data-cookie-consent-overlay] {
    position: absolute;
    color: $color-content-default;
}

.c-cookieBanner-card {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: $color-container-default;
    z-index: 99999992;
}

.c-cookieBanner-text {
    margin: 0;
    padding: 0;
    @include font-size(body-s);
}

.c-cookieBanner-title {
    @include font-size(heading-m);
    margin: 0 0 spacing();
    padding: 0;
    color: $color-content-default;
    text-align: left;

    &:hover,
    &:focus {
        a {
            text-decoration: none;
        }
    }
}

.c-cookieBanner-content {
    margin: 0 auto;
    padding: spacing(f);
    text-align: left;
}

.reopen-link-wrapper {
    position: absolute;
    bottom: 0;
    width: 100%;
}

@include media ('<mid') {
    .c-cookieBanner-card {
        flex-direction: column;
        padding: spacing(d) 0;
    }

    .c-cookieBanner-ios {
        padding-bottom: 80px;
    }

    .c-cookieBanner-content,
    .c-cookieBanner-cta {
        padding: spacing(d) spacing(e) spacing(a);
    }
}

@include media ('>=mid') {
    .c-cookieBanner-cta {
        padding: spacing(f);
        min-width: 352px;
        margin: 0 auto;
    }
}

@include media('<=narrowMid') {
    .c-cookieBanner-title {
        @include font-size(heading-s);
    }
}
</style>
