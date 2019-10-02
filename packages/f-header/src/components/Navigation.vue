<template>
    <nav class="c-nav c-nav--global">
        <button
            data-js-test="nav-toggle"
            :class="['c-nav-trigger c-nav-toggle is-hidden--noJS', {
                'is-open': navIsOpen
            }]"
            type="button"
            :aria-expanded="navIsOpen ? 'true' : 'false'"
            :aria-label="openMenuText"
            @click="onHamburgerMenuClick">
            <span class="c-nav-toggle-icon" />
        </button>

        <input
            id="nav-trigger"
            v-model="navIsOpen"
            type="checkbox"
            class="c-nav-trigger is-hidden is-shown--noJS">

        <label
            :class="['c-nav-toggle is-hidden is-shown--noJS', {
                'is-open': navIsOpen
            }]"
            for="nav-trigger"
            :aria-label="openMenuText">
            <span class="c-nav-toggle-icon" />
        </label>

        <div
            :class="['c-nav-container', { 'is-visible': navIsOpen }]">
            <ul class="c-nav-list">
                <li
                    v-if="showDeliveryEnquiry && !isBelowMid"
                    class="c-nav-list-item"
                    data-js-test="delivery-enquiry">
                    <a
                        :data-trak='`{
                            "trakEvent": "click",
                            "category": "engagement",
                            "action": "header",
                            "label": "${deliveryEnquiry.gtm}"
                        }`'
                        :href="deliveryEnquiry.url"
                        target="_blank"
                        class="c-nav-list-link">
                        <delivery-icon class="c-nav-icon c-nav-icon--delivery" />
                        {{ deliveryEnquiry.text }}
                    </a>
                </li>

                <li
                    :class="['c-nav-list-item has-sublist', { 'is-hidden': !userInfo, 'open': navIsOpen }]"
                    @mouseover="openNav"
                    @mouseleave="closeNav"
                    @keyup.esc="closeNav">
                    <a
                        class="c-nav-list-text"
                        href="/"
                        :tabindex="isBelowMid ? -1 : 0"
                        :aria-expanded="!isBelowMid && navIsOpen ? 'true' : 'false'"
                        :aria-haspopup="isBelowMid ? false : true"
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
                        class="c-nav-popoverList"
                        :aria-label="userInfo.friendlyName">
                        <li
                            v-for="(link, index) in navLinks"
                            :key="index"
                            data-js-test="nav-links"
                            class="c-nav-list-item">
                            <a
                                :tabindex="navIsOpen ? 0 : -1"
                                class="c-nav-list-link"
                                :href="link.url"
                                :data-trak='`{
                                    "trakEvent": "click",
                                    "category": "engagement",
                                    "action": "header",
                                    "label": "${link.gtm}"
                                }`'
                                @blur="closeNav"
                                @focus="openNav">
                                {{ link.text }}
                            </a>
                        </li>

                        <li
                            v-if="!isBelowMid"
                            class="c-nav-list-item"
                            data-js-test="logout">
                            <a
                                :tabindex="navIsOpen ? 0 : -1"
                                class="c-nav-list-link"
                                :href="returnLogoutUrl"
                                :data-trak='`{
                                    "trakEvent": "click",
                                    "category": "engagement",
                                    "action": "header",
                                    "label": "${accountLogout.gtm}"
                                }`'
                                @blur="closeNav"
                                @focus="openNav">
                                {{ accountLogout.text }}
                            </a>
                        </li>
                    </ul>
                </li>

                <li
                    v-if="!userInfo"
                    class="c-nav-list-item"
                    data-js-test="login">
                    <a
                        :href="returnLoginUrl"
                        rel="nofollow"
                        class="c-nav-list-link"
                        :data-trak='`{
                            "trakEvent": "click",
                            "category": "engagement",
                            "action": "header",
                            "label": "${accountLogin.gtm}"
                        }`'>
                        {{ accountLogin.text }}
                    </a>
                </li>

                <template v-if="isBelowMid">
                    <li class="c-nav-list-item c-nav-list-item--support">
                        <a
                            :href="help.url"
                            class="c-nav-list-link"
                            :data-trak='`{
                                "trakEvent": "click",
                                "category": "engagement",
                                "action": "header",
                                "label": "${help.gtm}"
                            }`'
                            @blur="closeNav"
                            @focus="openNav">
                            {{ help.text }}
                        </a>
                    </li>

                    <li
                        v-if="userInfo"
                        class="c-nav-list-item"
                        data-js-test="logout">
                        <a
                            :tabindex="navIsOpen ? 0 : -1"
                            class="c-nav-list-link"
                            :href="returnLogoutUrl"
                            :data-trak='`{
                                "trakEvent": "click",
                                "category": "engagement",
                                "action": "header",
                                "label": "${accountLogout.gtm}"
                            }`'
                            @blur="closeNav"
                            @focus="openNav">
                            {{ accountLogout.text }}
                        </a>
                    </li>
                </template>

                <li
                    v-else
                    class="c-nav-list-item c-nav-list-item--support">
                    <a
                        :href="help.url"
                        class="c-nav-list-link"
                        :data-trak='`{
                            "trakEvent": "click",
                            "category": "engagement",
                            "action": "header",
                            "label": "${help.gtm}"
                        }`'>
                        {{ help.text }}
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { ProfileIcon, DeliveryIcon } from '@justeat/f-vue-icons';
import sharedServices from '@justeat/f-services';
import axios from 'axios';

export default {
    components: {
        ProfileIcon,
        DeliveryIcon
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

        justLog: {
            type: Object,
            default: () => ({})
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
            default: '/api/analytics/ordercount'
        },

        isOrderCountSupported: {
            type: Boolean,
            default: true
        }
    },

    data () {
        return {
            navIsOpen: false,
            currentScreenWidth: sharedServices.getWindowHeight(),
            userInfo: this.userInfoProp,
            orderCountInfo: false
        };
    },

    computed: {
        isBelowMid () {
            return this.currentScreenWidth <= 767;
        },

        returnUrl () {
            if (!this.$route) return encodeURIComponent(document.location.pathname);
            return encodeURIComponent(this.$route.name);
        },

        returnLoginUrl () {
            return `${this.accountLogin.url}${this.returnUrl}`;
        },

        returnLogoutUrl () {
            return `${this.accountLogout.url}${this.returnUrl}`;
        }
    },

    mounted () {
        if (!this.userInfo) {
            this.fetchUserInfo();
        }
        sharedServices.addEvent('resize', 100, this.onResize);
    },

    destroyed () {
        sharedServices.removeEvent('resize', this.onResize);
    },

    methods: {
        onNavToggle () {
            this.navIsOpen = !this.navIsOpen;
        },

        closeNav () {
            this.navIsOpen = false;
        },

        openNav () {
            this.navIsOpen = true;
        },

        onResize () {
            this.currentScreenWidth = sharedServices.getWindowHeight();
        },

        // When hamburger menu is clicked we want to trigger toggling of navigation and emit the state to the parent to add transparent class
        onHamburgerMenuClick () {
            this.onNavToggle();
            this.$emit('onMobileNavToggle', this.navIsOpen);
        },

        // If userInfoProp wasn't passed we make a call for userInfo on mounted hook
        async fetchUserInfo () {
            try {
                const { data } = await axios.get(this.userInfoUrl, {
                    headers: {
                        credentials: 'same-origin'
                    }
                });
                if (data.isAuthenticated) {
                    this.userInfo = data;
                    this.saveUserData();
                } else {
                    this.userInfo = false;
                }
            } catch (err) {
                if (this.justLog.error) {
                    this.justLog.error('Unable to get user information from "fetchUserInfo"', err);
                }
            }
        },

        // fetches the order count for the user
        async fetchOrderCountAndSave () {
            try {
                const { data } = await axios.get(this.orderCountUrl, {
                    headers: {
                        credentials: 'same-origin'
                    }
                });
                if (data) {
                    this.orderCountInfo = data;
                    this.setAnanlyticsBlob();
                    this.enrichUserDataWithCount(data);
                    this.pushUserData();
                }
            } catch (err) {
                if (this.justLog.error) {
                    this.justLog.error('Unable to get order count from "fetchOrderCountAndSave', err);
                }
            }
        },

        // Sets the order count info in local storage
        setAnanlyticsBlob () {
            window.localStorage.setItem('je-analytics', JSON.stringify(this.orderCountInfo));
        },

        // Gets the order count info in local storage
        getLocalAnalyticsBlob () {
            return window.localStorage.getItem('je-analytics');
        },

        // Updates the user information with the count
        enrichUserDataWithCount () {
            this.userInfo.orderCount = this.orderCountInfo.Count;
        },

        // Pushes the user info to the windows data layer
        pushUserData () {
            window.dataLayer.push(this.userInfo);
        },

        // Saves the user data and calls the nessesary methods based on what is already there
        saveUserData () {
            const localOrderCount = JSON.parse(this.getLocalAnalyticsBlob);
            const currentTime = new Date().getTime();
            const localOrderCountExpires = Date.parse(localOrderCount.Expires);

            if (!this.isOrderCountSupported()) {
                this.pushUserData();
            }
            if (!this.getLocalAnalyticsBlob) {
                this.fetchOrderCountAndSave();
            }
            if (localOrderCountExpires < currentTime) {
                this.fetchOrderCountAndSave();
            }
            this.enrichUserDataWithCount(localOrderCount);
            this.pushUserData();
        }
    }
};
</script>

<style lang="scss">

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

/**
 * Global Page Navigation
 * =================================
 * Styles relating to the global site navigation
 *
 */

$nav-text-size                     : 'base--scaleUp';
$nav-text-font                     : $font-family-headings;
$nav-text-color                    : $blue;
$nav-text-color--transparent       : $white;
$nav-text-weight                   : 500;
$nav-text-color--hover             : $blue;
$nav-text-subFont                  : $font-family-base;
$nav-text-color--narrow            : $grey--dark;
$nav-icon-color                    : $blue;
$nav-icon-color--transparent       : $white;
$nav-transition-duration           : 250ms;

$nav-trigger-length                : 56px;
$nav-trigger-focus-color           : $blue;
$nav-trigger-focus-bg              : $blue--offWhite;
$nav-toggleIcon-left               : spacing(x2);
$nav-toggleIcon-width              : 21px;
$nav-toggleIcon-height             : 2px;
$nav-toggleIcon-borderRadius       : 1px;
$nav-toggleIcon-color              : $blue;
$nav-toggleIcon-color--transparent : $white;
$nav-toggleIcon-bg                 : transparent;
$nav-toggleIcon-space              : 5px;


$nav-tooltip-width                 : 10px;

$nav-popover-width                 : 300px;
$nav-popover-radius                : 3px;
$nav-popover-transition-duration   : 200ms;
$nav-popover-transition-delay      : 200ms;
$nav-popover-padding               : spacing(x2);



// Menulog theme overrides
$nav-text-color--ml                : $green;
$nav-text-color--hover--ml         : $green--dark;
$nav-toggleIcon-color--ml          : $brand--green;
$nav-icon-color--ml                : $brand--green;

$nav-trigger-focus-color--ml       : $green;
$nav-trigger-focus-bg--ml          : $green--offWhite;


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
            @include font-size('base');
            font-weight: 300;
            text-decoration: none;
            border-bottom: 1px solid $grey--lightest;

            @include media('>=mid') {
                font-family: $nav-text-font;
                @include font-size($nav-text-size);
                font-weight: $nav-text-weight;
                color: $nav-text-color;
                border-bottom: none;

                @include theme(ml) {
                    color: $nav-text-color--ml;
                }

                // the following styles align the elements vertically to the height of the header bar
                // don’t need a fallback, as it degrades gracefully
                display: flex;
                align-items: center;
                height: $header-height;

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

                    @include theme(ml) {
                        color: $nav-text-color--hover--ml;
                    }

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

    // Icons, such as the profile icon
    .c-nav-icon {
        float: left;
        margin-right: spacing();

        @include media('>=mid') {
            & path {
                fill: $nav-icon-color;

                @include theme(ml) {
                    fill: $nav-icon-color--ml;
                }

                .c-header--transparent & {
                    fill: $nav-icon-color--transparent;
                }
            }
        }
    }
    .c-nav-icon--profile {
        width: 20px;
        height: 22px;

    // mobile menulog user profile icon to be green, not default blue
    & path {
        @include media('<mid') {
            @include theme(ml) {
                    fill: $nav-icon-color--ml;
                }
            }
        }
    }

    .c-nav-icon--delivery {
        width: 27px;
        height: 22px;
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
            border-bottom: 1px solid $grey--lightest;

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
    width: $nav-trigger-length;
    height: $nav-trigger-length;
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
    width: $nav-trigger-length;
    height: $nav-trigger-length;
    cursor: pointer;

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

            @include theme(ml) {
                background-color: $nav-toggleIcon-color--ml;
            }

            .c-header--transparent & {
                background-color: $nav-toggleIcon-color--transparent;
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
