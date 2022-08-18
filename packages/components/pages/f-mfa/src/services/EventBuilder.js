/* eslint-disable camelcase */
// eslint-disable-next-line import/prefer-default-export
export const buildEvent = (key, data = '') => {
    switch (key) {
        case 'mfa-visible':
            return {
                EventName: 'form_view',
                Parameters: {
                    component_name: 'multiFactorAuthentication',
                    component_type: 'form',
                    form_action: 'view'
                }
            };
        case 'error-visible':
            return {
                EventName: 'dialog_view',
                Parameters: {
                    component_name: 'multiFactorAuthenticationbadActor',
                    component_type: 'dialog',
                    dialog_action: 'view',
                    dialog_type: 'info'
                }
            };
        case 'error-back':
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
        case 'mfa-error':
            return {
                EventName: 'form_error',
                Parameters: {
                    component_name: 'multiFactorAuthentication',
                    component_type: 'form',
                    form_action: 'error',
                    error_message: data
                }
            };
        case 'mfa-success':
            return {
                EventName: 'form_success',
                Parameters: {
                    component_name: 'multiFactorAuthentication',
                    component_type: 'form',
                    form_action: 'success'
                }
            };
        case 'help-visible':
            return {
                EventName: 'dialog_view',
                Parameters: {
                    component_name: 'multiFactorAuthenticationHelp',
                    component_type: 'dialog',
                    dialog_action: 'view',
                    dialog_type: 'info'
                }
            };
        case 'help-hidden':
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
        case 'help-login':
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
