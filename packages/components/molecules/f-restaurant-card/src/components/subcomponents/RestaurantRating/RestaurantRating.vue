<template>
    <p :class="[$style['c-restaurantCard-rating']]">
        <!-- Icons -->
        <star-empty-icon
            v-if="noRatingsAvailable"
            aria-hidden="true"
            data-test-id="ratings-star-empty"
            :class="[$style['c-restaurantCard-rating-star']]" />

        <star-filled-icon
            v-else
            aria-hidden="true"
            data-test-id="ratings-star-filled"
            :class="[$style['c-restaurantCard-rating-star']]" />

        <!-- No ratings message -->
        <span
            v-if="noRatingsAvailable"
            data-test-id="no-ratings-message"
            :class="[$style['c-restaurantCard-rating-notRatedMsg']]">
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
                :class="[$style['c-restaurantCard-rating-mean']]"
                :value="mean"
                data-test-id="ratings-mean-value"
                aria-hidden="true">
                {{ meanFormatted }}
            </data>

            <span
                aria-hidden="true"
                :class="[$style['c-restaurantCard-rating-divider']]">&#47;</span>

            <!-- Max value -->
            <data
                :class="[$style['c-restaurantCard-rating-outOf']]"
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
                    :class="[$style['c-restaurantCard-rating-count']]"
                    :value="count">
                    {{ count }}
                </data>
                <span
                    v-else
                    data-test-id="rating-own-rating-message"
                    :class="[$style['c-restaurantCard-rating-count']]">
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
         * Indicates whether or not a user themselves has provided a rating for the item in question
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
    @include font-size(body-s);
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
}

.c-restaurantCard-rating-star {
    width: spacing(d);
    height: spacing(d);
    margin-right: spacing(a);

    & path {
        fill: $color-orange-30;
    }
}

.c-restaurantCard-rating-mean {
    font-weight: $font-weight-bold;
}

.c-restaurantCard-rating-outOf {
    margin-right: spacing(a);
}

.c-restaurantCard-rating-notRatedMsg,
.c-restaurantCard-rating-divider,
.c-restaurantCard-rating-outOf,
.c-restaurantCard-rating-count {
    color: $color-content-subdued;
}

.c-restaurantCard-rating-count {
    margin: 0 -(spacing(a));
}
</style>

