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
                { [$style['c-nav-toggle--altColour']]: isAltColour || (headerBackgroundTheme === 'highlight' && navIsOpen) },
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
                    $style['c-nav-icon-offers-feature'],
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
                <li
                    v-for="(customNavLink, index) in customNavLinks"
                    :key="`custom-nav-link-${index}`"
                    :class="$style['c-nav-list-item--horizontallyAlignedAboveMid']">
                    <nav-link
                        :tabindex="tabIndex"
                        :text="customNavLink.text"
                        :href="customNavLink.url"
                        :data-trak="customNavLink.gtm && analyticsObjects.navigation.clickHeaderLink({ ...customNavLink.gtm })"
                        :is-alt-colour="isAltColour"
                        :background-theme="headerBackgroundTheme" />
                </li>

                <li
                    v-if="showOffersLink"
                    :class="$style['c-nav-list-item--horizontallyAlignedAboveMid']">
                    <nav-link
                        :text="copy.offers.text"
                        :tabindex="tabIndex"
                        :href="copy.offers.url"
                        :class="$style['c-nav-list-link-withBorderBottom']"
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
                </li>

                <li
                    v-if="showDeliveryEnquiry"
                    :class="$style['c-nav-list-item--horizontallyAlignedAboveMid']">
                    <nav-link
                        :text="copy.deliveryEnquiry.text"
                        :tabindex="tabIndex"
                        :class="$style['c-nav-list-link-withBorderBottom']"
                        :href="copy.deliveryEnquiry.url"
                        :data-trak="analyticsObjects.navigation.clickHeaderLink({
                            label: copy.deliveryEnquiry.gtm
                        })"
                        :is-alt-colour="isAltColour"
                        :background-theme="headerBackgroundTheme"
                        target="_blank"
                        rel="noopener noreferrer"
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
                </li>

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
                    <button
                        type="button"
                        data-test-id="user-info-link"
                        :tabindex="isBelowMid ? -1 : 0"
                        :aria-expanded="!isBelowMid && userMenuIsOpen ? 'true' : 'false'"
                        :aria-haspopup="isBelowMid ? false : true"
                        :aria-label="copy.userMenu.buttonLabel(userInfo.friendlyName)"
                        :class="[
                            $style['c-nav-list-text'],
                            $style['c-nav-list-btn']
                        ]"
                        @click.prevent="toggleUserMenu"
                        @keydown.space.prevent="toggleUserMenu">
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
                    </button>

                    <v-popover :class="$style['c-nav-popover']">
                        <user-navigation-panel
                            :is-user-menu-open="userMenuIsOpen"
                            :is-nav-open="navIsOpen"
                            :is-below-mid="isBelowMid"
                            :is-country-selector-open="countrySelectorIsOpen"
                            :copy="copy"
                            :return-logout-url="returnLogoutUrl"
                            @activateNav="openUserMenu"
                            @deactivateNav="closeUserMenu" />
                    </v-popover>
                </li>

                <li
                    v-if="!userInfo && showLoginInfo"
                    :class="$style['c-nav-list-item--horizontallyAlignedAboveMid']">
                    <nav-link
                        :text="copy.accountLogin.text"
                        :tabindex="tabIndex"
                        :href="returnLoginUrl"
                        :data-trak="analyticsObjects.navigation.clickHeaderLink({
                            label: copy.accountLogin.gtm
                        })"
                        :is-alt-colour="isAltColour"
                        :background-theme="headerBackgroundTheme"
                        rel="nofollow"
                        data-test-id="login-link" />
                </li>

                <li
                    v-if="showHelpLink"
                    :class="$style['c-nav-list-item--horizontallyAlignedAboveMid']">
                    <nav-link
                        :text="copy.help.text"
                        :tabindex="tabIndex"
                        :class="[
                            $style['c-nav-list-link-withBorderTop'],
                            $style['c-nav-list-link-withBorderBottom']]"
                        :href="copy.help.url"
                        :data-trak="analyticsObjects.navigation.clickHeaderLink({
                            label: copy.help.gtm
                        })"
                        :is-alt-colour="isAltColour"
                        :background-theme="headerBackgroundTheme"
                        data-test-id="help-link" />
                </li>

                <li
                    v-if="userInfo && isBelowMid && showLoginInfo"
                    :class="$style['c-nav-list-item--horizontallyAlignedAboveMid']">
                    <nav-link
                        v-if="userInfo && isBelowMid && showLoginInfo"
                        :text="copy.accountLogout.text"
                        :tabindex="tabIndex"
                        :class="{ [$style['c-nav-list-link-withBorderBottom']]: showLoginInfo }"
                        :href="copy.accountLogout.url"
                        :data-trak="analyticsObjects.navigation.clickHeaderLink({
                            label: copy.accountLogout.gtm
                        })"
                        :is-alt-colour="isAltColour"
                        :background-theme="headerBackgroundTheme"
                        data-test-id="logout-link" />
                </li>

                <li
                    v-if="showCountrySelector"
                    :class="$style['c-nav-list-item--horizontallyAlignedAboveMid']">
                    <country-selector
                        :is-below-mid="isBelowMid"
                        :copy="copy.countrySelector"
                        :tabindex="tabIndex"
                        data-test-id="country-selector"
                        @close-country-selector="closeCountrySelector"
                        @open-country-selector="openCountrySelector"
                        @toggle-country-selector="onCountrySelectorToggle" />
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

