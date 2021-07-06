import { HEADER_LOW_VALUE_ORDER_EXPERIMENT } from '../constants';

import {
    UPDATE_EXPERIMENTS_STATE
} from './mutation-types';

export default {
    namespaced: true,

    state: () => ({
        truncateExtrasExperimentActive: false,
        dishShowcaseExperimentActive: false,
        isCoreWebCheckoutRolloutExperimentActive: false,
        isCookieBannerExperimentActive: false
    }),

    actions: {
        setExperimentValues: ({ commit }) => {
            const lowValueOrderExperimentValue = '';
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
