import {
    mapToPreferencesViewModel,
    mapToPreferencesUpdateModel,
    filterSortPreferences
} from '../services/mapping/contactPreferences.mapper';
import {
    UPDATE_PREFERENCES,
    UPDATE_PREFERENCE
} from '../constants';

export default {
    namespaced: true,

    state: () => ({
        preferences: [],
        preferenceVersionViewed: 0
    }),

    actions: {
        async loadPreferences ({ commit }, { api, authToken }) {
            const { data } = await api.getPreferences(authToken);

            const { preferences, preferenceVersionViewed } = mapToPreferencesViewModel(data);

            const filteredPreferences = filterSortPreferences(preferences);

            if (!filteredPreferences.length) {
                throw new Error('No Preference Data (filtered)');
            }

            commit(UPDATE_PREFERENCES, { preferences: filteredPreferences, preferenceVersionViewed });
        },

        async savePreferences ({ state }, { api, authToken }) {
            const body = mapToPreferencesUpdateModel(state);

            await api.postPreferences(authToken, body);
        },

        async editPreference ({ commit, state }, { key, field, value }) {
            const index = state.preferences.findIndex(e => e.key === key && field in e);
            if (index >= 0) {
                commit(UPDATE_PREFERENCE, { index, field, value });
            }
        }
    },

    mutations: {
        [UPDATE_PREFERENCES] (state, { preferences, preferenceVersionViewed }) {
            state.preferences = preferences;
            state.preferenceVersionViewed = preferenceVersionViewed;
        },

        [UPDATE_PREFERENCE] (state, { index, field, value }) {
            state.preferences[index][field] = value;
        }
    }
};
