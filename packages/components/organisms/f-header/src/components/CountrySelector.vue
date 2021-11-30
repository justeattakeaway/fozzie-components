<template>
    <li
        :class="[
            $style['c-nav-list-item--horizontallyAlignedAboveMid'],
            $style['has-sublist'], {
                [$style['is-open']]: isCountrySelectorOpen
            }
        ]"
        v-on="isBelowMid ? null : { mouseover: openCountrySelector, mouseleave: closeCountrySelector }"
        @keyup.esc="closeCountrySelector">
        <button
            ref="countrySelectorToggle"
            type="button"
            data-test-id="action-button-component"
            :tabindex="tabindex"
            :class="[
                $style['c-nav-list-text'],
                $style['c-nav-list-btn']
            ]"
            :aria-expanded="(!isBelowMid && isCountrySelectorOpen) ? 'true' : 'false'"
            :aria-haspopup="!isBelowMid"
            :aria-label="copy.changeCurrentCountry"
            @click="toggleCountrySelector">
            <span :class="$style['c-nav-list-iconWrapper']">
                <flag-icon
                    data-test-id="current-flag-icon"
                    :country-code="copy.currentCountryKey"
                    :class="[
                        $style['c-nav-list-icon--flag'],
                        $style['c-nav-list-icon--flagCurrent']
                    ]" />
            </span>
            <span :class="$style['c-nav-list-title']">
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
    </li>
</template>

<script>
import VPopover from '@justeat/f-popover';
import '@justeat/f-popover/dist/f-popover.css';

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
        closeCountrySelector () {
            this.isCountrySelectorOpen = false;
            this.$emit('close-country-selector');
            const {
                countrySelectorToggle
            } = this.$refs;
            countrySelectorToggle.focus();
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
</style>
