/* eslint-disable camelcase */
export const MFA_VISIBLE = 'mfa-visible';
export const ERROR_VISIBLE = 'error-visible';
export const ERROR_BACK = 'error-back';
export const MFA_ERROR = 'mfa-error';
export const MFA_SUCCESS = 'mfa-success';
export const HELP_VISIBLE = 'help-visible';
export const HELP_HIDDEN = 'help-hidden';
export const HELP_LOGIN = 'help-login';

export const buildEvent = (key, data = '') => {
    switch (key) {
        case MFA_VISIBLE:
            return {
                EventName: 'form_view',
                Parameters: {
                    component_name: 'multiFactorAuthentication',
                    component_type: 'form',
                    form_action: 'view'
                }
            };
        case ERROR_VISIBLE:
            return {
                EventName: 'dialog_view',
                Parameters: {
                    component_name: 'multiFactorAuthenticationbadActor',
                    component_type: 'dialog',
                    dialog_action: 'view',
                    dialog_type: 'info'
                }
            };
        case ERROR_BACK:
            return {
                EventName: 'dialog_select',
                Parameters: {
                    component_name: 'multiFactorAuthenticationbadActor',
                    component_type: 'dialog',
                    dialog_action: 'select',
                    dialog_type: 'info',
                    dialog_buttonText: 'go back'
                }
            };
        case MFA_ERROR:
            return {
                EventName: 'form_error',
                Parameters: {
                    component_name: 'multiFactorAuthentication',
                    component_type: 'form',
                    form_action: 'error',
                    error_message: data
                }
            };
        case MFA_SUCCESS:
            return {
                EventName: 'form_success',
                Parameters: {
                    component_name: 'multiFactorAuthentication',
                    component_type: 'form',
                    form_action: 'success'
                }
            };
        case HELP_VISIBLE:
            return {
                EventName: 'dialog_view',
                Parameters: {
                    component_name: 'multiFactorAuthenticationHelp',
                    component_type: 'dialog',
                    dialog_action: 'view',
                    dialog_type: 'info'
                }
            };
        case HELP_HIDDEN:
            return {
                EventName: 'dialog_select',
                Parameters: {
                    component_name: 'multiFactorAuthenticationHelp',
                    component_type: 'dialog',
                    dialog_action: 'select',
                    dialog_type: 'info',
                    dialog_buttonText: 'got it'
                }
            };
        case HELP_LOGIN:
            return {
                EventName: 'dialog_cancel',
                Parameters: {
                    component_name: 'multiFactorAuthenticationHelp',
                    component_type: 'dialog',
                    dialog_action: 'cancel',
                    dialog_type: 'info',
                    dialog_buttonText: 'login a different way'
                }
            };
        default:
            return {};
    }
};
