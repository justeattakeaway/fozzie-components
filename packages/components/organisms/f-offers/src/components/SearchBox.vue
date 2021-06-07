<template>
    <div class="c-offers-searchBox">
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
    ADDRESS_FOCUS,
    VALID_SAVED_ADDRESS_SEARCH,
    VALID_SEARCH,
    INVALID_ADDRESS,
    EMPTY_ADDRESS,
    UNKNOWN_ERROR
} from '../store/types/actions';

export default {
    name: 'OffersSearchBox',

    components: {
        SearchBox
    },

    methods: {
        ...mapActions({
            addressFocus: ADDRESS_FOCUS,
            validSavedAddress: VALID_SAVED_ADDRESS_SEARCH,
            validSearch: VALID_SEARCH,
            invalidAddress: INVALID_ADDRESS,
            emptyAddress: EMPTY_ADDRESS,
            unknownError: UNKNOWN_ERROR
        }),

        /**
         * Handles the errors from the searchbox component and handles them accordingly
         * @param e
         */
        handleSearchBoxError (e) {
            let errors = e;
            if (errors.includes('POSTCODE_EMPTY')) {
                this.emptyAddress();
                errors = errors.filter(err => err !== 'POSTCODE_EMPTY');
            }

            if (errors.includes('POSTCODE_INVALID')) {
                this.invalidAddress();
                errors = errors.filter(err => err !== 'POSTCODE_INVALID');
            }

            if (errors.length) {
                this.unknownError();
            }
        }
    }
};
</script>

<style lang="scss" module>

</style>
