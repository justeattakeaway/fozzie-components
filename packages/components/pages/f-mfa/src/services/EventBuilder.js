export const MFA_VISIBLE = 'mfa-visible';
export const ERROR_VISIBLE = 'error-visible';
export const ERROR_BACK = 'error-back';
export const MFA_SUBMIT = 'mfa-submit';
export const MFA_ERROR = 'mfa-error';
export const MFA_SUCCESS = 'mfa-success';
export const HELP_VISIBLE = 'help-visible';
export const HELP_HIDDEN = 'help-hidden';
export const HELP_LOGIN = 'help-login';

export const buildEvent = (key, data = '') => {
    switch (key) {
        case MFA_VISIBLE: // Tech spec id : S1b
            return {
                event: 'form_view',
                component: {
                    name: 'multiFactorAuthentication',
                    type: 'form'
                },
                form: {
                    action: 'view'
                }
            };
        case ERROR_VISIBLE: // Tech spec id : S2
            return {
                event: 'dialog_view',
                component: {
                    name: 'multiFactorAuthenticationbadActor',
                    type: 'dialog'
                },
                dialog: {
                    action: 'view',
                    type: 'info'
                }
            };
        case ERROR_BACK: // Tech spec id : S3
            return {
                event: 'dialog_select',
                component: {
                    name: 'multiFactorAuthenticationbadActor',
                    type: 'dialog'
                },
                dialog: {
                    action: 'select',
                    type: 'info',
                    buttonText: 'go back'
                }
            };
        case MFA_ERROR: // Tech spec id : S4
            return {
                event: 'form_error',
                component: {
                    name: 'multiFactorAuthentication',
                    type: 'form'
                },
                form: {
                    action: 'error'
                },
                error: {
                    message: data
                }
            };
        case MFA_SUBMIT: // Tech spec id : S5
            return {
                event: 'form_submit',
                component: {
                    name: 'multiFactorAuthentication',
                    type: 'form'
                },
                form: {
                    action: 'submit'
                }
            };
        case MFA_SUCCESS: // Tech spec id : S6
            return {
                event: 'form_success',
                component: {
                    name: 'multiFactorAuthentication',
                    type: 'form'
                },
                form: {
                    action: 'success'
                }
            };
        case HELP_VISIBLE: // Tech spec id : S7
            return {
                event: 'dialog_view',
                component: {
                    name: 'multiFactorAuthenticationHelp',
                    type: 'dialog'
                },
                dialog: {
                    action: 'view',
                    type: 'info'
                }
            };
        case HELP_HIDDEN: // Tech spec id : S8
            return {
                event: 'dialog_select',
                component: {
                    name: 'multiFactorAuthenticationHelp',
                    type: 'dialog'
                },
                dialog: {
                    action: 'select',
                    type: 'info',
                    buttonText: 'got it'
                }
            };
        case HELP_LOGIN: // Tech spec id : S9
            return {
                event: 'dialog_cancel',
                component: {
                    name: 'multiFactorAuthenticationHelp',
                    type: 'dialog'
                },
                dialog: {
                    action: 'cancel',
                    type: 'info',
                    buttonText: 'login a different way'
                }
            };
        default:
            return {};
    }
};
