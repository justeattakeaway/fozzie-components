export default {
    locale: 'en-GB',

    navLinks: {
        termsAndConditions: {
            prefix: 'By creating an account you agree to our ',
            suffix: '.',
            text: 'Terms and Conditions',
            url: '/info/terms-and-conditions'
        },
        privacyPolicy: {
            prefix: 'Please read our ',
            text: 'Privacy Policy',
            url: '/info/privacy-policy'
        },
        cookiesPolicy: {
            prefix: ' and ',
            text: 'Cookie Policy',
            url: '/info/cookies-policy',
            suffix: '.'
        },
        login: {
            text: 'Already on Just Eat?'
        }
    },

    labels: {
        createAccountTitle: 'Create account',
        createAccountBtn: 'Create account',
        firstName: 'First name',
        lastName: 'Last name',
        email: 'Email',
        password: 'Password'
    },

    validationMessages: {
        firstName: {
            requiredError: 'Please include your first name',
            maxLengthError: 'First name exceeds 50 characters',
            invalidCharError: 'Your name can only contain letters, hyphens or apostrophes'
        },

        lastName: {
            requiredError: 'Please include your last name',
            maxLengthError: 'Last name exceeds 50 characters',
            invalidCharError: 'Your last name can only contain letters, hyphens or apostrophes'
        },

        email: {
            requiredError: 'Please include your email address',
            maxLengthError: 'Email address exceeds 50 characters',
            invalidEmailError: 'Please enter your email address correctly',
            alreadyExistsError: 'Email address is already registered'
        },

        password: {
            requiredError: 'Please enter a password',
            minLengthError: 'Password is less than four characters '
        }
    }
};
