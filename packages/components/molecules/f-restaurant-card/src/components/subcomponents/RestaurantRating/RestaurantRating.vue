<template>
    <p :class="[$style['c-restaurantCard-rating']]">
        <!-- Icons -->
        <star-empty-icon
            v-if="noRatingsAvailable"
            aria-hidden="true"
            data-test-id="ratings-star-empty"
            :class="[$style['c-restaurantCard-ratingStar']]" />

        <star-filled-icon
            v-else
            aria-hidden="true"
            data-test-id="ratings-star-filled"
            :class="[$style['c-restaurantCard-ratingStar']]" />

        <!-- No ratings message -->
        <span
            v-if="noRatingsAvailable"
            data-test-id="no-ratings-message"
            :class="[$style['c-restaurantCard-ratingNotRatedMsg']]">
            {{ notRatedMessage }}
        </span>

        <template v-else>
            <!-- Screenreader message (hidden) -->
            <!-- NOTE: The accessibility requires for both this and the restaurant card as a whole
                 are still being discovered. Therefore this is subject to change -->
            <span
                data-test-id="ratings-summary-message"
                class="is-visuallyHidden">
                {{ accessibleMessage }}
            </span>

            <!-- Mean value -->
            <data
                :class="[$style['c-restaurantCard-ratingMean']]"
                :value="mean"
                data-test-id="ratings-mean-value"
                aria-hidden="true">
                {{ meanFormatted }}
            </data>

            <span
                aria-hidden="true"
                :class="[$style['c-restaurantCard-ratingDivider']]">&#47;</span>

            <!-- Max value -->
            <data
                :class="[$style['c-restaurantCard-ratingOutOf']]"
                :value="ratingsMax"
                aria-hidden="true">
                {{ ratingsMax }}
            </data>

            <!-- Number of ratings/Own rating message -->
            <span aria-hidden="true">
                &#40;
                <data
                    v-if="!isOwnRating"
                    data-test-id="rating-count"
                    :class="[$style['c-restaurantCard-ratingCount']]"
                    :value="count">
                    {{ count }}
                </data>
                <span
                    v-else
                    data-test-id="rating-own-rating-message"
                    :class="[$style['c-restaurantCard-ratingCount']]">
                    {{ isOwnRatingMessage }}
                </span>
                &#41;
            </span>
        </template>
    </p>
</template>

<script>
import { StarEmptyIcon, StarFilledIcon } from '@justeat/f-vue-icons';

const RATINGS_MAX = 6;

export default {
    name: 'RestaurantRating',
    components: {
        StarEmptyIcon,
        StarFilledIcon
    },
    props: {
        /**
         * Indications whether or not a user themselves has provided a rating for the item in question
         */
        isOwnRating: {
            type: Boolean,
            default: false
        },
        /**
         * The mean value of the rating
         */
        mean: {
            type: Number,
            default: 0
        },
        /**
         * How many ratings have been given for the item in question
         */
        count: {
            type: Number,
            default: 0
        },
        /**
         * Message to display when no ratings available
         * this is temporary whilst i18n is being fixed - ticket exists to fix
         */
        notRatedMessage: {
            type: String,
            default: ''
        },
        /**
         * A visually hidden message to provide for screen readers that summarises the rating
         * this is temporary whilst i18n is being fixed - ticket exists to fix
         */
        accessibleMessage: {
            type: String,
            default: ''
        },
        /**
         * Message to display when `isOwnRating` is true
         * this is temporary whilst i18n is being fixed - ticket exists to fix
         */
        isOwnRatingMessage: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            ratingsMax: RATINGS_MAX
        };
    },
    computed: {
        noRatingsAvailable () {
            return !this.count || !this.mean;
        },
        meanFormatted () {
            return Number.parseFloat(this.mean).toFixed(2);
        }
    }
};
</script>

<style lang="scss" module>
.c-restaurantCard-rating {
    @include font-size($font-body-s-paragraph);
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
}

.c-restaurantCard-ratingStar {
    width: spacing(x2);
    height: spacing(x2);
    margin-right: spacing(x0.5);
}

.c-restaurantCard-ratingMean {
    font-weight: $font-weight-bold;
}

.c-restaurantCard-ratingOutOf {
    margin-right: spacing(x0.5);
}

.c-restaurantCard-ratingNotRatedMsg,
.c-restaurantCard-ratingDivider,
.c-restaurantCard-ratingOutOf,
.c-restaurantCard-ratingCount {
    color: $color-content-subdued;
}

.c-restaurantCard-ratingCount {
    margin: 0 -(spacing(x0.5));
}

.c-restaurantCard-ratingStar path {
    fill: $color-orange-30;
}
</style>

