import {
    NON_EDITABLE_PREFERENCE_KEYS,
    NON_VISIBLE_PREFERENCE_KEYS
} from '../../constants';

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

