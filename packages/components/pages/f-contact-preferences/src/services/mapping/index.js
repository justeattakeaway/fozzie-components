const mapToPreferencesViewModel = ({ preferences, preferencesVersionViewed }) => ({
    preferences: preferences.map(({ email, key, sms }) => ({
        email: {
            enabled: key === 'newsletter',
            value: email
        },

        key,

        sms: {
            enabled: key === 'newsletter',
            value: sms
        }
    })),

    preferencesVersionViewed
});

const mapToPreferencesUpdateModel = () => ({});

export {
    mapToPreferencesUpdateModel,
    mapToPreferencesViewModel
};
