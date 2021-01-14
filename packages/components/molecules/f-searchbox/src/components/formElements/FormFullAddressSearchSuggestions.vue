<template>
    <div
        ref="fullAddressSuggestions"
        :class="$style.shell">
        <button
            v-for="(item, index) in getAddressItems"
            :key="`${index}_getAddressItem`"
            :ref="`suggestion${index}`"
            :class="[
                $style.item,
                { [$style.selected]: index === selected }
            ]"
            data-test-id="suggestion-item"
            @click="getSelectedStreetAddress($event, index, selected)">
            <map-pin-icon :class="$style['c-locationIcon']" />

            <div
                v-if="!selectedStreetLevelAddressId"
                :class="$style['c-fullAddressSuggestion']">
                <p :class="$style['c-fullAddressSuggestion-postcodeMatch']">
                    {{ getMatchedPostcodes(item) }}
                </p>
                <p
                    v-if="getDescription(item)"
                    :class="$style['c-fullAddressSuggestion-description']">
                    {{ getDescription(item) }}
                </p>
            </div>
            <div v-else>
                <div :class="$style['c-fullAddressSuggestion']">
                    <p :class="$style['c-fullAddressSuggestion-streetLevelMatch']">
                        {{ getMatchedPostcodes(item) }} {{ getDescription(item) }}
                    </p>
                </div>
            </div>
        </button>

        <continue-with-suggestion
            v-if="selectedStreetLevelAddressId"
            :copy="copy.fullAddressSearchSuggestions"
            :selected="hasSelectedContinueWithSuggestion" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { MapPinIcon } from '@justeat/f-vue-icons';
import ContinueWithSuggestion from './FormFullAddressContinueWithSuggestion.vue';

export default {
    components: {
        ContinueWithSuggestion,
        MapPinIcon
    },

    props: {
        params: {
            type: Object,
            default: () => ({
                suggestionFormat: suggestion => suggestion
            })
        },

        // Prop should named `selected` for keyboard purposes.
        selected: {
            type: Number,
            default: 0
        },

        address: {
            type: String,
            default: ''
        },

        copy: {
            type: Object,
            default:  () => ({})
        }
    },

    data: () => ({
        hasSelectedContinueWithSuggestion: false
    }),

    computed: {
        ...mapState('searchbox', [
            'suggestions',
            'selectedStreetLevelAddressId'
        ]),

        /**
         * Return suggestions from store and filter by postcode.
         *
         * @returns {props.suggestions|{type, default}|*|suggestions|Array|null}
         */
        getAddressItems () {
            return this.suggestions
                && this.suggestions.filter(item => !item.postcode);
        }
    },

    watch: {
        /**
         * Checks the `selected` value so we can scroll to the address within the
         * `fullAddressSuggestions` container, allowing keyboard navigation.
         *
         * @param {Number} value
         */
        selected (value) {
            const suggestionItem = this.$refs[`suggestion${[value]}`];

            if ((value || value === 0)
                && suggestionItem
                && suggestionItem[0]) {
                this.$refs.fullAddressSuggestions.scrollTop = suggestionItem[0].offsetTop;
            }

            this.hasSelectedContinueWithSuggestion =
                !!(this.selectedStreetLevelAddressId && value === this.suggestions.length - 1);
        }
    },

    methods: {
        ...mapActions('searchbox', [
            'getMatchedAreaAddressResults',
            'setInputFocus',
            'setContinueWithDetails'
        ]),

        /**
         * Returns the `postcode`, part of the API response, held in `Text`.
         *
         * e.g: { Text: 'AR511AR' }
         *
         * @param item
         * @returns {string|string|*|string|string}
         */
        getMatchedPostcodes (item) {
            return this.params
                .suggestionFormat(item)
                .text;
        },

        /**
         * Returns the `postcode address`, part of the API response, held in `Description`.
         *
         * e.g { Description: 'Fleet Place house, 20 address' }
         *
         * @param item
         * @returns {string}
         */
        getDescription (item) {
            return this.params
                .suggestionFormat(item)
                .description
                .trim();
        },

        /**
         * Selects an address `item` either from the `index` (clicked on)
         * or `selected` (Keyboard enter event).
         *
         * 1. `getMatchedAreaAddressResults` - Returns results based on
         * the `streetLevelAddress` value.
         *
         * 2. `setContinueWithDetails` Will set a fallback options for users so
         * they can continue without selecting a full addresss.
         *
         * @param e
         * @param item
         * @param index
         * @param selected
         */
        getSelectedStreetAddress (e, index, selected) {
            const selectedAddress = this.suggestions[index || selected];
            e.preventDefault();

            this.getMatchedAreaAddressResults({
                address: this.address,
                streetLevelAddress: selectedAddress.id
            });

            this.setContinueWithDetails({
                postcode:  selectedAddress.text,
                street: selectedAddress.description
            });
        }
    }
};
</script>

<style lang="scss" module>
@import '../../assets/scss/common';

.item {
    position: relative;
    cursor: pointer;
    font-family: Arial, sans-serif;
    font-size: 11px;
    line-height: 30px;
    overflow: hidden;
    padding: 8px;
    text-align: left;
    text-overflow: ellipsis;
    display: block;
    width: 100%;
    border: 0;
    background-color: transparent;

    &:last-child {
        margin-bottom: 0;
    }

    &:hover,
    &.selected {
        background: $grey--offWhite;
    }
}
.shell {
    $shell-top-offset: 96;
    $shell-border-radius: 3px;

    background: $white;
    border-bottom-left-radius: $shell-border-radius;
    border-bottom-right-radius: $shell-border-radius;
    position: absolute;
    left: 0;
    right: 0;
    top: #{$shell-top-offset}px;
    box-sizing: border-box;
    overflow-y: scroll;
    z-index: 1000;
    height: calc(100vh - #{$shell-top-offset}px);

    @include media('>=784px') {
        box-shadow: 0 17px 40px rgba(0, 0, 0, 0.16);
        top: 62px;
        max-height: 400px;
        height: auto;
    }
}

.c-locationIcon {
    $map-pin-size: 24px;

    float: left;
    margin-top: 2px;
    width: $map-pin-size;
    height: $map-pin-size;
}

.c-fullAddressSuggestion {
    margin-left: 30px;
}

.c-fullAddressSuggestion-description,
.c-fullAddressSuggestion-postcodeMatch,
.c-fullAddressSuggestion-streetLevelMatch,
.c-fullAddressSuggestion-noPostcodeMatch {
    font-family: $font-family-base;
    font-weight: $font-weight-base;
    margin: 0 0 4px;
    line-height: 1.4;
}

.c-fullAddressSuggestion-noPostcodeMatch {
    margin-top: 2px;
}

.c-fullAddressSuggestion-postcodeMatch,
.c-fullAddressSuggestion-noPostcodeMatch,
.c-fullAddressSuggestion-streetLevelMatch {
    font-size: 16px;
    color: $grey--darkest;
}

.c-fullAddressSuggestion-postcodeMatch {
    margin-top: 2px;
}

.c-fullAddressSuggestion-description {
    font-size: 14px;
    color: $grey--dark;
    background: transparent;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.c-fullAddressSuggestion-streetLevelMatch {
    margin-top: 2px;
}
</style>
