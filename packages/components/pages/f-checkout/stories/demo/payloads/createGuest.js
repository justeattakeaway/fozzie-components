function createGuest (hasErrors) {
    return {
        traceId: 'H3TKh4QSJUSwVBCBqEtkKw==',
        faultId: '25bbe062-c53d-4fbc-9d6c-3df6127b94fd',
        ...(hasErrors ? {
            errors: [
                {
                    description: 'Email is required.',
                    errorCode: 'BadRequest'
                }
            ]
        } : {})
    };
}

export default {
    default: createGuest(),
    error: createGuest(true)
};
