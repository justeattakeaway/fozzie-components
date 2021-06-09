<template>
    <div :class="$style['c-offers-searchBox']">
        <search-box
            class="l-boxWrapper"
            :config="{
                queryString: {
                    refine: 'with_discounts'
                },
                isShellHidden: true
            }"
            data-test-id="OffersInbox-Searchbox"
            @address-search-focus="addressFocus"
            @searchbox-error="handleSearchBoxError"
            @submit-saved-address="validSavedAddress"
            @submit-valid-address="validSearch" />
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import SearchBox from '@justeat/f-searchbox';
import {
    ACTION_ADDRESS_FOCUS,
    ACTION_VALID_SAVED_ADDRESS_SEARCH,
    ACTION_VALID_SEARCH,
    ACTION_INVALID_ADDRESS,
    ACTION_EMPTY_ADDRESS,
    ACTION_UNKNOWN_ERROR
} from '../store/types';
import { POSTCODE_EMPTY, POSTCODE_INVALID } from '../constants';

export default {
    name: 'OffersSearchBox',

    components: {
        SearchBox
    },

    methods: {
        ...mapActions({
            addressFocus: ACTION_ADDRESS_FOCUS,
            validSavedAddress: ACTION_VALID_SAVED_ADDRESS_SEARCH,
            validSearch: ACTION_VALID_SEARCH,
            invalidAddress: ACTION_INVALID_ADDRESS,
            emptyAddress: ACTION_EMPTY_ADDRESS,
            unknownError: ACTION_UNKNOWN_ERROR
        }),

        /**
         * Handles the errors from the searchbox component and handles them accordingly
         * @param e
         */
        handleSearchBoxError (e) {
            let errors = e;
            if (errors.includes(POSTCODE_EMPTY)) {
                this.emptyAddress();
                errors = errors.filter(err => err !== POSTCODE_EMPTY);
            }

            if (errors.includes(POSTCODE_INVALID)) {
                this.invalidAddress();
                errors = errors.filter(err => err !== POSTCODE_INVALID);
            }

            if (errors.length) {
                this.unknownError();
            }
        }
    }
};
</script>

<style lang="scss" module>
.c-offers-searchBox {
    width: 400px;
}
</style>
