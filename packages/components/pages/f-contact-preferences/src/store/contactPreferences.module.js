import {
    mapToPreferencesViewModel,
    mapToPreferencesUpdateModel,
    filterSortPreferences
} from '../services/mapping/contactPreferences.mapper';
import {
    UPDATE_PREFERENCES,
    UPDATE_PREFERENCE_VERSION,
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

            commit(UPDATE_PREFERENCE_VERSION, preferenceVersionViewed);
            commit(UPDATE_PREFERENCES, filteredPreferences);
        },

        async savePreferences ({ state }, { api, authToken }) {
            const body = mapToPreferencesUpdateModel({ preferences: state.preferences, preferenceVersionViewed: state.preferenceVersionViewed });

            await api.postPreferences(authToken, body);
        }
    },

    mutations: {
        [UPDATE_PREFERENCES] (state, preferences) {
            state.preferences = preferences;
        },

        [UPDATE_PREFERENCE_VERSION] (state, preferenceVersionViewed) {
            state.preferenceVersionViewed = preferenceVersionViewed;
        },

        [UPDATE_PREFERENCE] (state, { key, field, value }) {
            const index = state.preferences.findIndex(e => e.key === key && field in e);
            if (index >= 0) {
                state.preferences[index][field] = value;
            }
        }
    }
};
