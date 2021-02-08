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
            @click="getSelectedStreetAddress($event, index, selected)">
            <map-pin-icon :class="$style['c-locationIcon']" />

            <div
                v-if="!selectedStreetLevelAddressId"
                data-test-id="suggestion-postcode-item"
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
            <div
                v-else
                data-test-id="suggestion-address-item">
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
            :selected="hasSelectedContinueWithSuggestion"
            :config="config" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { MapPinIcon } from '@justeat/f-vue-icons';
import ContinueWithSuggestion from './FormFullAddressContinueWithSuggestion.vue';
import fullAddressSearchMixin from '../../mixin/fullAddressSearch.mixin';

export default {
    components: {
        ContinueWithSuggestion,
        MapPinIcon
    },

    mixins: [
        fullAddressSearchMixin
    ],

    props: {
        params: {
            type: Object,
            default: () => ({
                suggestionFormat: suggestion => suggestion
            })
        },

        // Prop should be named `selected` for keyboard purposes.
        selected: {
            type: Number,
            default: 0
        },

        copy: {
            type: Object,
            default:  () => ({})
        },

        config: {
            type: Object,
            default:  () => ({})
        }
    },

    data: () => ({
        hasSelectedContinueWithSuggestion: false
    }),

    computed: {
        ...mapState('searchbox', [
            'address',
            'isBelowMid',
            'isInputFocus',
            'inputTimeoutValue',
            'fullAddressDetails',
            'suggestions',
            'selectedStreetLevelAddressId',
            'shouldAutoNavigateToSerp'
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
        },

        fullAddressDetails (value) {
            this.setSelectedFullAddressDetails(value);
        }
    },

    mounted () {
        this.setInputElevation();
    },

    methods: {
        ...mapActions('searchbox', [
            'getMatchedAreaAddressResults',
            'getFinalAddressSelectionDetails',
            'setAddress',
            'setContinueWithDetails',
            'setSelectedFullAddressDetails',
            'shouldShowSuggestionsDropdown',
            'setFocusOnInput',
            'setShouldHaveInputElevation',
            'setShouldShowSuggestionModel',
            'clearSuggestions'
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
         * Selects an address `suggestion` either from the `index` (clicked on)
         * or `selected` (Keyboard enter event).
         *
         * 1. `getMatchedAreaAddressResults` - Returns results based on
         * the `streetLevelAddress` value.
         *
         * 2. `setContinueWithDetails` Will set a fallback options for users so
         * they can continue without selecting a full addresss.
         *
         * 3. `isAddressType` Determines the type of call we make to Loqate:
         *      - `true` = Make a final `retrieve` call to get full address details selected.
         *      - `false` = Make a partial call to Loqate to get street address information, either
         *      postcode based results or address results & then set the continue with details.
         *
         * @param e
         * @param index
         * @param selected
         */
        async getSelectedStreetAddress (e, index, selected) {
            const selectedAddress = this.suggestions[index || selected];
            const isAddressType = selectedAddress && selectedAddress.type === 'Address';
            e.preventDefault();

            if (selectedAddress.postcode) {
                this.setAddress(selectedAddress.postcode);
                return;
            }

            if (isAddressType) {
                await this.getFinalAddressSelectionDetails(selectedAddress.id);
                this.resetSearch();

                /**
                 * Auto navigate to SERP on address selection.
                 * Make sure there's no `onSubmit` handler passed to avoid navigation
                 * in places like Menu.
                 *
                 * */

                if (this.shouldAutoNavigateToSerp && !this.config.onSubmit) {
                    this.navigateToSerpOnAddressSelection();
                }
            } else {
                this.getMatchedAreaAddressResults({
                    address: this.address,
                    streetLevelAddress: selectedAddress.id
                });

                /**
                 * We need to clear the delayed timeout on the input field
                 * so we don't get a flash between postcode > address selection
                 * in Loqate. The initial delayed timeout value is there because
                 * blur events are called before click events, so selections won't be possible.
                 *
                 */

                if (this.inputTimeoutValue) {
                    clearTimeout(this.inputTimeoutValue);
                }

                /**
                 * Set focus back to the input field so the user does not lose
                 * focus after they're shown the second dropdown.
                 *
                 */
                this.setFocusOnInput(true);

                this.setContinueWithDetails({
                    postcode:  selectedAddress.text,
                    street: selectedAddress.description
                });
            }
        },

        /**
         * After results appear on small screens and the user has scrolled past the
         * first item in that results list we want to set a drop shadow (elevation) so there's
         * a clear separation between the results and the input search field area, making it more
         * obvious that they have scrolled past earlier results. (Small Screens only)
         *
         * Method:
         *
         * Emits a boolean up to the parent element so we can toggle the style on and off.
         *
         */
        setInputElevation () {
            if ('IntersectionObserver' in window
                    && this.$refs.suggestion0
                    && this.$refs.suggestion0[0]) {
                const observer = new IntersectionObserver(entries => {
                    this.setShouldHaveInputElevation(!entries[0].intersectionRatio > 0);
                });

                // Observe the first item in the results list only.
                observer.observe(this.$refs.suggestion0[0]);
            }
        },

        /**
         * Hide dropdown & clear suggestions. We also want to remove the modal on small
         * screens when the final address is selected.
         *
         */
        resetSearch () {
            this.shouldShowSuggestionsDropdown(false);
            this.clearSuggestions([]);

            if (this.isBelowMid) {
                this.setShouldShowSuggestionModel(false);
            }
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
    box-sizing: border-box;
    overflow-y: scroll;
    z-index: 1000;
    margin-top: 5px;
    height: calc(100vh - #{$shell-top-offset}px);

    @include media('>=mid') {
        position: absolute;
        left: 0;
        right: 0;
        box-shadow: 0 17px 40px rgba(0, 0, 0, 0.16);
        top: 62px;
        margin-top: 0;
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
