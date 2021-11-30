<template>
    <p :class="[$style['c-restaurantCard-rating']]">
        <!-- Icons -->
        <star-empty-icon
            v-if="noRatingsAvailable"
            aria-hidden="true"
            :class="[$style['c-restaurantCard-ratingStar']]" />

        <star-filled-icon
            v-else
            aria-hidden="true"
            :class="[$style['c-restaurantCard-ratingStar']]" />

        <!-- No ratings message -->
        <span
            v-if="noRatingsAvailable"
            :class="[$style['c-restaurantCard-ratingNotRatedMsg']]">
            {{ notRatedMessage }}
        </span>

        <template v-else>
            <!-- Screenreader message (hidden) -->
            <span class="is-visuallyHidden">
                {{ accessibleMessage }}
            </span>

            <!-- Mean value -->
            <data
                :class="[$style['c-restaurantCard-ratingMean']]"
                :value="mean"
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
                    :class="[$style['c-restaurantCard-ratingCount']]"
                    :value="count">
                    {{ count }}
                </data>
                <span
                    v-else
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
        isOwnRating: {
            type: Boolean,
            default: false
        },
        mean: {
            type: Number,
            default: 0
        },
        count: {
            type: Number,
            default: 0
        },
        notRatedMessage: {
            type: String,
            default: '' // this is temporary whilst i18n is being fixed - ticket exists to fix
        },
        accessibleMessage: {
            type: String,
            default: '' // this is temporary whilst i18n is being fixed - ticket exists to fix
        },
        isOwnRatingMessage: {
            type: String,
            default: '' // this is temporary whilst i18n is being fixed - ticket exists to fix
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
    display: flex;
    align-items: center;
    font-size: 14px;
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

