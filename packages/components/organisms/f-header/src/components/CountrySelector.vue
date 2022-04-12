<template>
    <div
        :class="[
            $style['has-sublist'], {
                [$style['is-open']]: isCountrySelectorOpen
            }
        ]"
        v-on="isBelowMid ? null : { mouseover: openCountrySelector, mouseleave: (() => closeCountrySelector(false)) }"
        @keyup.esc="closeCountrySelector">
        <button
            ref="countrySelectorToggle"
            type="button"
            data-test-id="action-button-component"
            :tabindex="tabindex"
            :class="[
                $style['c-countrySelector-btn']
            ]"
            :aria-expanded="(!isBelowMid && isCountrySelectorOpen) ? 'true' : 'false'"
            :aria-haspopup="!isBelowMid"
            :aria-label="copy.changeCurrentCountry"
            @click="toggleCountrySelector">
            <flag-icon
                data-test-id="current-flag-icon"
                :country-code="copy.currentCountryKey"
                :class="$style['c-countrySelector-current-flag']" />
            <span
                :class="$style['c-countrySelector-text']">
                {{ copy.selectYourCountryText }}
            </span>
        </button>

        <v-popover
            data-test-id="countrySelector-popover"
            :aria-hidden="!isCountrySelectorOpen"
            :class="[
                $style['c-nav-popover'],
                $style['c-nav-popover--countrySelector']
            ]">
            <country-selector-panel
                :copy="copy"
                :is-open="isCountrySelectorOpen"
                :is-below-mid="isBelowMid"
                @closeCountrySelector="closeCountrySelector"
            />
        </v-popover>
    </div>
</template>

<script>
import VPopover from '@justeat/f-popover';
import CountrySelectorPanel from './CountrySelectorPanel.vue';
import FlagIcon from './FlagIcon.vue';

export default {
    components: {
        CountrySelectorPanel,
        FlagIcon,
        VPopover
    },

    props: {
        copy: {
            type: Object,
            default: () => ({})
        },

        isBelowMid: {
            type: Boolean,
            default: true
        },

        tabindex: {
            type: Number,
            required: true
        }
    },

    data: () => ({
        isCountrySelectorOpen: false
    }),

    methods: {
        closeCountrySelector (withFocus = true) {
            this.isCountrySelectorOpen = false;
            this.$emit('close-country-selector');

            if (withFocus) {
                const { countrySelectorToggle } = this.$refs;
                countrySelectorToggle.focus();
            }
        },

        openCountrySelector () {
            this.isCountrySelectorOpen = true;
            this.$emit('open-country-selector');
        },

        toggleCountrySelector () {
            this.isCountrySelectorOpen = !this.isCountrySelectorOpen;
            this.$emit('toggle-country-selector');
        }
    }
};
</script>

<style lang="scss" module>
@import '../assets/scss/navigation.scss';

.c-countrySelector-text {
    color: $nav-text-color;
    @include font-size($nav-text-size);
    @include media('>mid') {
        display: none;
    }
}

.c-countrySelector-btn {
    text-decoration: none;
    background: transparent;
    border: 0;
    display: block;
    padding: spacing(c) spacing(c);
    margin-top: spacing(d);
    margin-bottom: spacing(d);

    @include media('<=mid') {
        width: 100%;
        text-align: left;
        padding: spacing(d) spacing(a);
        margin: 0;
    }

    &:focus {
        outline-color: $nav-link-focus-color;

        @include media('>mid') {
            border-radius: $nav-focus-borderRadius;
        }
    }

    &:hover {
        background: $color-container-subtle;

        @include media('>mid') {
            border-radius: $nav-focus-borderRadius;
        }
    }
}

.c-countrySelector-current-flag {
    height: $countrySelector-flag-height;
    width: $countrySelector-flag-width;
    display: block;

    @include media('<=mid') {
        margin: 0 spacing(d);
        float: left;
    }
}
</style>
