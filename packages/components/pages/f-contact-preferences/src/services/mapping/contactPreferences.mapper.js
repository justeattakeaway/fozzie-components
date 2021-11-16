import {
    NON_EDITABLE_PREFERENCE_KEYS,
    NON_VISIBLE_PREFERENCE_KEYS
} from '../../constants';

/**
 * Maps the raw api response to the view model (hides and disables according to requirements).
 * @param {object} Preferences - The preferences contained in the passing object parameter (i.e. response.data.Preferences).
 * @param {object} PreferenceVersionViewed - The version value contained in the passing object parameter (i.e. response.data.PreferenceVersionViewed).
 */
export const mapToPreferencesViewModel = ({ Preferences, PreferenceVersionViewed }) => {
    const model = {
        preferences: Preferences.map(({
            DisplayName, Sort, Key, Push, Email, Sms
        }) => ({
            displayName: DisplayName,
            sort: Sort,
            key: Key,
            visible: !NON_VISIBLE_PREFERENCE_KEYS.includes(Key),
            pushEnabled: !NON_EDITABLE_PREFERENCE_KEYS.includes(Key),
            pushValue: Push,
            emailEnabled: !NON_EDITABLE_PREFERENCE_KEYS.includes(Key),
            emailValue: Email,
            smsEnabled: !NON_EDITABLE_PREFERENCE_KEYS.includes(Key),
            smsValue: Sms
        })),
        preferenceVersionViewed: PreferenceVersionViewed
    };

    return model;
};

/**
 * Maps the view model to the Body payload for the api update request.
 * @param {object} preferences - The preferences contained in the passing object parameter (i.e. state.preferences).
 * @param {object} preferenceVersionViewed - The version value contained in the passing object parameter (i.e. state.preferenceVersionViewed).
 */
export const mapToPreferencesUpdateModel = ({ preferences, preferenceVersionViewed }) => {
    const model = {
        Preferences: preferences.map(({
            displayName, sort, key, pushValue, emailValue, smsValue
        }) => (
            {
                DisplayName: displayName,
                Sort: sort,
                Key: key,
                Push: pushValue,
                Email: emailValue,
                Sms: smsValue
            }
        )),
        DeviceToken: null,
        DeviceType: null,
        PhoneNumber: null,
        PreferenceVersionViewed: preferenceVersionViewed
    };

    return model;
};

export const filterSortPreferences = preferences => {
    const model = preferences?.filter(x => x.visible)?.sort((a, b) => a.sort - b.sort);

    return model || [];
};

