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
        options: ['noRating', 'short', 'medium', 'long', null],
        description: 'Choose how to display a rating',
        default: null
    }
};
