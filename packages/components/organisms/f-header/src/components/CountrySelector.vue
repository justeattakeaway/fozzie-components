<template>
    <div
        :class="[
            $style['has-sublist'], {
                [$style['is-open']]: isCountrySelectorOpen
            }
        ]"
        v-on="isBelowMid ? null : { mouseover: openCountrySelector, mouseleave: (() => closeCountrySelector(false)) }"
        @keyup.esc="closeCountrySelector">
        <flag-icon
            data-test-id="current-flag-icon"
            :country-code="copy.currentCountryKey"
            :class="[
                { [$style['c-nav-list-icon--feature-flag']]: !isBelowMid },
                { [$style['c-nav-list-icon--flag']]: isBelowMid }]" />
        <button
            ref="countrySelectorToggle"
            type="button"
            data-test-id="action-button-component"
            :tabindex="tabindex"
            :class="[
                $style['c-nav-list-link'],
                $style['c-nav-list-btn']
            ]"
            :aria-expanded="(!isBelowMid && isCountrySelectorOpen) ? 'true' : 'false'"
            :aria-haspopup="!isBelowMid"
            :aria-label="copy.changeCurrentCountry"
            @click="toggleCountrySelector">
            <span
                :class="$style['country-selector-text']">
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

.country-selector-text {
    @include media('>mid') {
        display: none;
    }
}
</style>
