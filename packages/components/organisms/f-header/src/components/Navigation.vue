<template>
    <nav
        v-if="hasNavigationLinks"
        class="c-nav c-nav--global"
        data-test-id="nav-container">
        <button
            :class="['c-nav-trigger c-nav-toggle is-hidden--noJS', navToggleThemeClass, {
                'is-open': navIsOpen
            }]"
            :aria-expanded="navIsOpen ? 'true' : 'false'"
            :aria-label="openMenuText"
            data-test-id="nav-toggle"
            type="button"
            @click="onNavToggle">
            <span class="c-nav-toggle-icon" />
        </button>

        <input
            id="nav-trigger"
            v-model="navIsOpen"
            type="checkbox"
            class="c-nav-trigger is-hidden is-shown--noJS">

        <label
            :class="['c-nav-toggle is-hidden is-shown--noJS', navToggleThemeClass, {
                'is-open': navIsOpen
            }]"
            :aria-label="openMenuText"
            for="nav-trigger">
            <span class="c-nav-toggle-icon" />
        </label>

        <a
            v-if="showOffersLink"
            data-test-id="offers-link"
            data-trak='{
                "trakEvent": "click",
                "category": "header",
                "action": "click - navigation",
                "label": "offers_icon"
            }'
            :href="offersCopy.url"
            class="c-nav-featureLink u-showBelowMid">
            <gift-icon class="c-nav-icon c-nav-icon--offers" />
            <span class="is-visuallyHidden">
                {{ offersCopy.text }}
            </span>
        </a>

        <div
            :class="['c-nav-container', { 'is-visible': navIsOpen }]">
            <ul class="c-nav-list">
                <li
                    v-if="showOffersLink"
                    class="c-nav-list-item">
                    <a
                        data-test-id="offers-link"
                        data-trak='{
                            "trakEvent": "click",
                            "category": "header",
                            "action": "click - navigation",
                            "label": "offers"
                        }'
                        :href="offersCopy.url"
                        class="c-nav-list-link u-showAboveMid">
                        <gift-icon class="c-nav-icon c-nav-icon--offers" />
                        {{ offersCopy.text }}
                    </a>
                </li>
                <li
                    v-if="showDeliveryEnquiry && !isBelowMid"
                    class="c-nav-list-item"
                    data-test-id="delivery-enquiry">
                    <a
                        :data-trak='`{
                            "trakEvent": "click",
                            "category": "engagement",
                            "action": "header",
                            "label": "${deliveryEnquiry.gtm}"
                        }`'
                        :href="deliveryEnquiry.url"
                        target="_blank"
                        class="c-nav-list-link"
                        data-test-id="delivery-link">
                        <delivery-icon class="c-nav-icon c-nav-icon--delivery" />
                        {{ deliveryEnquiry.text }}
                    </a>
                </li>

                <li
                    :class="['c-nav-list-item has-sublist', {
                        'is-hidden': !userInfo || !showLoginInfo,
                        'open': navIsOpen
                    }]"
                    data-test-id="user-info-icon"
                    v-on="isBelowMid ? null : { mouseover: openNav, mouseleave: closeNav }"
                    @keyup.esc="closeNav">
                    <a
                        :tabindex="isBelowMid ? -1 : 0"
                        :aria-expanded="!isBelowMid && navIsOpen ? 'true' : 'false'"
                        :aria-haspopup="isBelowMid ? false : true"
                        class="c-nav-list-text"
                        href="/"
                        @click.prevent="onNavToggle">
                        <profile-icon class="c-nav-icon c-nav-icon--profile" />
                        <span class="c-nav-list-text-sub">
                            {{ userInfo.friendlyName }}
                        </span>
                        <span class="c-nav-list-text-sub u-showBelowMid">
                            {{ userInfo.email }}
                        </span>
                    </a>

                    <ul
                        :aria-label="userInfo.friendlyName"
                        class="c-nav-popoverList">
                        <li
                            v-for="(link, index) in navLinks"
                            :key="index"
                            data-test-id="nav-links"
                            class="c-nav-list-item">
                            <a
                                :tabindex="navIsOpen ? 0 : -1"
                                :href="link.url"
                                :data-trak='`{
                                    "trakEvent": "click",
                                    "category": "engagement",
                                    "action": "header",
                                    "label": "${link.gtm}"
                                }`'
                                class="c-nav-list-link"
                                @blur="closeNav"
                                @focus="openNav">
                                {{ link.text }}
                            </a>
                        </li>

                        <li
                            v-if="!isBelowMid"
                            class="c-nav-list-item"
                            data-test-id="logout">
                            <a
                                :tabindex="navIsOpen ? 0 : -1"
                                :href="returnLogoutUrl"
                                :data-trak='`{
                                    "trakEvent": "click",
                                    "category": "engagement",
                                    "action": "header",
                                    "label": "${accountLogout.gtm}"
                                }`'
                                class="c-nav-list-link"
                                @blur="closeNav"
                                @focus="openNav">
                                {{ accountLogout.text }}
                            </a>
                        </li>
                    </ul>
                </li>

                <li
                    v-if="!userInfo && showLoginInfo"
                    class="c-nav-list-item"
                    data-test-id="login">
                    <a
                        :href="returnLoginUrl"
                        :data-trak='`{
                            "trakEvent": "click",
                            "category": "engagement",
                            "action": "header",
                            "label": "${accountLogin.gtm}"
                        }`'
                        rel="nofollow"
                        class="c-nav-list-link"
                        data-test-id="login-link">
                        {{ accountLogin.text }}
                    </a>
                </li>

                <li
                    v-if="showHelpLink"
                    class="c-nav-list-item c-nav-list-item--support">
                    <a
                        :href="help.url"
                        :data-trak='`{
                                "trakEvent": "click",
                                "category": "engagement",
                                "action": "header",
                                "label": "${help.gtm}"
                            }`'
                        class="c-nav-list-link"
                        data-test-id="help-link"
                        v-on="isBelowMid ? { blur: closeNav, focus: openNav } : null">
                        {{ help.text }}
                    </a>
                </li>

                <li
                    v-if="userInfo && isBelowMid && showLoginInfo"
                    class="c-nav-list-item"
                    data-test-id="logout">
                    <a
                        :tabindex="navIsOpen ? 0 : -1"
                        :href="returnLogoutUrl"
                        :data-trak='`{
                                "trakEvent": "click",
                                "category": "engagement",
                                "action": "header",
                                "label": "${accountLogout.gtm}"
                            }`'
                        class="c-nav-list-link"
                        v-on="isBelowMid ? { blur: closeNav, focus: openNav } : null">
                        {{ accountLogout.text }}
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import {
    DeliveryIcon,
    GiftIcon,
    ProfileIcon
} from '@justeat/f-vue-icons';
import {
    axiosServices,
    windowServices
} from '@justeat/f-services';

export default {
    components: {
        DeliveryIcon,
        GiftIcon,
        ProfileIcon
    },

    props: {
        accountLogin: {
            type: Object,
            default: () => ({})
        },

        accountLogout: {
            type: Object,
            default: () => ({})
        },

        navLinks: {
            type: Object,
            required: true
        },

        help: {
            type: Object,
            default: () => ({})
        },

        openMenuText: {
            type: String,
            default: ''
        },

        deliveryEnquiry: {
            type: Object,
            default: () => ({})
        },

        showDeliveryEnquiry: {
            type: Boolean,
            default: false
        },

        offersCopy: {
            type: Object,
            default: () => ({})
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
        }
    },

    data () {
        return {
            navIsOpen: false,
            currentScreenWidth: null,
            userInfo: this.userInfoProp,
            localOrderCountExpires: false
        };
    },

    computed: {
        isBelowMid () {
            return this.currentScreenWidth < 768;
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
            return `${this.accountLogin.url}?returnurl=${this.returnUrl}`;
        },

        returnLogoutUrl () {
            return `${this.accountLogout.url}?returnurl=${this.returnUrl}`;
        },

        // if the order count is supported and there is no blob in local storage then return true
        isOrderCountValid () {
            return this.isOrderCountSupported && !this.getAnalyticsBlob;
        },

        isOrderCountOutOfDate () {
            const currentTime = new Date().getTime();
            return this.localOrderCountExpires < currentTime;
        },

        navToggleThemeClass () {
            return this.headerBackgroundTheme === 'highlight' ? 'c-nav-toggle--altColour' : '';
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
            // This is added to remove the ability to scroll the page content when the mobile navigation is open
            this.handleMobileNavState();
        },

        closeNav () {
            this.navIsOpen = false;
            this.handleMobileNavState();
        },

        openNav () {
            this.navIsOpen = true;
            this.handleMobileNavState();
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

<style lang="scss">
// TODO - Pull in fozzie utilities css instead
// https://github.com/justeat/fozzie/blob/f7f0184ba3a244c19d6e83c44c35a31b7c2dd2d9/src/scss/trumps/_utilities.scss
// Hide from both screenreaders and browsers: h5bp.com/u
.is-hidden,
.no-js .is-hidden--noJS {
    display: none !important;
    visibility: hidden !important;
}

.is-shown,
.no-js .is-shown--noJS {
    display: block !important;
    visibility: visible !important;
}

// Hide only visually, but have it available for screenreaders: h5bp.com/v
.is-visuallyHidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}

/**
 * Global Page Navigation
 * =================================
 * Styles relating to the global site navigation
 *
 */

$nav-text-size                     : 'body-l';
$nav-text-size--narrow             : 'body-s';
$nav-text-color                    : $color-link-default;
$nav-text-color--hover             : $color-link-hover;
$nav-text-color--narrow            : $grey--dark;
$nav-text-color--transparent       : $white;
$nav-text-weight                   : $font-weight-bold;
$nav-text-subFont                  : $font-family-base;
$nav-icon-color                    : $color-secondary;
$nav-icon-color--transparent       : $white;
$nav-transition-duration           : 250ms;

$nav-featureLinkIcon-width         : 28px;
$nav-featureLinkIcon-height        : 28px;

$nav-trigger-width                 : 56px;
$nav-trigger-height                : 48px;
$nav-trigger-focus-color           : $blue;
$nav-trigger-focus-bg              : $blue--offWhite;
$nav-toggleIcon-left               : spacing(x2);
$nav-toggleIcon-width              : 21px;
$nav-toggleIcon-height             : 2px;
$nav-toggleIcon-borderRadius       : 1px;
$nav-toggleIcon-color              : $color-secondary;
$nav-toggleIcon-color--transparent : $white;
$nav-toggleIcon-bg                 : transparent;
$nav-toggleIcon-space              : 5px;

$nav-tooltip-width                 : 10px;

$nav-popover-width                 : 300px;
$nav-popover-radius                : 3px;
$nav-popover-transition-duration   : 200ms;
$nav-popover-transition-delay      : 200ms;
$nav-popover-padding               : spacing(x2);


@mixin nav-container-visible () {
    overflow-y: auto;
    left: 0;
    opacity: 1;
    z-index: zIndex(high);
    transition: opacity $nav-transition-duration ease-in-out,
                z-index 0s linear;
}

// removes scroll
.is-navInView {
    @include media('<mid') {
        overflow: hidden;

        body {
            position: fixed;
            width: 100%;
            padding-top: $header-height--narrow;
        }
    }
}

// If the header is already fixed/absolute (like when the header is transparent)
// then the content doesn't need to be padded down when the nav comes into view, as it's already flush with the top of the screen
// This is added in the f-header JS
.is-navInView--noPad {
    body {
        padding-top: 0;
    }
}

// Global site-wide navigation
.c-nav--global {
    @include media('>=mid') {
        display: flex;
        justify-content: flex-end;
        flex-grow: 1;
    }

    // we have a nav container so that we don’t have to make the inner list 100% height
    // this is so we can position the logout button last on mobile
    & .c-nav-container {
        @include media('<mid') {
            position: fixed;
            top: $header-height--narrow;
            left: -99999px;
            width: 100%;
            padding: 0;
            height: calc(100% - (#{$header-height--narrow}));
            border-top: $header-separator solid $header-border-color;
            background: $white;
            z-index: -1;
            opacity: 0;
            transition: opacity $nav-transition-duration ease-in-out,
                        z-index 0s linear $nav-transition-duration,
                        left 0s linear ($nav-popover-transition-delay + $nav-popover-transition-duration);

            &.is-visible {
                @include nav-container-visible();
            }
        }
    }
}

.c-nav-list {
    position: relative;
}
.c-nav-list,
.c-nav-popoverList {
    margin-top: 0;
    margin-left: 0;
    padding: 0;
    list-style: none;
    list-style-image: none;

    & > li {
        margin-bottom: 0;

        &:before {
            content: none;
        }
    }

    @include media('<mid') {
        display: flex;
        flex-direction: column;
    }
}
    .c-nav-list-item {
        margin-bottom: 0;

        // TODO: MAKE THIS NOT USE FLOATS
        // global modifier for list items horizontally aligned
        .c-nav--global & {
            @include media('>=mid') {
                float: left;
            }
        }
    }

    // Modifier to position a nav-list-item at the bottom of the mobile navigation
    // As an example, this is used on the logout link on the global site
    // Logout is in the popover list, but at the bottom of the
    .c-nav-list-item--forceLast {
        @include media('<mid') {
            position: absolute;
            top: 100%;
            width: 100%;
        }
    }
        .c-nav-list-link,
        .c-nav-list-text {
            display: block;
            padding: spacing(x1.5) spacing(x2);
            margin: 0;
            font-family: $nav-text-subFont;
            color: $nav-text-color--narrow;
            @include font-size($nav-text-size--narrow);
            font-weight: 300;
            text-decoration: none;
            border-bottom: 1px solid $grey--light;

            @include media('>=mid') {
                @include font-size($nav-text-size);
                font-weight: $nav-text-weight;
                color: $nav-text-color;
                border-bottom: none;

                // the following styles align the elements vertically to the height of the header bar
                // don’t need a fallback, as it degrades gracefully
                display: flex;
                align-items: center;
                height: $header-height;

                .c-header--highlightBg &,
                .c-header--transparent & {
                    color: $nav-text-color--transparent;
                }
            }
        }
        .c-nav-list-text-sub {
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 300px;

            &.u-showBelowMid {
                @include media('>=mid') {
                    display: none !important;
                }
            }
        }

        .c-nav-list-link {
            &:hover,
            &:focus,
            &:active {
                text-decoration: none;

                @include media('>=mid') {
                    color: $nav-text-color--hover;
                    text-decoration: underline;

                    .c-header--highlightBg,
                    .c-header--transparent & {
                        color: $nav-text-color--transparent;
                    }

                    .c-header--transparent .c-nav-popoverList & {
                        color: inherit;
                    }
                }
            }
        }

    .has-sublist {
        // ensures the dropdown/popover is relative to the hover element, on wider views
        @include media('>=mid') {
            position: relative;
            cursor: pointer;
        }
    }

    .c-nav-featureLink {
        display: block;
        width: $nav-featureLinkIcon-width;
        height: $nav-featureLinkIcon-height;

        @include media('<mid') {
            position: absolute;
            top: 0;
            right: 0;
            width: spacing(x2) + $nav-featureLinkIcon-width + spacing(x2); // includes padding on both sides
            height: spacing(x2) + $nav-featureLinkIcon-height + spacing(x2);
            padding: spacing(x2);
        }

    }

    // Icons, such as the profile icon
    .c-nav-icon {
        float: left;
        margin-right: spacing();

        @include media('>=mid') {
            & path {
                fill: $nav-icon-color;

                .c-header--highlightBg &,
                .c-header--transparent & {
                    fill: $nav-icon-color--transparent;
                }
            }
        }
    }

    .c-nav-icon--profile {
        width: 20px;
        height: 22px;
    }

    .c-nav-icon--delivery {
        width: 27px;
        height: 22px;
    }

    .c-nav-icon--offers {
        width: $nav-featureLinkIcon-width;
        height: $nav-featureLinkIcon-height;

        & path {
            fill: $nav-icon-color;

            .c-header--highlightBg &,
            .c-header--transparent & {
                fill: $nav-icon-color--transparent;
            }
        }
    }

// Nav Popover list
// Used for a list of navigation items that drops down when hovering over a list item in the navigation
// (only appears on wider views, so all wrapped in media query)
.c-nav-popoverList {
    @include media('>=mid') {
        position: absolute;
        top: 100%;
        right: 99999px; // offscreen, so can’t ever be hovered over by default
        width: $nav-popover-width;
        background-color: $white;
        border: 1px solid $color-border;
        box-shadow: 0 2px 40px rgba(0, 0, 0, 0.2);
        border-top: 0;
        border-radius: 0 0 $nav-popover-radius $nav-popover-radius;
        padding: 0 $nav-popover-padding;
        opacity: 0;
        z-index: -1;
        transition: opacity $nav-popover-transition-duration ease-in-out $nav-popover-transition-delay,
                    z-index 0s linear ($nav-popover-transition-delay + $nav-popover-transition-duration),
                    right 0s linear ($nav-popover-transition-delay + $nav-popover-transition-duration);

        // tooltip arrow
        &:before {
            bottom: 100%;
            right: 10%;
            border: $nav-tooltip-width solid transparent;
            border-bottom: $nav-tooltip-width solid $white;
            content: '';
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
        }

        & .c-nav-list-item {
            float: none;
            border-bottom: 1px solid $grey--light;

            &:last-child {
                border-bottom: none;

                & .c-nav-list-link,
                & .c-nav-list-text {
                    border-radius: 0 0 $nav-popover-radius $nav-popover-radius;
                }
            }
        }

            & .c-nav-list-link,
            & .c-nav-list-text {
                font-family: $nav-text-subFont;
                font-weight: 300;
                color: $grey--dark;
                height: auto;

                &:hover,
                &:focus {
                    font-weight: 500;
                    text-decoration: none;
                }
            }

        // display the popover when our parent item is hovered(recieved class .open)
        .has-sublist.open & {
            opacity: 1;
            z-index: zIndex(high);
            right: 0;

            transition: opacity $nav-popover-transition-duration ease-in-out,
                        z-index 0s linear;
        }
    }
}

// Navigation Trigger
// This is the checkbox that controls the menu active state without JS via :checked
.c-nav-trigger {
    position: absolute;
    width: $nav-trigger-width;
    height: $nav-trigger-height;
    top: -100px;
    left: -100px;

    @include media('>=mid') {
        display: none;
    }

    &:checked ~ .c-nav-container {
        @include media('<mid') {
            @include nav-container-visible();
        }
    }

    &:focus ~ .c-nav-toggle {
        background-color: $nav-trigger-focus-bg;
        box-shadow: 0 0 6px 0 $nav-trigger-focus-color;

        .c-header--transparent & {
            background-color: transparent;
        }
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
    @include media('>=mid') {
        display: none;

        &.is-shown--noJS {
            display: none !important;
        }
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
                background-color: $white;
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
