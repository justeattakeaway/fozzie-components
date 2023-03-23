<template>
    <ul
        :aria-label="copy.navTitle"
        :class="[$style['c-nav-popoverList'],
                 $style['c-user-list']]">
        <li
            v-for="(link, index) in copy.navLinks"
            :key="index"
            data-test-id="nav-links">
            <nav-link
                :class="$style['c-user-list-link']"
                :tabindex="tabIndex"
                :href="link.url"
                :is-popover-link="!isBelowMid"
                :data-trak="{
                    trakEvent: 'click',
                    category: 'engagement',
                    action: 'header',
                    label: `${link.gtm}`
                }"
                :text="link.text"
                has-border-top
                :has-border-bottom="false"
                :on-blur="deactivateNav"
                :on-focus="activateNav" />
        </li>

        <li
            v-if="!isBelowMid"
            :class="$style['c-user-list-item']">
            <nav-link
                :class="$style['c-user-list-link']"
                :tabindex="isUserMenuOpen ? 0 : -1"
                :href="returnLogoutUrl"
                is-popover-link
                :data-trak="{
                    trakEvent: 'click',
                    category: 'engagement',
                    action: 'header',
                    label: `${copy.accountLogout.gtm}`
                }"
                :text="copy.accountLogout.text"
                has-border-top
                :has-border-bottom="false"
                :on-blur="deactivateNav"
                :on-focus="activateNav"
                data-test-id="logout-link" />
        </li>
    </ul>
</template>

<script>
import NavLink from './NavLink.vue';

export default {
    components: {
        NavLink
    },
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
    },
    methods: {
        activateNav () {
            this.$emit('activateNav');
        },
        deactivateNav () {
            this.$emit('deactivateNav');
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-user-list {
    @include f.media('>mid') {
        margin: f.spacing(b) 0;
    }
}

.c-user-list-item {
    padding: f.spacing(c) f.spacing(d) f.spacing(c) 0;

    &:hover {
        background: f.$color-container-subtle;
    }

    &:active {
        background: f.$color-container-strong;
    }

    @include f.media('>mid') {
        padding: 0;
    }
}

.c-user-list-link {
    text-decoration: none;
    color: common.$nav-text-color;
    @include f.font-size(common.$nav-text-size);

    @include f.media('>mid') {
        display: block;
        padding: f.spacing(c) f.spacing(d);
    }

    &:focus,
    &:focus-visible {
        @extend %u-elementFocus;

        &, &:after {
            border-radius: 0;
        }
    }
}
</style>
