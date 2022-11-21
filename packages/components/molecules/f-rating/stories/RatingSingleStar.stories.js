import { withA11y } from '@storybook/addon-a11y';
import { locales } from '@justeat/storybook/constants/globalisation';
import Rating from '../src/components/Rating.vue';
import commonDefaults from './commonDefaults';

export default {
    title: 'Components/Molecules/f-rating',
    decorators: [withA11y]
};

export const RatingSingleStarComponent = (args, { argTypes }) => ({
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
                    :is-single-star-variant="rating.isSingleStarVariant"
                    :starRatingSize="rating.starRatingSize"
                    :starRating="rating.starRating"
                    :reviewCount="rating.reviewCount" />
            </div>
        </div>`
});

RatingSingleStarComponent.storyName = 'f-rating Single Star';

RatingSingleStarComponent.args = {
    locale: locales.gb
};

RatingSingleStarComponent.argTypes = {
    ...commonDefaults,

    isSingleStarVariant: {
        default: true
    }
};

RatingSingleStarComponent.args = {
    ratingVariants: [
        [
            {
                starRating: 0, starRatingSize: 'xsmall', reviewCount: 499, isSingleStarVariant: true, isUserRating: true
            },
            {
                starRating: 2.3, starRatingSize: 'xsmall', reviewCount: 499, isSingleStarVariant: true
            },
            {
                starRating: 4.5, starRatingSize: 'xsmall', reviewCount: 499, isSingleStarVariant: true
            },
            {
                starRating: 1.3, starRatingSize: 'xsmall', reviewCount: 499, isSingleStarVariant: true
            },

            {
                starRating: 0, starRatingSize: 'small', reviewCount: 499, isSingleStarVariant: true, isUserRating: true
            },
            {
                starRating: 2.3, starRatingSize: 'small', reviewCount: 499, isSingleStarVariant: true
            },
            {
                starRating: 4.5, starRatingSize: 'small', reviewCount: 499, isSingleStarVariant: true
            },
            {
                starRating: 1.3, starRatingSize: 'small', reviewCount: 499, isSingleStarVariant: true
            },

            {
                starRating: 0, starRatingSize: 'medium', reviewCount: 499, isSingleStarVariant: true, isUserRating: true
            },
            {
                starRating: 2.3, starRatingSize: 'medium', reviewCount: 499, isSingleStarVariant: true
            },
            {
                starRating: 4.5, starRatingSize: 'medium', reviewCount: 499, isSingleStarVariant: true
            },
            {
                starRating: 1.3, starRatingSize: 'medium', reviewCount: 499, isSingleStarVariant: true
            },

            {
                starRating: 0, starRatingSize: 'large', reviewCount: 499, isSingleStarVariant: true, isUserRating: true
            },
            {
                starRating: 2.3, starRatingSize: 'large', reviewCount: 499, isSingleStarVariant: true
            },
            {
                starRating: 4.5, starRatingSize: 'large', reviewCount: 499, isSingleStarVariant: true
            },
            {
                starRating: 1.3, starRatingSize: 'large', reviewCount: 499, isSingleStarVariant: true
            }
        ]
    ]
};
