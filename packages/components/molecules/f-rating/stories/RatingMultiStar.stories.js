import { withA11y } from '@storybook/addon-a11y';
import { locales } from '@justeat/storybook/constants/globalisation';
import Rating from '../src/components/Rating.vue';
import commonDefaults from './commonDefaults';

export default {
    title: 'Components/Molecules/f-rating',
    decorators: [withA11y]
};

export const RatingComponent = (args, { argTypes }) => ({
    components: {
        Rating
    },

    props: Object.keys(argTypes),

    template: `
        <div>
            <div
                class="u-spacingBottom--large storybook-grid storybook-grid-columns--4 storybook-grid-stack--lessThanWide"
                v-for="(list) in ratingVariants">
                <rating
                    v-for="(rating) in list"
                    v-bind="$props"
                    :starRatingSize="rating.starRatingSize"
                    :starRating="rating.starRating"
                    :reviewCount="rating.reviewCount" />
            </div>
        </div>`
});

RatingComponent.storyName = 'f-rating Multi Star';

RatingComponent.args = {
    locale: locales.gb
};

RatingComponent.argTypes = {
    ...commonDefaults,

    isSingleStarVariant: {
        control: { type: 'select' },
        options: [false, true],
        description: 'Choose star rating variant (Single = true or Multi star = false)',
        default: false
    }
};

RatingComponent.args = {
    ratingVariants: [
        [
            { starRating: 0, starRatingSize: 'small', reviewCount: 0 },
            { starRating: 2.3, starRatingSize: 'small', reviewCount: 499 },
            { starRating: 4.5, starRatingSize: 'small', reviewCount: 499 },
            { starRating: 1.3, starRatingSize: 'small', reviewCount: 499 },

            { starRating: 0, starRatingSize: 'medium', reviewCount: 0 },
            { starRating: 2.3, starRatingSize: 'medium', reviewCount: 499 },
            { starRating: 4.5, starRatingSize: 'medium', reviewCount: 499 },
            { starRating: 1.3, starRatingSize: 'medium', reviewCount: 499 },

            { starRating: 0, starRatingSize: 'large', reviewCount: 0 },
            { starRating: 2.3, starRatingSize: 'large', reviewCount: 499 },
            { starRating: 4.5, starRatingSize: 'large', reviewCount: 499 },
            { starRating: 1.3, starRatingSize: 'large', reviewCount: 499 }
        ]
    ]
};
