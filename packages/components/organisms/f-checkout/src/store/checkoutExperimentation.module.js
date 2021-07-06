import { HEADER_LOW_VALUE_ORDER_EXPERIMENT } from '../constants';

import {
    UPDATE_EXPERIMENTS_STATE
} from './mutation-types';

export default {
    namespaced: true,

    state: () => ({
        lowValueOrderExperimentValue: ''
    }),

    actions: {
        setExperimentValues: ({ commit }, experiments) => {
            const lowValueOrderExperimentValue = experiments.low_value_order_threshold_web ? experiments.low_value_order_threshold_web.Variant : '';
            commit(UPDATE_EXPERIMENTS_STATE, {
                lowValueOrderExperimentValue
            });
        }
    },

    mutations: {
        [UPDATE_EXPERIMENTS_STATE]: (state, {
            lowValueOrderExperimentValue
        }) => {
            state.lowValueOrderExperimentValue = lowValueOrderExperimentValue;
        }
    },

    getters: {
        getExperimentsHeaders: ({ lowValueOrderExperimentValue }) => ({
            [HEADER_LOW_VALUE_ORDER_EXPERIMENT]: lowValueOrderExperimentValue
        })
    }
};
