<template>
    <div :class="$style['c-continueWithSuggestion']">
        <button
            :class="[
                $style['c-continueWithSuggestion-btn'],
                { [$style.selected]: selected }
            ]"
            data-test-id="continue-with-suggestion"
            tabindex="0"
            type="button"
            @click="setContinueWithSuggestion">
            <p>{{ copy.notSeeingYourAddress }}</p>
            <p :class="$style['c-continueWithSuggestion-area']">
                {{ copy.continueWith }} {{ getFormattedSelectedAddress }}
            </p>
        </button>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import fullAddressSearchMixin from '../../mixin/fullAddressSearch.mixin';

export default {
    mixins: [
        fullAddressSearchMixin
    ],

    props: {
        copy: {
            type: Object,
            default:  () => ({})
        },

        selected: {
            type: Boolean,
            default: false
        },

        config: {
            type: Object,
            default:  () => ({})
        }
    },

    computed: {
        ...mapState('searchbox', [
            'continueWithSuggestionDetails',
            'isBelowMid',
            'shouldAutoNavigateToSerp'
        ]),

        /**
         * Returns a formatted `generic` address that the user can use to
         * continue with.
         *
         * @returns {string}
         */
        getFormattedSelectedAddress () {
            const address = this.continueWithSuggestionDetails
                .street
                .split(new RegExp(',|-', 'g'));

            const formattedAddress = address.length > 2
                ? address[1].trim()
                : address[0].trim();

            return `'${this.continueWithSuggestionDetails.postcode}, ${formattedAddress}'`;
        }
    },

    methods: {
        ...mapActions('searchbox', [
            'clearSuggestions',
            'setAddress',
            'setShouldShowSuggestionModel'
        ]),

        /**
         * Set address to the continue with suggestion & auto navigate to SERP on selection
         * if the flag is set to true.
         *
         */
        setContinueWithSuggestion () {
            this.setAddress(this.continueWithSuggestionDetails.postcode);

            if (this.isBelowMid) {
                this.setShouldShowSuggestionModel(false);
                this.clearSuggestions([]);
            }

            if (this.shouldAutoNavigateToSerp && !this.config.onSubmit) {
                this.navigateToSerpOnAddressSelection();
            }
        }
    }
};
</script>

<style lang="scss" module>
@import '../../assets/scss/form.scss';

.c-continueWithSuggestion {
    position: sticky;
    bottom: 0;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.c-continueWithSuggestion-btn {
    cursor: pointer;
    @include font-size('body-s', false);
    color: $grey--dark;
    line-height: 30px;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    width: 100%;
    border: 0;
    padding: 15px 20px;
    background-color: $white;

    &:hover,
    &:focus,
    &.selected {
        background: #eaeaea;
    }
}

.c-continueWithSuggestion-btn {
    font-weight: $font-weight-bold;
    font-family: $font-family-base;

    p {
        margin: 0;
        line-height: 1.8;
    }
}

.c-continueWithSuggestion-area {
    color: $blue;
}
</style>
