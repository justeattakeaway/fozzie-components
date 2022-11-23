import { locales } from '@justeat/storybook/constants/globalisation';

export default {
    locale: {
        control: { type: 'select' },
        options: [locales.gb],
        description: 'Choose a locale',
        defaultValue: locales.gb
    },
    ratingDisplayType: {
        control: { type: 'select' },
        options: ['short', 'medium', 'long'],
        description: 'Choose how to display a rating',
        default: null
    },

    isUserRating: {
        control: { type: 'select' },
        options: [false, true],
        description: 'Review by user (You)',
        default: false
    }
};
