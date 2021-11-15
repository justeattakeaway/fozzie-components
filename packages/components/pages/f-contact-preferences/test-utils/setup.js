export const contactPreferencesGetResponse = {
    data: {
        Preferences: [{
            DisplayName: 'Order status',
            Sort: 1,
            Key: 'orderstatus',
            Push: false,
            Email: true,
            Sms: true
        }, {
            DisplayName: 'Review meal',
            Sort: 2,
            Key: 'reviewmeal',
            Push: false,
            Email: false,
            Sms: false
        }, {
            DisplayName: 'News & offers',
            Sort: 3,
            Key: 'news',
            Push: false,
            Email: false,
            Sms: false
        }
        ],
        PreferenceVersionViewed: 0
    }
};

export const contactPreferencesViewModel = {
    preferenceVersionViewed: 0,
    preferences: [{
        displayName: 'Order status',
        emailEnabled: false,
        emailValue: true,
        key: 'orderstatus',
        pushEnabled: false,
        pushValue: false,
        smsEnabled: false,
        smsValue: true,
        sort: 1,
        visible: true
    }, {
        displayName: 'Review meal',
        emailEnabled: true,
        emailValue: false,
        key: 'reviewmeal',
        pushEnabled: true,
        pushValue: false,
        smsEnabled: true,
        smsValue: false,
        sort: 2,
        visible: false
    }, {
        displayName: 'News & offers',
        emailEnabled: true,
        emailValue: false,
        key: 'news',
        pushEnabled: true,
        pushValue: false,
        smsEnabled: true,
        smsValue: false,
        sort: 3,
        visible: true
    }]
};

export const filteredContactPreferencesModel = [{
    displayName: 'Order status',
    emailEnabled: false,
    emailValue: true,
    key: 'orderstatus',
    pushEnabled: false,
    pushValue: false,
    smsEnabled: false,
    smsValue: true,
    sort: 1,
    visible: true
}, {
    displayName: 'News & offers',
    emailEnabled: true,
    emailValue: false,
    key: 'news',
    pushEnabled: true,
    pushValue: false,
    smsEnabled: true,
    smsValue: false,
    sort: 3,
    visible: true
}];

export const contactPreferencesUpdateModel = {
    Preferences: [{
        DisplayName: 'Order status',
        Sort: 1,
        Key: 'orderstatus',
        Push: false,
        Email: true,
        Sms: true
    }, {
        DisplayName: 'Review meal',
        Sort: 2,
        Key: 'reviewmeal',
        Push: false,
        Email: false,
        Sms: false
    }, {
        DisplayName: 'News & offers',
        Sort: 3,
        Key: 'news',
        Push: false,
        Email: false,
        Sms: false
    }],
    DeviceToken: null,
    DeviceType: null,
    PhoneNumber: null,
    PreferenceVersionViewed: 0
};

export const baseUrl = 'https://smartGatewayBaseUrl.com';

export const token = 'some-auth-token';

export const conversationId = 'b7386108-95e6-4e73-9421-5b066c089153';

export const contactPreferencesUpdateBody = {
    Preference: [{
        DisplayName: 'Order status',
        Sort: 1,
        Key: 'orderstatus',
        Push: false,
        Email: true,
        Sms: true
    }, {
        DisplayName: 'Review meal',
        Sort: 2,
        Key: 'reviewmeal',
        Push: false,
        Email: false,
        Sms: false
    }, {
        DisplayName: 'News & offers',
        Sort: 3,
        Key: 'news',
        Push: false,
        Email: true,
        Sms: false
    }
    ],
    DeviceToken: null,
    DeviceType: null,
    PhoneNumber: null,
    PreferenceVersionViewed: 0
};
