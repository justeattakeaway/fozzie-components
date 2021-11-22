<template>
    <ul
        :aria-label="copy.navTitle"
        :class="$style['c-nav-popoverList']">
        <li
            v-for="(link, index) in copy.navLinks"
            :key="index"
            data-test-id="nav-links">
            <a
                :tabindex="tabIndex"
                :href="link.url"
                :data-trak='`{
                    "trakEvent": "click",
                    "category": "engagement",
                    "action": "header",
                    "label": "${link.gtm}"
                }`'
                :class="$style['list-link']"
                @blur="$emit('deactivateNav')"
                @focus="$emit('activateNav')">
                {{ link.text }}
            </a>
        </li>

        <li
            v-if="!isBelowMid">
            <a
                :tabindex="isOpen ? 0 : -1"
                :href="returnLogoutUrl"
                :data-trak='`{
                    "trakEvent": "click",
                    "category": "engagement",
                    "action": "header",
                    "label": "${copy.accountLogout.gtm}"
                }`'
                data-test-id="logout-link"
                :class="$style['list-link']"
                @blur="$emit('deactivateNav')"
                @focus="$emit('activateNav')">
                {{ copy.accountLogout.text }}
            </a>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        isBelowMid: {
            type: Boolean,
            default: false
        },
        copy: {
            type: Object,
            default: () => ({})
        },
        returnLogoutUrl: {
            type: String,
            default: ''
        },
        isCountrySelectorClosedOnMobileView: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        tabIndex () {
            if (this.isBelowMid && this.isOpen && !this.isCountrySelectorClosedOnMobileView) return -1;
            if (!this.isOpen) return -1;
            return 0;
        }
    }
};
</script>

<style lang="scss" module>
@import '../assets/scss/navigation.scss';

.list-link {
    display: block;
    padding: spacing(x1.5) spacing(x2);
    margin: 0;
    font-family: $font-family-base;
    font-weight: 300;
    color: $color-content-subdued;
    height: auto;
    @include font-size('body-s');
    text-decoration: none;
    border-bottom: 1px solid $color-border-default;

    &:hover,
    &:focus {
        font-weight: $font-weight-bold;
        text-decoration: none;
        color: $color-content-subdued;
    }

    @include media('>mid') {
        @include font-size('body-l');
    }

    @include media('<=mid') {
        padding-left: spacing(x6);
    }

}
</style>
