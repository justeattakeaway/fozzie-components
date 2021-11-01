import { VALID_BUTTON_ICON_POSITION } from '../src/constants';

export default {
    disabled: {
        control: { type: 'boolean' },
        defaultValue: false
    },
    isFullWidth: {
        control: { type: 'boolean' },
        description: 'Button will take the whole free space of the container',
        defaultValue: false
    },
    isLoading: {
        control: { type: 'boolean' },
        description: 'Spinner instead of button text',
        defaultValue: false
    },
    hasIcon: {
        control: { type: 'select', options: VALID_BUTTON_ICON_POSITION },
        description: 'Adds icon to the button text',
        defaultValue: false
    },
    href: {
        control: { type: 'text' },
        description: 'Should be presented for the button to become a link <a> element',
        defaultValue: ''
    },
    actionType: {
        control: { type: 'select', options: ['button', 'submit', 'reset'] },
        description: 'Choose the action type of the button',
        defaultValue: 'button'
    }
};
