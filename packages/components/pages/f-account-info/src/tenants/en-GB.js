const messages = {
    accountDetails: 'Account Details',
    yourDetails: 'Your details',
    contactCustomerCareTeam: "If you'd like to change your email address, get in touch with our customer care team.",
    deliveryAddress: 'Delivery Address',
    consumer: {
        emailAddressLabel: 'Email address',
        emailAddressPlaceholder: 'Your email address...',
        firstNameLabel: 'First name*',
        firstNamePlaceholder: 'Your first name...',
        lastNameLabel: 'Last name*',
        lastNamePlaceholder: 'Your last name...',
        phoneNumberLabel: 'Phone Number*',
        phoneNumberPlaceholder: 'Your phone number',
        addressLabel: 'Address*',
        line1Placeholder: 'Address Line 1...',
        line2Placeholder: 'Address Line 2... (Optional)',
        line3Placeholder: 'Address Line 3... (Optional)',
        localityLabel: 'City*',
        localityPlaceholder: 'City...',
        postcodeLabel: 'Postcode*',
        postcodePlaceholder: 'Postcode...'
    },
    buttons: {
        saveChanges: 'Save changes',
        changePassword: 'Change password'
    },
    validation: {
        firstNameRequired: 'Please enter your first name',
        firstNameInvalid: 'Please use only letters in your first name',
        lastNameRequired: 'Please enter your last name',
        lastNameInvalid: 'Please use only letters in your last name',
        phoneNumberRequired: 'Please enter your phone number',
        phoneNumberInvalid: 'Your phone number should be at least 10 characters long and shouldn’t contain letters or special characters',
        line1Required: 'Please enter line 1 of your address',
        localityRequired: 'Please enter your city',
        postcodeRequired: 'Please enter your postcode',
        postcodeInvalid: 'Please enter a valid postcode'
    },
    deleteAccountMessage: 'Do you want to delete your Just Eat account?',
    deleteAccountLink: 'Delete my account',
    errorMessages: {
        errorHeading: 'Something went wrong',
        pageLoad: {
            description: 'Sorry, there was a problem fetching your account details. Please try again later.'
        },
        saveDetails: {
            description: 'Looks like a problem on our end, sorry. Try again soon.'
        }
    }
};

export default {
    messages
};
