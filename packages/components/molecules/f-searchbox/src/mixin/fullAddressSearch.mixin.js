import { mapState, mapActions } from 'vuex';
import { extractPostcode, fullAddressLocalStorageService } from '../services/general.services';
import { generatePostForm } from '../utils/helpers';
import { JE_FULL_ADDRESS_DETAILS } from '../services/constants';

export default {
    computed: mapState('searchbox', [
        'address',
        'savedFullAddressDetails'
    ]),

    methods: {
        ...mapActions('searchbox', [
            'setSavedFullAddressDetails'
        ]),

        /**
         * Automatically navigate to SERP when `shouldAutoNavigateToSerp` is `true`.
         */
        navigateToSerpOnAddressSelection () {
            const { query, formUrl } = this.config;

            this.setSavedFullAddressDetails({
                fullAddress: this.fullAddressDetails,
                address: this.address
            });

            fullAddressLocalStorageService.setItem(JE_FULL_ADDRESS_DETAILS, ...this.savedFullAddressDetails);

            const payload = {
                postcode: extractPostcode(this.address),
                query
            };

            generatePostForm(formUrl, payload);
        }
    }
};
