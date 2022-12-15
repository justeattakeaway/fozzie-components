import { locales } from '@justeat/storybook/constants/globalisation';
import {
    VALID_STAR_RATING_DISPLAY_TYPE,
    VALID_STAR_FONT_SIZES
} from '../src/constants';

export default {
    locale: {
        control: { type: 'select' },
        options: [locales.gb],
        description: 'Choose a locale',
        defaultValue: locales.gb
    },

    ratingDisplayType: {
        control: { type: 'select', options: VALID_STAR_RATING_DISPLAY_TYPE },
        options: VALID_STAR_RATING_DISPLAY_TYPE,
        description: 'Choose how to display a rating',
        defaultValue: null
    },

    shouldAlignRatingTextLeft: {
        control: { type: 'boolean', options: [false, true] },
        description: 'Choose how to align a rating message',
        defaultValue: false
    },

    isUserRating: {
        control: { type: 'boolean' },
        description: 'Review by user (You)',
        defaultValue: false
    },

    ratingFontSize: {
        control: { type: 'select', options: VALID_STAR_FONT_SIZES },
        options: VALID_STAR_FONT_SIZES,
        description: 'Set a different font size for your rating',
        defaultValue: 'default'
    }
};
