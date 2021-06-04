import {
    ADDRESS_FOCUS,
    EMPTY_ADDRESS,
    INVALID_ADDRESS,
    UNKNOWN_ERROR,
    VALID_SAVED_ADDRESS_SEARCH, VALID_SEARCH
} from './types/actions';
import { pushToDataLayer, setGtmEventCookie } from '../utils/helpers';
import EMIT_SEARCH_START from './types/mutations';

export const DEFAULT_CATEGORY = 'engagement';
export const DEFAULT_ACTION = 'form_search';

export const offersHeaderSearchModule = {
    namespaced:  true,

    state: () => ({
        startSearchEmitted: false
    }),

    actions: {
        /**
         * Sets "startSearchEmitted" when address focus event is fired on the offers header search box and pushes "start"
         * event to the datalayer.
         * @param commit
         * @param state
         */
        [ADDRESS_FOCUS]: ({ commit, state }) => {
            // We only want to track the first focus
            if (!state.startSearchEmitted) {
                commit(EMIT_SEARCH_START);
                pushToDataLayer(DEFAULT_CATEGORY, DEFAULT_ACTION, 'start');
            }
        },

        /**
         * Pushes "error_address_missing" to the datalayer when address is empty in offers header search box
         */
        [EMPTY_ADDRESS]: () => pushToDataLayer(DEFAULT_CATEGORY, DEFAULT_ACTION, 'error_address_missing'),

        /**
         * Pushes "error_invalid_postcode" to the datalayer when invalid address event is fired on the offers headers
         * search box.
         */
        [INVALID_ADDRESS]: () => pushToDataLayer(DEFAULT_CATEGORY, DEFAULT_ACTION, 'error_invalid_postcode'),

        /**
         * Pushes "error_unknown" to the datalayer when an unknown error event is fired on the offers header search box
         */
        [UNKNOWN_ERROR]: () => pushToDataLayer(DEFAULT_CATEGORY, DEFAULT_ACTION, 'error_unknown'),

        /**
         * Pushes "valid_saved" to the datalayer when a valid address search is saved on the offers header search box
         */
        [VALID_SAVED_ADDRESS_SEARCH]: () => setGtmEventCookie(DEFAULT_CATEGORY, DEFAULT_ACTION, 'valid_saved'),

        /**
         * Pushes "valid_selected" to datalayer when valid search is performed on the offers header search box
         */
        [VALID_SEARCH]: () => setGtmEventCookie(DEFAULT_CATEGORY, DEFAULT_ACTION, 'valid_selected')

    },

    mutations: {
        [EMIT_SEARCH_START] (state) {
            state.startSearchEmitted = true;
        }
    }
};
