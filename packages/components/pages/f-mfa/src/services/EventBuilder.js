/* eslint-disable camelcase */
// eslint-disable-next-line import/prefer-default-export
export const buildEvent = (key, data = '') => {
    switch (key) {
        case 's1b':
            return {
                EventName: 'form_view',
                Parameters: {
                    component_name: 'multiFactorAuthentication',
                    component_type: 'form',
                    form_action: 'view'
                }
            };
        case 's2':
            return {
                EventName: 'dialog_view',
                Parameters: {
                    component_name: 'multiFactorAuthenticationbadActor',
                    component_type: 'dialog',
                    dialog_action: 'view',
                    dialog_type: 'info'
                }
            };
        case 's3':
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
        case 's4':
            return {
                EventName: 'form_error',
                Parameters: {
                    component_name: 'multiFactorAuthentication',
                    component_type: 'form',
                    form_action: 'error',
                    error_message: `${data}`
                }
            };
        case 's6':
            return {
                EventName: 'form_success',
                Parameters: {
                    component_name: 'multiFactorAuthentication',
                    component_type: 'form',
                    form_action: 'success'
                }
            };
        case 's7':
            return {
                EventName: 'dialog_view',
                Parameters: {
                    component_name: 'multiFactorAuthenticationHelp',
                    component_type: 'dialog',
                    dialog_action: 'view',
                    dialog_type: 'info'
                }
            };
        case 's8':
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
        case 's9':
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
