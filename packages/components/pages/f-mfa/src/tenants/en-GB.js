const messages = {
    locale: 'en-GB',
    text: 'I am a VMfa Component (GB)',
    verificationPage: {
        subTitle: "We've emailed your login code",
        instructionsPrimaryText: "We've sent a verification code to <b>{email}</b> to help keep your account secure. Enter it below to log in.",
        instructionsSecondaryText: 'Your code will be valid for 10 minutes.',
        formField: {
            labelText: 'Your verification code',
            placeholderText: 'Enter code',
            validationMessage: 'Please enter a valid code'
        },
        submitErrorText: 'Please check and try again',
        submitButtonText: 'Continue',
        helpModalLinkText: 'Need help?'
    },
    helpModal: {
        title: 'Help',
        straplineText: 'Need help?',
        instructionsPrimaryText: "We've emailed a code to [{email}]. It will be valid for [{minutes}] minutes. If you're having trouble:",
        instructionsPoint1Text: 'Wait a few minutes for the email to come through',
        instructionsPoint2Text: 'Check your spam folder',
        instructionsPoint3Text: 'Try logging in another way',
        instructionsPoint4Text: 'See our [{helpLink}] if you still need help',
        submitButtonText: 'Got it',
        alternativeLoginLinkText: 'Login another way'
    }
};

export default {
    messages
};
