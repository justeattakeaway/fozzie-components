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
            :aria-expanded="isCountrySelectorOpen || 'false'"
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
            <chevron-right-icon
                v-if="isNavOpen && isBelowMid"
                :class="$style['c-countrySelector-openPanelIcon']" />
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
import { ChevronRightIcon } from '@justeattakeaway/pie-icons-vue';
import CountrySelectorPanel from './CountrySelectorPanel.vue';
import FlagIcon from './FlagIcon.vue';

export default {
    components: {
        ChevronRightIcon,
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

        isNavOpen: {
            type: Boolean,
            default: false
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
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-countrySelector-text {
    color: common.$nav-text-color;
    @include f.font-size(common.$nav-text-size);
    @include f.media('>mid') {
        display: none;
    }
}

.c-countrySelector-btn {
    text-decoration: none;
    background: transparent;
    border: 0;
    display: block;
    padding: f.spacing(c) f.spacing(c);
    margin-top: f.spacing(d);
    margin-bottom: f.spacing(d);
    cursor: pointer;

    @include f.media('<=mid') {
        width: 100%;
        text-align: left;
        padding: f.spacing(d) f.spacing(a);
        margin: 0;
    }

    &:focus {
        outline-color: common.$nav-link-focus-color;

        @include f.media('>mid') {
            border-radius: common.$nav-focus-borderRadius;
        }
    }

    &:hover {
        background: f.$color-container-subtle;

        @include f.media('>mid') {
            border-radius: common.$nav-focus-borderRadius;
        }
    }
}

.c-countrySelector-current-flag {
    height: common.$countrySelector-flag-height;
    width: common.$countrySelector-flag-width;
    display: block;

    @include f.media('<=mid') {
        margin: 0 f.spacing(d);
        float: left;
    }
}

.c-countrySelector-openPanelIcon {
    float: right;

    height: 18px;
}
</style>
