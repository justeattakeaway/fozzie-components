<template>
    <ul
        :aria-label="copy.navTitle"
        :class="[$style['c-nav-popoverList'],
                 $style['c-user-list']]">
        <li
            v-for="(link, index) in copy.navLinks"
            :key="index"
            data-test-id="nav-links"
            :class="$style['outer-link']">
            <a
                :class="$style['list-link']"
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
            v-if="!isBelowMid"
            :class="$style['outer-link']">
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

.c-user-list {
    @include media('>mid') {
        margin: spacing(b) 0;
    }
}

.outer-link {
    &:hover {
        background: $color-container-subtle;
        text-decoration: none;
    }

     &:active {
        background: $color-container-strong;
        text-decoration: none;
    }
}

.list-link {
    text-decoration: none;

    @include media('>mid') {
        display: block;
        padding: spacing(c) spacing(d);
        height: auto;
    }

    @include media('<=mid') {
        display: flex;
        margin-left: spacing(h);
        padding: spacing(c) spacing(d) spacing(c) 0;
        border-top: 1px solid $color-border-default;
    }

    &:focus {
        outline-color: #4996FD;
    }
}
</style>