// Internal
import CountrySelector from './CountrySelector.vue';
import NavLink from './NavLink.vue';
import UserNavigationPanel from './UserNavigationPanel.vue';
import { countries } from '../tenants';
import analyticsObjects from '../services/analytics/objects';

export default {
    name: 'HeaderNavigation',
    components: {
        CountrySelector,
        GiftIcon,
        MopedIcon,
        NavLink,
        ProfileIcon,
        UserNavigationPanel,
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
        },

        customNavLinks: {
            type: Array,
            default: () => [],
            validator: links => links.every(link => link.text && link.url)
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
            return ['transparent', 'highlight'].includes(this.headerBackgroundTheme) && !isMobileNavOpen;
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
                this.showLoginInfo ||
                this.customNavLinks.length > 0;
        },

        tabIndex () {
            if (!this.isBelowMid || !this.countrySelectorIsOpen) return 0;
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

            if (this.isBelowMid && this.navIsOpen) {
                // This is added to remove the ability to scroll the page content when the mobile navigation is open
                this.handleMobileNavState();

                this.tabLoop();
            }
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
            const { nav } = this.$refs;

            if (!this.isBelowMid || !this.navIsOpen) {
                // If we're not in mobile view and the nav is not open,
                // we want to remove the event listener if it already exists
                nav.removeEventListener('keydown', this.keyActions);
                return;
            }

            // use `nextTick` to give Vue enough time to update the DOM
            this.$nextTick(() => {
                const focusableElsSelector = [
                    '[aria-hidden="false"] > a[href]:not([tabindex^="-"]):not([inert])',
                    '[aria-hidden="false"] > button:not([disabled]):not([inert])',
                    '[tabindex]:not([tabindex^="-"]):not([inert])'
                ].join();

                // Filter any "hidden" elements
                const nodeList = nav.querySelectorAll(focusableElsSelector) || [];
                const focusableEls = Array.from(nodeList).filter(el => el.offsetHeight > 0);
                const {
                    0: firstFocusableEl,
                    [focusableEls.length - 1]: lastFocusableEl
                } = focusableEls;

                this.firstFocusableEl = firstFocusableEl;
                this.lastFocusableEl = lastFocusableEl;

                // Add loop-handling event listener
                nav.addEventListener('keydown', this.keyActions);
            });
        },

        toggleUserMenu () {
            return this.userMenuIsOpen ? this.closeUserMenu() : this.openUserMenu();
        },

        closeUserMenu () {
            this.userMenuIsOpen = false;
        },

        openUserMenu () {
            this.userMenuIsOpen = true;
        },

        onCountrySelectorToggle () {
            this.countrySelectorIsOpen = !this.countrySelectorIsOpen;
            this.tabLoop();
        },

        closeCountrySelector () {
            this.countrySelectorIsOpen = false;
            this.tabLoop();
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
        height: $header-height;
    }
    &.is-visible {
        display: block;
    }
}

