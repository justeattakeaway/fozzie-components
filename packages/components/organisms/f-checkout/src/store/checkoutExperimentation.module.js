import { HEADER_LOW_VALUE_ORDER_EXPERIMENT } from '../constants';
import { UPDATE_EXPERIMENTS_STATE } from './mutation-types';

export default {
    namespaced: true,

    state: () => ({
        lowValueOrderExperimentVariant: ''
    }),

    actions: {
        setExperimentValues: ({ commit }, experiments) => {
            const lowValueOrderExperimentVariant = experiments.low_value_order_threshold_web ? experiments.low_value_order_threshold_web.Variant : '';
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
