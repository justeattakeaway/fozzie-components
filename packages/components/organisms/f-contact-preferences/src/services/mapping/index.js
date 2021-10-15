const mapToPreferencesViewModel = data => ({
    preferences: data.preferences.map(p => ({
        email: {
            enabled: p.key === 'newsletter',
            value: p.email
        },
        key: p.key,
        sms: {
            enabled: p.key === 'newsletter',
            value: p.sms
        }
    })),
    preferencesVersionViewed: data.preferencesVersionViewed
});

const mapToPreferencesUpdateModel = () => ({});

export {
    mapToPreferencesUpdateModel,
    mapToPreferencesViewModel
};
