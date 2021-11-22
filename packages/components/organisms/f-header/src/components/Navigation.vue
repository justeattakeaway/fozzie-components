<template>
    <nav
        v-if="hasNavigationLinks"
        ref="nav"
        aria-hidden="false"
        :class="[
            $style['c-nav'],
            $style['c-nav--global']
        ]"
        data-test-id="nav-container">
        <button
            :class="[
                'is-hidden--noJS',
                $style['c-nav-trigger'],
                $style['c-nav-toggle'],
                { [$style['c-nav-toggle--altColour']]: isAltColour },
                { [$style['is-open']]: navIsOpen }
            ]"
            :aria-expanded="navIsOpen ? 'true' : 'false'"
            :aria-label="copy.openMenuText"
            aria-haspopup="true"
            data-test-id="nav-toggle"
            type="button"
            @click="onNavToggle">
            <span :class="$style['c-nav-toggle-icon']" />
        </button>

        <input
            id="nav-trigger"
            v-model="navIsOpen"
            type="checkbox"
            :class="[
                'is-hidden',
                'is-shown--noJS',
                $style['c-nav-trigger']
            ]">

        <label
            :class="[
                'is-hidden',
                'is-shown--noJS',
                $style['c-nav-toggle'],
                { [$style['is-open']]: navIsOpen }
            ]"
            :aria-label="copy.openMenuText"
            for="nav-trigger">
            <span :class="$style['c-nav-toggle-icon']" />
        </label>

        <a
            v-if="showOffersLink && !navIsOpen"
            data-test-id="offers-iconLink"
            data-trak='{
                "trakEvent": "click",
                "category": "header",
                "action": "click - navigation",
                "label": "offers_icon"
            }'
            :href="copy.offers.url"
            :class="[
                $style['c-nav-featureLink'],
                $style['c-nav-featureLink--hideAboveMid']
            ]">
            <gift-icon
                :class="[
                    $style['c-nav-icon'],
                    $style['c-nav-icon--offers'],
                    { [$style['c-nav-icon--alt']]: isAltColour }
                ]" />
            <span class="is-visuallyHidden">
                {{ copy.offers.text }}
            </span>
        </a>

        <div
            :class="[
                $style['c-nav-container'],
                { [$style['is-visible']]: navIsOpen }
            ]"
            data-test-id="nav-list-container">
            <ul
                :class="$style['c-nav-list']"
                data-test-id="nav-list">
                <nav-link
                    v-if="showOffersLink"
                    :text="copy.offers.text"
                    :tabindex="tabIndex"
                    :href="copy.offers.url"
                    :data-trak="analyticsObjects.navigation.offers.clickLink"
                    :is-alt-colour="isAltColour"
                    :background-theme="headerBackgroundTheme"
                    data-test-id="offers-link">
                    <template #icon>
                        <gift-icon
                            :class="[
                                $style['c-nav-icon'],
                                $style['c-nav-icon--offers'],
                                { [$style['c-nav-icon--alt']]: isAltColour }
                            ]" />
                    </template>
                </nav-link>

                <nav-link
                    v-if="showDeliveryEnquiry"
                    :text="copy.deliveryEnquiry.text"
                    :tabindex="tabIndex"
                    :href="copy.deliveryEnquiry.url"
                    :data-trak="analyticsObjects.navigation.clickHeaderLink({
                        label: copy.deliveryEnquiry.gtm
                    })"
                    :is-alt-colour="isAltColour"
                    :background-theme="headerBackgroundTheme"
                    target="_blank"
                    data-test-id="delivery-enquiry-link">
                    <template #icon>
                        <moped-icon
                            :class="[
                                $style['c-nav-icon'],
                                $style['c-nav-icon--delivery'],
                                { [$style['c-nav-icon--alt']]: isAltColour }
                            ]" />
                    </template>
                </nav-link>

                <li
                    :class="[
                        $style['c-nav-list-item--horizontallyAlignedAboveMid'],
                        $style['has-sublist'], {
                            'is-hidden': !userInfo || !showLoginInfo,
                            [$style['is-open']]: userMenuIsOpen
                        }]"
                    data-test-id="user-info-icon"
                    v-on="isBelowMid ? null : { mouseover: openUserMenu, mouseleave: closeUserMenu }"
                    @keyup.esc="closeUserMenu">
                    <a
                        data-test-id="user-info-link"
                        :tabindex="isBelowMid ? -1 : 0"
                        :aria-expanded="!isBelowMid && userMenuIsOpen ? 'true' : 'false'"
                        :aria-haspopup="isBelowMid ? false : true"
                        :class="$style['c-nav-list-text']"
                        href="/"
                        @click.prevent="onNavToggle">
                        <profile-icon
                            :class="[
                                $style['c-nav-icon'],
                                $style['c-nav-icon--profile'],
                                { [$style['c-nav-icon--alt']]: isAltColour }
                            ]" />
                        <span
                            :class="[
                                $style['c-nav-list-text-sub'],
                                { [$style['c-nav-list-link--alt']]: isAltColour },
                                { [$style['c-nav-list-link--transparent']]: headerBackgroundTheme === 'transparent' }
                            ]">
                            {{ userInfo.friendlyName }}
                        </span>
                        <span
                            :class="[
                                $style['c-nav-list-text-sub'],
                                $style['u-showBelowMid']
                            ]">
                            {{ userInfo.email }}
                        </span>
                    </a>

                    <v-popover :class="$style['c-nav-popover']">
                        <user-navigation-panel
                            :is-open="navIsOpen"
                            :is-below-mid="isBelowMid"
                            :is-country-selector-closed-on-mobile-view="isCountrySelectorClosedOnMobileView"
                            :copy="copy"
                            :return-logout-url="returnLogoutUrl"
                            @activateNav="openUserMenu"
                            @deactivateNav="closeUserMenu" />
                    </v-popover>
                </li>

                <nav-link
                    v-if="!userInfo && showLoginInfo"
                    :text="copy.accountLogin.text"
                    :tabindex="tabIndex"
                    :href="returnLoginUrl"
                    :data-trak="analyticsObjects.navigation.clickHeaderLink({
                        label: copy.accountLogin.gtm
                    })"
                    :is-alt-colour="isAltColour"
                    :background-theme="headerBackgroundTheme"
                    :left-padding-below-mid="!!userInfo"
                    rel="nofollow"
                    data-test-id="login-link" />

                <nav-link
                    v-if="showHelpLink"
                    :text="copy.help.text"
                    :tabindex="tabIndex"
                    :href="copy.help.url"
                    :data-trak="analyticsObjects.navigation.clickHeaderLink({
                        label: copy.help.gtm
                    })"
                    :is-alt-colour="isAltColour"
                    :left-padding-below-mid="!!userInfo"
                    :background-theme="headerBackgroundTheme"
                    data-test-id="help-link" />

                <nav-link
                    v-if="userInfo && isBelowMid && showLoginInfo"
                    :text="copy.accountLogout.text"
                    :tabindex="tabIndex"
                    :href="copy.accountLogout.url"
                    :data-trak="analyticsObjects.navigation.clickHeaderLink({
                        label: copy.accountLogout.gtm
                    })"
                    :is-alt-colour="isAltColour"
                    :left-padding-below-mid="!!userInfo"
                    :background-theme="headerBackgroundTheme"
                    data-test-id="logout-link" />

                <li
                    v-if="showCountrySelector"
                    data-test-id="country-selector"
                    :class="[
                        $style['c-nav-list-item--horizontallyAlignedAboveMid'],
                        $style['has-sublist'], {
                            [$style['is-open']]: countrySelectorIsOpen
                        }]"
                    v-on="isBelowMid ? null : { mouseover: openCountrySelector, mouseleave: closeCountrySelector }"
                    @keyup.esc="closeCountrySelector">
                    <button
                        ref="countrySelectorToggle"
                        type="button"
                        data-test-id="action-button-component"
                        :tabindex="tabIndex"
                        :class="[
                            $style['c-nav-list-text'],
                            $style['c-nav-list-btn']
                        ]"
                        :aria-expanded="isCountrySelectorOpenOnDesktopView ? 'true' : 'false'"
                        :aria-haspopup="!isBelowMid"
                        :aria-label="copy.countrySelector.changeCurrentCountry"
                        @click="onCountrySelectorToggle">
                        <span :class="$style['c-nav-list-iconWrapper']">
                            <flag-icon
                                data-test-id="current-flag-icon"
                                :country-code="copy.countrySelector.currentCountryKey"
                                :class="[
                                    $style['c-nav-list-icon--flag'],
                                    $style['c-nav-list-icon--flagCurrent']
                                ]" />
                        </span>
                        <span :class="$style['c-nav-list-title']">
                            {{ copy.countrySelector.selectYourCountryText }}
                        </span>
                    </button>

                    <v-popover
                        data-test-id="countrySelector-popover"
                        :aria-hidden="!countrySelectorIsOpen"
                        :class="[
                            $style['c-nav-popover'],
                            $style['c-nav-popover--countrySelector']
                        ]">
                        <country-selector-panel
                            :copy="copy"
                            :is-open="countrySelectorIsOpen"
                            :is-below-mid="isBelowMid"
                            @closeCountrySelector="closeCountrySelector"
                        />
                    </v-popover>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
