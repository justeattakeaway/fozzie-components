const defaultState = {
    platformData: {
        environment: 'localhost',
        name: undefined,
        appType: undefined,
        applicationId: undefined,
        userAgent: undefined,
        branding: undefined,
        country: undefined,
        language: undefined,
        jeUserPercentage: undefined,
        currency: undefined,
        version: undefined,
        instancePosition: undefined,
        isPilot: undefined
    },
    userData: {
        'a-UserId': undefined,
        authType: undefined,
        email: undefined,
        globalUserId: undefined,
        signinType: undefined,
        signupDate: undefined
    },
    pageData: {
        group: undefined,
        name: undefined,
        httpStatusCode: 200,
        conversationId: undefined,
        requestId: undefined,
        orientation: undefined,
        display: undefined
    },
    events: []
};

export default defaultState;
