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
        setExperimentValues: ({ commit }) => { // LVO: Not sure where to call this action. On Checkout mount?
            const lowValueOrderExperimentValue = ''; // LVO: Read this from state/props
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
        // LVO: Can we read this inside the checkout module? Or does it have to be passed from the component to every API call?
        getExperimentsHeaders: ({ lowValueOrderExperimentValue }) => ({
            [HEADER_LOW_VALUE_ORDER_EXPERIMENT]: lowValueOrderExperimentValue
        })
    }
};