// Fozzie imports
import { MopedIcon, GiftIcon, ProfileIcon } from '@justeat/f-vue-icons';
import { axiosServices, windowServices } from '@justeat/f-services';
import VPopover from '@justeat/f-popover';
import '@justeat/f-popover/dist/f-popover.css';

// Internal
import { countries } from '../tenants';
import analyticsObjects from '../services/analytics/objects';

export default {
    components: {
        CountrySelectorPanel: () => import('./CountrySelectorPanel.vue'),
        FlagIcon: () => import('./FlagIcon.vue'),
        GiftIcon,
        MopedIcon,
        NavLink: () => import('./NavLink.vue'),
        ProfileIcon,
        UserNavigationPanel: () => import('./UserNavigationPanel.vue'),
        VPopover
    },

    props: {
        copy: {
            type: Object,
            default: () => ({})
        },

        showDeliveryEnquiry: {
            type: Boolean,
            default: false
        },

        showOffersLink: {
            type: Boolean,
            default: false
        },

        showHelpLink: {
            type: Boolean,
            default: true
        },

        showLoginInfo: {
            type: Boolean,
            default: true
        },

        errorLog: {
            type: [Function, Boolean],
            default: false
        },

        userInfoProp: {
            type: [Object, Boolean],
            default: false
        },

        userInfoUrl: {
            type: String,
            default: '/api/account/details'
        },

        orderCountUrl: {
            type: String,
            default: '/analytics/ordercount'
        },

        isOrderCountSupported: {
            type: Boolean,
            default: true
        },

        headerBackgroundTheme: {
            type: String,
            default: 'white'
        },

        showCountrySelector: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            navIsOpen: false,
            userMenuIsOpen: false,
            currentScreenWidth: null,
            userInfo: this.userInfoProp,
            localOrderCountExpires: false,
            countrySelectorIsOpen: false,
            countries,
            midBreakpoint: 768
        };
    },

    computed: {
        analyticsObjects () {
            return analyticsObjects;
        },

        isBelowMid () {
            return this.currentScreenWidth <= this.midBreakpoint;
        },

        returnUrl () {
            if (this.$route) {
                return encodeURIComponent(this.$route.path);
            }
            if (typeof document !== 'undefined') {
                return encodeURIComponent(document.location.pathname);
            }
            return encodeURIComponent('/');
        },

        returnLoginUrl () {
            return `${this.copy.accountLogin.url}?returnurl=${this.returnUrl}`;
        },

        returnLogoutUrl () {
            return `${this.copy.accountLogout.url}?returnurl=${this.returnUrl}`;
        },

        // if the order count is supported and there is no blob in local storage then return true
        isOrderCountValid () {
            return this.isOrderCountSupported && !this.getAnalyticsBlob;
        },

        isOrderCountOutOfDate () {
            const currentTime = new Date().getTime();
            return this.localOrderCountExpires < currentTime;
        },

        isAltColour () {
            const isMobileNavOpen = this.navIsOpen && this.isBelowMid;
            return (this.headerBackgroundTheme === 'transparent' && !isMobileNavOpen) || this.headerBackgroundTheme === 'highlight';
        },

        /**
         * Gets the analytic blob for order count.
         *
         * @return {object} from local storage containing analytic data.
         */
        getAnalyticsBlob () {
            return window.localStorage.getItem('je-analytics') || false;
        },

        hasNavigationLinks () {
            return this.showOffersLink ||
                this.showHelpLink ||
                this.showDeliveryEnquiry ||
                this.showLoginInfo;
        },

        isCountrySelectorClosedOnMobileView () {
            return this.isBelowMid && !this.countrySelectorIsOpen;
        },

        isCountrySelectorOpenOnDesktopView () {
            return !this.isBelowMid && this.countrySelectorIsOpen;
        },

        tabIndex () {
            if (!this.isBelowMid) return 0;
            if (this.isBelowMid && this.isCountrySelectorClosedOnMobileView) return 0;
            return -1;
        }
    },

    watch: {
        userInfoProp (userInfo) {
            this.userInfo = userInfo;
        }
    },

    mounted () {
        if (this.showLoginInfo && !this.userInfo) {
            this.fetchUserInfo();
        }

        windowServices.addEvent('resize', this.onResize, 100);

        this.onResize();
    },

    destroyed () {
        windowServices.removeEvent('resize', this.onResize);
    },

    methods: {
        onNavToggle () {
            this.navIsOpen = !this.navIsOpen;
            if (this.showCountrySelector) {
                this.closeCountrySelector();
            }

            // This is added to remove the ability to scroll the page content when the mobile navigation is open
            this.handleMobileNavState();
            this.tabLoop();
        },

        /**
         * Handles user key presses to help improve acccessibilty for keyboard users.
         *
         * @param {Object} e Event object.
         */
        keyActions (e) {
            if (e.key === 'Escape') {
                this.onNavToggle();
            }

            if (e.key === 'Tab' && this.firstFocusableEl) {
                const { activeElement } = document;
                const isFirstElement = activeElement === this.firstFocusableEl;
                const isLastElement = activeElement === this.lastFocusableEl;

                if (e.shiftKey && isFirstElement) {
                    // If focused on first item and user presses back-tab, go to the last focusable item
                    this.lastFocusableEl.focus();

                    e.preventDefault();
                } else if (!e.shiftKey && isLastElement) {
                    // If focused on the last item and user presses tab, go to the first focusable item
                    this.firstFocusableEl.focus();

                    e.preventDefault();
                }
            }
        },

        /**
         * When mobile menu or country selector is opened build a NodeList of focusable elements, assigns the first and last focuable elements before
         * binding tab events via the keydown method
         */
        tabLoop () {
            if (!this.isBelowMid || !this.navIsOpen) return;

            // use `nextTick` to give Vue enough time to update the DOM
            this.$nextTick(() => {
                const focusableElsSelector = [
                    '[aria-hidden="false"] > a[href]:not([tabindex^="-"]):not([inert])',
                    '[aria-hidden="false"] > button:not([disabled]):not([inert])',
                    '[tabindex]:not([tabindex^="-"]):not([inert])'
                ].join();

                const {
                    nav
                } = this.$refs;

                // Filter any "hidden" elements
                const nodeList = nav.querySelectorAll(focusableElsSelector) || [];
                const focusableEls = Array.from(nodeList).filter(el => el.offsetHeight > 0);
                const {
                    0: firstFocusableEl,
                    [focusableEls.length - 1]: lastFocusableEl
                } = focusableEls;

                this.firstFocusableEl = firstFocusableEl;
                this.lastFocusableEl = lastFocusableEl;

                nav.addEventListener('keydown', this.keyActions);
            });
        },

        closeUserMenu () {
            this.userMenuIsOpen = false;
            this.handleMobileNavState();
        },

        openUserMenu () {
            this.userMenuIsOpen = true;
            this.handleMobileNavState();
        },

        onCountrySelectorToggle () {
            this.countrySelectorIsOpen = !this.countrySelectorIsOpen;
            this.tabLoop();
        },

        closeCountrySelector () {
            this.countrySelectorIsOpen = false;
            this.tabLoop();
            const {
                countrySelectorToggle
            } = this.$refs;
            countrySelectorToggle.focus();
        },

        openCountrySelector () {
            this.countrySelectorIsOpen = true;
        },

        onResize () {
            this.currentScreenWidth = windowServices.getWindowWidth();
        },

        handleMobileNavState () {
            if (this.isBelowMid) {
                this.$emit('onMobileNavToggle', this.navIsOpen);

                if (typeof document !== 'undefined') {
                    document.documentElement.classList.toggle('is-navInView', this.navIsOpen);
                    document.documentElement.classList.toggle('is-navInView--noPad', this.navIsOpen && this.headerBackgroundTheme === 'transparent');
                }
            }
        },

        // If userInfoProp wasn't passed we make a call for userInfo on mounted hook
        fetchUserInfo () {
            const client = axiosServices.createClient({
                headers: {
                    credentials: 'same-origin'
                }
            });

            return client
                .get(this.userInfoUrl)
                .then(({ data }) => {
                    if (data.isAuthenticated) {
                        this.userInfo = data;

                        if (this.isOrderCountValid) {
                            this.fetchOrderCountAndSave();
                        }
                    } else {
                        this.userInfo = false;
                    }
                })
                .catch(err => {
                    if (this.errorLog) {
                        this.errorLog('Unable to get user information from "fetchUserInfo"', err);
                    }
                });
        },

        // fetches the order count for the user
        fetchOrderCountAndSave () {
            const client = axiosServices.createClient({
                headers: {
                    credentials: 'same-origin'
                }
            });

            return client
                .get(this.orderCountUrl)
                .then(data => {
                    if (data && this.isOrderCountOutOfDate) {
                        this.setAnalyticsBlob(data);
                        this.localOrderCountExpires = data.Expires;
                        this.enrichUserDataWithCount(data.Count);
                        this.pushToDataLayer(this.userInfo);
                    }
                })
                .catch(err => {
                    if (this.errorLog) {
                        this.errorLog('Unable to get order count from "fetchOrderCountAndSave', err);
                    }
                });
        },

        /**
         * Sets the analytic blob for order count.
         *
         * @param {object} containing the analytic data for order count.
         */
        setAnalyticsBlob (data) {
            window.localStorage.setItem('je-analytics', JSON.stringify(data));
        },

        // Updates the user information with the count
        enrichUserDataWithCount (count) {
            this.userInfo.orderCount = count;
        },

        // Pushes the user info to the windows data layer
        pushToDataLayer (data) {
            window.dataLayer.push(data);
        }
    }
};
</script>

<style lang="scss" module>
@import '../assets/scss/navigation.scss';

.c-nav-container {
    display: none;
    @include media('>mid') {
        display: block;
    }
    &.is-visible {
        display: block;
    }
}
</style>
