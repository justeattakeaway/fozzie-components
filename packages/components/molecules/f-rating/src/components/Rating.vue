<template>
    <div
        :class="[
            $style['c-rating'], {
                [$style['c-rating--alignLeft']]: shouldAlignRatingTextLeft
            }]"
        :data-test-id="`${getRatingVariant}-component`">
        <div :class="$style['c-rating-stars']">
            <component
                :is="getRatingVariant"
                :max-star-rating="maxStarRating"
                :star-rating-size="starRatingSize"
                :star-rating="starRating" />

            <span
                v-if="hasRatingAvailable"
                data-test-id="c-rating-description"
                class="is-visuallyHidden">
                {{ getRatingDescription }}
            </span>
        </div>

        <span
            v-if="ratingDisplayType"
            data-test-id="c-rating-displayType"
            :class="[
                $style['c-rating-message'],
                $style[`c-rating-message--${ratingDisplayType}`],
                $style[`c-rating-message--${ratingFontSize}`]
            ]">
            {{ getRatingDisplayFormat() }}
        </span>

        <span
            v-if="shouldDisplayUserOwnRating"
            :class="$style['c-rating-message']">
            {{ $t('ratings.userRating') }}
        </span>
    </div>
</template>

<script>
import { VueGlobalisationMixin } from '@justeat/f-globalisation';
import tenantConfigs from '../tenants';
import {
    VALID_STAR_RATING_SIZES,
    VALID_STAR_RATING_DISPLAY_TYPE,
    VALID_STAR_FONT_SIZES
} from '../constants';
import RatingMultiStar from './RatingMultiStarVariant.vue';
import RatingSingleStar from './RatingSingleStarVariant.vue';

export default {
    name: 'VRating',
    components: {
        RatingMultiStar,
        RatingSingleStar
    },

    mixins: [VueGlobalisationMixin],

    props: {
        locale: {
            type: String,
            default: ''
        },
        starRating: {
            type: Number,
            required: true,
            validator: value => value >= 0 && value <= 5
        },
        maxStarRating: {
            type: Number,
            default: 5,
            validator: value => value > 0 && value % 1 === 0 // Positive integers
        },
        starRatingSize: {
            type: String,
            default: 'small',
            validator: value => VALID_STAR_RATING_SIZES.includes(value)
        },
        ratingDisplayType: {
            type: String,
            default: null,
            validator: value => VALID_STAR_RATING_DISPLAY_TYPE.includes(value)
        },
        reviewCount: {
            type: Number,
            default: null
        },
        isSingleStarVariant: {
            type: Boolean,
            default: false
        },
        isUserRating: {
            type: Boolean,
            default: false
        },
        shouldAlignRatingTextLeft: {
            type: Boolean,
            default: false
        },
        ratingFontSize: {
            type: String,
            default: 'default',
            validator: value => VALID_STAR_FONT_SIZES.includes(value)
        }
    },

    data () {
        return {
            tenantConfigs
        };
    },

    computed: {
        /**
         * Return description using `vue-i18n Pluralization` if one star or an alternative if more.
         *
         * @returns {string|*}
         */
        getRatingDescription () {
            // Allow locale translations to be read within consuming applications if locale is not set when consuming this component.
            if (this.locale) {
                return this.starRating === 1 && this.locale
                    ? this.$tc('ratings.starsDescription', 1, {
                        rating: this.starRating,
                        maxStarRating: this.maxStarRating
                    })

                    : this.$tc('ratings.starsDescription', 2, {
                        rating: this.starRating,
                        maxStarRating: this.maxStarRating
                    });
            }

            return '';
        },

        /**
         * Return the correct imported star variant to use based on prop.
         *
         * @returns {string}
         */
        getRatingVariant () {
            return this.isSingleStarVariant
                ? 'rating-single-star'
                : 'rating-multi-star';
        },

        /**
         * Allow only valid rating display types, so we show
         * visually hidden text in those cases only.
         *
         * @returns {boolean}
         */
        hasRatingAvailable () {
            return this.reviewCount > 0;
        },

        /**
         * Determine if the users rating i.e (You), should be displayed.
         *
         * @returns {boolean}
         */
        shouldDisplayUserOwnRating () {
            return this.isUserRating && this.hasRatingAvailable;
        }
    },

    methods: {
        /**
         * Gets the correct rating display format from translations.
         *
         * 1. If reviewCount is Zero, return "No ratings yet".
         * 2. If reviewCount is available, return `ratingDisplayType` .
         *
         * @returns {string}
         */
        getRatingDisplayFormat () {
            if (!this.hasRatingAvailable) {
                return this.$t('ratings.ratingDisplayType.noRating');
            }

            return this.$t(`ratings.ratingDisplayType.${this.ratingDisplayType}`, {
                rating: this.starRating,
                maxStarRating: this.maxStarRating,
                reviewCount: this.reviewCount
            });
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;
@use '../../src/assets/scss/rating';

.c-rating-message {
    display: flex;
    align-items: center;
    font-weight: f.$font-weight-bold;
    margin-left: f.spacing(a);

    .c-rating--alignLeft & {
        margin-left: 0;
        margin-right: f.spacing(b);
    }
}

.c-rating-message--default {
    @include f.font-size('body-s');
}

.c-rating-message--large {
    @include f.font-size('heading-xl');
}
</style>
