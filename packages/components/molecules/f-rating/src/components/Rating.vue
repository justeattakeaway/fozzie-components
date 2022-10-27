<template>
    <div
        :class="$style['c-rating']"
        data-test-id="rating-component">
        <div :class="$style['c-rating-stars']">
            <component
                :is="setRatingVariant"
                :max-star-rating="maxStarRating"
                :star-rating-size="starRatingSize"
                :star-rating="starRating" />

            <span
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
                $style[`c-rating-message--${ratingDisplayType}`]]">
            {{ getRatingDisplayFormat() }}
        </span>
    </div>
</template>

<script>
import { VueGlobalisationMixin } from '@justeat/f-globalisation';
import tenantConfigs from '../tenants';
import {
    VALID_STAR_RATING_SIZES,
    VALID_STAR_RATING_DISPLAY_TYPE
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
            default: 5
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
         *
         * @returns {string|*}
         */
        getRatingDescription () {
            return this.starRating < 2
                ? this.$tc('ratings.starsDescription', 1, {
                    rating: this.starRating,
                    maxStarRating: this.maxStarRating
                })

                : this.$tc('ratings.starsDescription', 2, {
                    rating: this.starRating,
                    maxStarRating: this.maxStarRating
                });
        },

        /**
         * Return the correct imported star variant to use based on prop.
         *
         * @returns {string}
         */
        setRatingVariant () {
            return this.isSingleStarVariant
                ? 'rating-single-star'
                : 'rating-multi-star';
        }
    },

    methods: {
        /**
         * Gets the correct rating display format from translations.
         *
         * @todo - If the component is using `short` as a `starRatingSize` we shouldn't display text
         * alongside it for now. (TBC with design - ticket in backlog).
         *
         * @returns {string}
         */
        getRatingDisplayFormat () {
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
    @include f.font-size('body-s');
    font-weight: f.$font-weight-bold;
    margin-left: f.spacing(a);
}
</style>
