const messages = {
    locale: 'en-GB',

    labels: {
        mobileNumber: 'Mobile Number',
        addressGroup: 'Address',
        line1: 'Address line 1',
        line2: 'Address line 2 (optional)',
        city: 'City',
        postcode: 'Postcode',
        deliveryOrderMethod: 'Delivery time',
        collectionOrderMethod: 'Collection time',
        firstName: 'First name',
        lastName: 'Last name',
        email: 'Email'
    },

    validationMessages: {
        mobileNumber: {
            requiredError: 'Your phone number should be at least 10 characters long and shouldn\'t contain letters or special characters'
        },
        addressLine1: {
            requiredError: 'Please enter the first line of your address'
        },
        city: {
            requiredError: 'Please enter your town or city'
        },
        postcode: {
            requiredError: 'Please enter your full UK postcode',
            invalidCharError: 'This doesn\'t look like a UK postcode, can you enter it again please?'
        },
        guestFirstName: {
            requiredError: 'Please enter your first name'
        },
        guestLastName: {
            requiredError: 'Please enter your last name'
        },
        guestEmail: {
            invalidError: 'Please enter a valid email address',
        }
    },

    asapFulfilmentOption: 'As soon as possible',

    errorMessages: {
        errorHeading: 'Error',
        genericServerError: 'Something went wrong, please try again later'
    },

    buttonText: 'Go to payment',

    loginButtonText: 'Log in or sign up',

    guestHeader: 'How do you want to continue?',

    guestTitle: 'Checkout as guest',

    guestOption: 'or',

    guestDeliveryHeader: 'Please confirm your delivery details',

    allergyText: 'If you or someone you’re ordering for has a food allergy or intolerance, click here',

    switchUserText: 'Not {name}? Click here.'

};

const dateTimeFormats = {
    short: {
        weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: false
    }
};

export default {
    messages,
    dateTimeFormats
};
