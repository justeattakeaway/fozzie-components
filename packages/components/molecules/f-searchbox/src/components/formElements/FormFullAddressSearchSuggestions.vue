<template>
    <div :class="$style.shell">
        <button
            v-for="(item, index) in getAddressItems"
            :key="index"
            type="button"
            :class="[
                $style.item
            ]">
            <map-pin-icon :class="$style['c-locationIcon']" />

            <div :class="$style['c-fullAddressSuggestion']">
                <p :class="$style['c-fullAddressSuggestion-postcodeMatch']">
                    {{ getMatchedPostcodes(item) }}
                </p>
                <p
                    v-if="getDescription(item)"
                    :class="$style['c-fullAddressSuggestion-description']">
                    {{ getDescription(item) }}
                </p>
            </div>
        </button>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { MapPinIcon } from '@justeat/f-vue-icons';

export default {
    components: {
        MapPinIcon
    },

    props: {
        params: {
            type: Object,
            default: () => ({
                suggestionFormat: suggestion => suggestion
            })
        },

        keyboardSuggestionSelection: {
            type: Number,
            default: 0
        }
    },

    computed: {
        ...mapState('searchbox', [
            'suggestions'
        ]),

        /**
         * Return suggestions from store and filters by postcode.
         *
         * @returns {props.suggestions|{type, default}|*|suggestions|Array|null}
         */
        getAddressItems () {
            return this.suggestions
                && this.suggestions.filter(item => !item.postcode);
        }
    },

    methods: {
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
                .Text;
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
                .Description
                .trim();
        },
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
        box-shadow: 0 17px 40px rgba(0,0,0, 0.16);
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
