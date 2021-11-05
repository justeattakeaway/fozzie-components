<template>
    <p :class="[$style['c-restaurantCard-rating']]">
        <!-- Icons -->
        <star-empty-icon
            v-if="notRated"
            aria-hidden="true"
            :class="[$style['c-restaurantCard-ratingStar']]" />

        <star-filled-icon
            v-else
            aria-hidden="true"
            :class="[$style['c-restaurantCard-ratingStar']]" />

        <span
            v-if="notRated"
            :class="[$style['c-restaurantCard-ratingNotRatedMsg']]">
            {{ notRatedMessage }}
        </span>

        <template v-else>
            <!-- Screenreader message -->
            <span class="is-visuallyHidden">
                {{ accessibleMessage }}
            </span>
            <!-- Mean value -->
            <data
                :class="[$style['c-restaurantCard-ratingMean']]"
                :value="mean"
                aria-hidden="true">
                {{ mean }}
            </data>

            <span :class="[$style['c-restaurantCard-ratingDivider']]">/</span>
            <data
                :class="[$style['c-restaurantCard-ratingOutOf']]"
                :value="ratingsMax"
                aria-hidden="true">
                {{ ratingsMax }}
            </data>
            <span aria-hidden="true">
                (
                <data
                    v-if="!isOwnRating"
                    :class="[$style['c-restaurantCard-ratingCount']]"
                    :value="count">
                    {{ count }}
                </data>
                <span v-else>
                    {{ isOwnRatingMessage }}
                </span>
                )
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
        notRated: {
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
            required: true // this is temporary whilst i18n is being fixed - ticket exists to fix
        },
        accessibleMessage: {
            type: String,
            required: true // this is temporary whilst i18n is being fixed - ticket exists to fix
        },
        isOwnRatingMessage: {
            type: String,
            required: true // this is temporary whilst i18n is being fixed - ticket exists to fix
        }
    },
    data () {
        return {
            ratingsMax: RATINGS_MAX
        };
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
</style>

