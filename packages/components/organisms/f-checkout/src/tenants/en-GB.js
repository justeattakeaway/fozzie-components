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
        collectionOrderMethod: 'Collection time'
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
        firstName: {
            requiredError: 'Please enter your first name'
        },
        lastName: {
            requiredError: 'Please enter your last name'
        },
        email: {
            requiredError: 'Please enter a valid email address'
        }
    },

    asapFulfilmentOption: 'As soon as possible',

    errorMessages: {
        errorHeading: 'Error',
        genericServerError: 'Something went wrong, please try again later',
        pageLoad: {
            heading: 'We can\'t show you this page',
            description: 'It\'s a problem at our end, sorry. Your basket is safe and sound, though, so try again soon.'
        }
    },

    warningMessages: {
        preOrder: {
            title: 'Please note, this is a preorder',
            body: 'Please check the day and time above'
        }
    },

    buttonText: 'Go to payment',

    userNote: {
        title: 'Leave a note',
        text: 'Leave a note for the resturant with anything they need to know (e.g. the doorbell doesn\'t work). Do not include details about any allergies here.',
        placeholder: 'e.g. the doorbell doesn\'t work. Do not include details about any allergies here. \n\nWe\'re working with resturants to cut waste. Please don\'t ask for plastic cutlery.'
    },

    guest: {
        firstName: 'First name',
        lastName: 'Last name',
        email: 'Email'
    },

    checkoutHeader: {
        user: {
            title: '{name}, confirm your details',
            switchUser: 'Not {name}? Click here'
        },
        guest: {
            loginTitle: 'How do you want to continue?',
            loginButton: 'Log in or sign up',
            option: 'or',
            guestTitle: 'Checkout as a guest',
            confirmation: 'Please confirm your {serviceType} details'
        }
    },

    checkoutTermsAndConditions: 'By placing an order you agree to our {termsAndConditions}. Please read our {privacyPolicy} and {cookiePolicy}.',

    termsAndConditionsLinkText: 'Terms and Conditions',
    termsAndConditionsLinkUrl: 'https://www.just-eat.co.uk/termsandconditions',

    privacyPolicyLinkText: 'Privacy Policy',
    privacyPolicyLinkUrl: 'https://www.just-eat.co.uk/privacypolicy',

    cookiePolicyLinkText: 'Cookie Policy',
    cookiePolicyLinkUrl: 'https://www.just-eat.co.uk/cookies-policy'
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
