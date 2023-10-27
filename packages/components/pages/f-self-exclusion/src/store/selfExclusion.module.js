import { UPDATE_EXCLUSIONS, UPDATE_EXCLUSION } from '../constants';

export default {
    namespaced: true,

    state: () => ({
        exclusions: []
    }),

    actions: {
        async loadExclusions ({ commit }, { api, authToken }) {
            const { data } = await api.getSelfExclusionStatus(authToken);

            commit(UPDATE_EXCLUSIONS, data);
        },

        async saveExclusions ({ commit }, { api, authToken, exclusionState }) {
            const body = {
                state: exclusionState
            };

            await api.updateSelfExclusionStatus(authToken, body);

            commit(UPDATE_EXCLUSIONS, exclusionState);
        }
    },

    mutations: {
        [UPDATE_EXCLUSIONS] (state, exclusions) {
            state.exclusions = exclusions;
        },

        [UPDATE_EXCLUSION] (state, { exclusionState }) {
            state.exclusions[0].state = exclusionState;
        }
    }
};
