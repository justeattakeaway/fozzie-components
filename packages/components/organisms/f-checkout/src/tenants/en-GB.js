const messages = {
    locale: 'en-GB',

    labels: {
        mobileNumber: 'Mobile Number',
        addressGroup: 'Address',
        line1: 'Address line 1',
        line2: 'Address line 2 (optional)',
        locality: 'City',
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
        locality: {
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
        },

        guestUserCreationFailure: 'Guest checkout isn’t available, sorry. Try again soon or sign up',

        checkoutIssues: {
            MINIMUM_ORDER_VALUE_NOT_MET: {
                title: 'Minimum spend not reached',
                message: 'We\'re sorry, but the minimum spend for your order has not been reached. Please amend your order.',
                buttonText: 'Back to order'
            },

            RESTAURANT_NOT_TAKING_ORDERS: {
                title: 'Restaurant not taking orders',
                message: 'We\'re sorry, but the restaurant is not currently taking orders. Please choose another restaurant to order from.',
                buttonText: 'Ok'
            },

            SERVICE_TYPE_UNAVAILABLE: {
                title: '{serviceType} unavailable',
                message: 'We\'re sorry, but the restaurant is not currently taking {serviceType} orders.',
                buttonText: 'Back to order'
            },

            ADDITIONAL_ITEMS_REQUIRED: {
                title: 'Item(s) cannot be ordered',
                message: 'We\'re sorry, but the item(s) you are trying to order require other items before you can continue. Please amend your order. ',
                buttonText: 'Back to order'
            },

            ITEMS_UNORDERABLE: {
                title: 'Item(s) unavailable',
                message: 'We\'re sorry, but some item(s) you wanted to order are no longer available. Please check your order before continuing.',
                buttonText: 'Back to order'
            },

            FULFILMENT_TIME_UNAVAILABLE: {
                title: 'Time unavailable',
                message: 'We\'re sorry, but the time you have selected is no longer available. Please select another time.',
                buttonText: 'Ok'
            },

            LOCATION_UNDELIVERABLE: {
                title: 'Cannot deliver to address',
                message: 'We\'re sorry, but the restaurant does not currently deliver to this address. Please choose to order via collection or from another restaurant.',
                buttonText: 'Ok'
            },

            DEFAULT_CHECKOUT_ISSUE: {
                title: 'Something went wrong',
                message: 'Please try again',
                buttonText: 'Ok'
            },

            DuplicateOrder: {
                title: 'This looks like a duplicate order',
                message: 'So you’re not charged twice, your order has not been processed',
                buttonText: 'Ok'
            }
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
