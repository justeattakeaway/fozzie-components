import { HEADER_LOW_VALUE_ORDER_EXPERIMENT } from '../constants';
import { UPDATE_EXPERIMENTS_STATE } from './mutation-types';

export default {
    namespaced: true,

    state: () => ({
        lowValueOrderExperimentVariant: ''
    }),

    actions: {
        /**
         * Sets the state for checkout experiments.
         * @param {Object} context - Vuex context object, this is the standard first parameter for actions.
         * @param {Object} experiments - Payload containing the experiment values to be destructured and committed to the state.
         */
        setExperimentValues: ({ commit }, experiments) => {
            const lowValueOrderExperimentVariant = experiments.low_value_order_phase_2_web?.Variant || '';
            commit(UPDATE_EXPERIMENTS_STATE, { lowValueOrderExperimentVariant });
        }
    },

    mutations: {
        [UPDATE_EXPERIMENTS_STATE]: (state, { lowValueOrderExperimentVariant }) => {
            state.lowValueOrderExperimentVariant = lowValueOrderExperimentVariant;
        }
    },

    getters: {
        getExperimentsHeaders: ({ lowValueOrderExperimentVariant }) => ({
            [HEADER_LOW_VALUE_ORDER_EXPERIMENT]: lowValueOrderExperimentVariant
        })
    }
};
