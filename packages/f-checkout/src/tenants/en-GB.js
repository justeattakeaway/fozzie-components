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
        },
        addressLine1: {
            requiredError: 'Please enter the first line of your address'
        },
        city: {
            reqyuiredError: 'Please enter your town or city'
        },
        postcode: {
            requiredError: 'Please enter your full UK postcode',
            invalidCharError: 'This doesn\'t look like a UK postcode, can you enter it again please?'
        }
    },

    allergyText: 'If you or someone you’re ordering for has a food allergy or intolerance, click here'
};
