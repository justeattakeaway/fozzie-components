import { mapToPreferencesViewModel, mapToPreferencesUpdateModel } from '../services/mapping/contactPreferences.mapper';
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

            commit(UPDATE_PREFERENCES, { preferences, preferenceVersionViewed });
        },

        async savePreferences ({ state }, { api, authToken }) {
            const body = mapToPreferencesUpdateModel({ preferences: state.preferences, preferenceVersionViewed: state.preferenceVersionViewed });

            await api.postPreferences(authToken, body);
        }
    },

    mutations: {
        [UPDATE_PREFERENCES] (state, { preferences, preferenceVersionViewed }) {
            state.preferences = preferences;
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
