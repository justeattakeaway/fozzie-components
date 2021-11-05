import {
    ACTION_ADDRESS_FOCUS,
    ACTION_EMPTY_ADDRESS,
    ACTION_INVALID_ADDRESS,
    ACTION_UNKNOWN_ERROR,
    ACTION_VALID_SAVED_ADDRESS_SEARCH,
    ACTION_VALID_SEARCH,
    MUTATION_EMIT_SEARCH_START
} from './types';
import { pushToDataLayer, setGtmEventCookie } from '../utils/helpers';

export const DEFAULT_CATEGORY = 'engagement';
export const DEFAULT_ACTION = 'form_search';

export const offersSearchModule = {
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
        [ACTION_ADDRESS_FOCUS]: ({ commit, state }) => {
            // We only want to track the first focus
            if (!state.startSearchEmitted) {
                commit(MUTATION_EMIT_SEARCH_START);
                pushToDataLayer(DEFAULT_CATEGORY, DEFAULT_ACTION, 'start');
            }
        },

        /**
         * Pushes "error_address_missing" to the datalayer when address is empty in offers header search box
         */
        [ACTION_EMPTY_ADDRESS]: () => pushToDataLayer(DEFAULT_CATEGORY, DEFAULT_ACTION, 'error_address_missing'),

        /**
         * Pushes "error_invalid_postcode" to the datalayer when invalid address event is fired on the offers headers
         * search box.
         */
        [ACTION_INVALID_ADDRESS]: () => pushToDataLayer(DEFAULT_CATEGORY, DEFAULT_ACTION, 'error_invalid_postcode'),

        /**
         * Pushes "error_unknown" to the datalayer when an unknown error event is fired on the offers header search box
         */
        [ACTION_UNKNOWN_ERROR]: () => pushToDataLayer(DEFAULT_CATEGORY, DEFAULT_ACTION, 'error_unknown'),

        /**
         * Pushes "valid_saved" to the datalayer when a valid address search is saved on the offers header search box
         */
        [ACTION_VALID_SAVED_ADDRESS_SEARCH]: () => setGtmEventCookie(DEFAULT_CATEGORY, DEFAULT_ACTION, 'valid_saved'),

        /**
         * Pushes "valid_selected" to datalayer when valid search is performed on the offers header search box
         */
        [ACTION_VALID_SEARCH]: () => setGtmEventCookie(DEFAULT_CATEGORY, DEFAULT_ACTION, 'valid_selected')

    },

    mutations: {
        [MUTATION_EMIT_SEARCH_START] (state) {
            state.startSearchEmitted = true;
        }
    }
};
