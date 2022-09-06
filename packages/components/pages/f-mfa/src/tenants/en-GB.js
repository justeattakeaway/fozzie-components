const messages = {
    locale: 'en-GB',
    verificationPage: {
        subTitle: "We've emailed your login code",
        instructionsPrimaryText: "We've sent a verification code to {0} to help keep your account secure. Enter it below to log in.",
        instructionsSecondaryText: 'Your code will be valid for 30 minutes.',
        formField: {
            labelText: 'Your verification code',
            placeholderText: 'Enter code',
            validationMessage: 'Please enter a valid code'
        },
        submitErrorText: 'Please check and try again',
        primaryButtonText: 'Continue',
        secondaryButtonText: 'Need help?'
    },
    helpInfo: {
        title: 'Help',
        subTitle: 'Need help?',
        instructionsPrimaryText: "We've emailed a code to {0}. It will be valid for 30 minutes. If you're having trouble:",
        instructionsPoint1Text: 'Wait a few minutes for the email to come through',
        instructionsPoint2Text: 'Check your spam folder',
        instructionsPoint3Text: 'Try logging in another way',
        instructionsPoint4Text: 'See our {0} if you still need help',
        instructionsHelpLink: 'https://www.just-eat.co.uk/help/article/6620525642013/why-am-i-sometimes-asked-to-enter-a-verification-code-when-using-just-eat',
        instructionsHelpText: 'FAQs',
        primaryButtonText: 'Got it',
        secondaryButtonText: 'Log in another way'
    },
    errorMessages: {
        validation: 'Please check and try again',
        submitMfa: {
            heading: 'Something went wrong',
            description: 'Sorry about that. Please try again.'
        },
        loading: {
            heading: 'Something went wrong',
            message: 'Sorry about that. Please try again.',
            primaryButtonText: 'Go back'
        }
    }
};

export default {
    messages
};