.c-nav-list-text-sub {
    display: block;
    overflow: hidden;
    &.u-showBelowMid {
        @include media('>mid') {
            display: none !important;
        }
    }
}

.c-nav-featureLink {
    width: $nav-featureLinkIcon-width;
    height: $nav-featureLinkIcon-height;

    & path {
            fill: $nav-icon-color;
        }

    @include media('<=mid') {
        position: absolute;
        top: 0;
        right: 0;
        width: spacing(d) + $nav-featureLinkIcon-width + spacing(d); // includes padding on both sides
        height: spacing(d) + $nav-featureLinkIcon-height + spacing(d);
        padding: spacing(d);
    }
}

.c-nav-featureLink--hideAboveMid {
    @include media('>mid') {
        display: none;
    }
}

.c-nav-list-text {
    font-weight: $nav-text-weight;
    @include media('<=mid') {
        padding: spacing(c) spacing(a);
        font-weight: $font-weight-regular;
    }
}

// Icons, such as the profile icon
.c-nav-icon {
    float: left;
    margin-right: spacing();
    width: $nav-icon-size;
    height: $nav-icon-size;

    @include media('>mid') {
        & path {
            fill: $nav-icon-color;
        }
    }
}

.c-nav-icon--delivery,
.c-nav-icon--offers {
    @include media('<=mid') {
        margin-left: spacing(d);
        margin-top: spacing(c);
        & path {
            fill: $nav-icon-color--mobileWhiteBg;
        }
    }
}

.c-nav-icon--profile {
    @include media('<=mid') {
        margin-left: spacing(c);
        margin-right: spacing(d);
        & path {
            fill: $nav-icon-color--mobileWhiteBg;
        }
    }
}

.c-nav-icon--alt {
    & path {
        fill: $nav-icon-color--transparent;
    }
}

// Navigation Toggle
// Only shown at narrow widths (Hamburger Menu icon)
.c-nav-toggle {
    position: absolute;
    top: 0;
    left: 0;
    width: $nav-trigger-width;
    height: $nav-trigger-height;
    cursor: pointer;
    background-color: $nav-toggleIcon-bg;
    border: none;

    // hide on wider views
    @include media('>mid') {
        display: none;
    }
}

// The Toggle Icon (hamburger icon)
.c-nav-toggle-icon {
    display: block;
    top: 50%;
    left: $nav-toggleIcon-left;
    width: $nav-toggleIcon-width;
    text-indent: -150px;
    white-space: nowrap;
    transition: background-color $nav-transition-duration ease-in;

    // Apply these styles to the base icon element and its created pseudo elements
    &,
    &:before,
    &:after {
        position: absolute;
        height: $nav-toggleIcon-height;
        background-color: $nav-toggleIcon-color;
        border-radius: $nav-toggleIcon-borderRadius;

        .c-header--transparent & {
            background-color: $nav-toggleIcon-color--transparent;
        }

        .c-nav-toggle--altColour & {
            background-color: $color-container-default;
        }
    }

    &:before,
    &:after {
        content: '';
        width: 100%;
        left: 0;
        transition: all $nav-transition-duration ease-in-out;
    }
    &:before {
        top: -($nav-toggleIcon-space + $nav-toggleIcon-height);
    }
    &:after {
        top: ($nav-toggleIcon-space + $nav-toggleIcon-height);
    }
}

// Icon active state
// Shown when the checkbox is checked or the `is-open` class is present.
.c-nav-trigger:checked ~ .c-nav-toggle,
.c-nav-toggle.is-open {
    & > .c-nav-toggle-icon {
        background-color: $nav-toggleIcon-bg;

        &:before,
        &:after {
            top: 0;
        }
        &:before {
            transform: rotate(45deg);
        }
        &:after {
            transform: rotate(-45deg);
        }
    }
}
</style>
