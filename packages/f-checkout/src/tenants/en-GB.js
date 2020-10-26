export default {
    locale: 'en-GB',

    labels: {
        mobileNumber: 'Mobile Number',
        line1: 'Address line 1',
        line2: 'Address line 2 (optional)',
        city: 'City',
        postcode: 'Postcode'
    },

    validationMessages: {
        mobileNumber: {
            requiredError: 'Your phone number should be at least 10 characters long and shouldn\'t contain letters or special characters',
            maxLengthError: 'First name exceeds 50 characters',
            invalidCharError: 'Your name can only contain letters, hyphens or apostrophes'
        }
    },

    allergyText: 'If you or someone you’re ordering for has a food allergy or intolerance, click here'
};
