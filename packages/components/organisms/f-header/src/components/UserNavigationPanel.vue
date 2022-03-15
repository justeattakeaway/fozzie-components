<template>
    <ul
        :aria-label="copy.navTitle"
        :class="[$style['c-nav-popoverList'],
                 $style['with-border-top']]">
        <li
            v-for="(link, index) in copy.navLinks"
            :key="index"
            data-test-id="nav-links">
            <a
                :class="[
                    $style['c-nav-list-link'],
                    $style['list-link']]"
                :tabindex="tabIndex"
                :href="link.url"
                :data-trak='`{
                    "trakEvent": "click",
                    "category": "engagement",
                    "action": "header",
                    "label": "${link.gtm}"
                }`'
                @blur="$emit('deactivateNav')"
                @focus="$emit('activateNav')">
                {{ link.text }}
            </a>
        </li>

        <li
            v-if="!isBelowMid">
            <a
                :tabindex="isUserMenuOpen ? 0 : -1"
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
        isUserMenuOpen: {
            type: Boolean,
            default: false
        },
        isNavOpen: {
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
        isCountrySelectorOpen: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        tabIndex () {
            if (this.isBelowMid && this.isNavOpen && !this.isCountrySelectorOpen) {
                return 0;
            }
            if (!this.isUserMenuOpen) {
                return -1;
            }
            return 0;
        }
    }
};
</script>

<style lang="scss" module>
@import '../assets/scss/navigation.scss';

.list-link {
    font-weight: $font-weight-regular;

    @include media('>mid') {
        display: block;
        padding: spacing(c) spacing(d);
        margin: 0;
        height: auto;
        text-decoration: none;
        border-bottom: 1px solid $color-border-default;
    }

    @include media('<=mid') {
        border-top: 1px solid $color-border-default;
    }

    &:hover,
    &:focus {
        font-weight: $font-weight-bold;
        text-decoration: none;
    }
}
</style>
