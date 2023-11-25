import { UPDATE_EXCLUSIONS, UPDATE_ALCOHOL_EXCLUSION } from '../constants';

export default {
    namespaced: true,

    state: () => ({
        exclusions: [{ type: 'alcohol', state: '', expiryDate: '' }]
    }),

    actions: {
        async getExclusions ({ commit }, { api, authToken }) {
            const { data } = await api.getExclusions(authToken);
            if (data.length) {
                commit(UPDATE_EXCLUSIONS, data);
            }
        },

        async updateAlcoholExclusion ({ commit }, { api, authToken, exclusionState }) {
            const body = {
                state: exclusionState
            };

            const response = await api.updateAlcoholExclusion(authToken, body);

            commit(UPDATE_ALCOHOL_EXCLUSION, {
                state: exclusionState,
                expiryDate: response.data.expiryDate
            });
        }
    },

    getters: {
        exclusions: state => state.exclusions
    },

    mutations: {
        [UPDATE_EXCLUSIONS] (state, data) {
            state.exclusions = data;
        },

        [UPDATE_ALCOHOL_EXCLUSION] (state, data) {
            const alcoholExclusion = state.exclusions.find(exclusion => exclusion.type === 'alcohol');
            alcoholExclusion.state = data.state;
            alcoholExclusion.expiryDate = data.expiryDate;
        }
    }
};
