<template>
    <div
        :class="$style['c-rating']"
        data-test-id="rating-component">
        <div :class="$style['c-rating-stars-icons']">
            <star-icon
                v-for="star in maxStarRating"
                :key="star"
                :class="[
                    $style['c-rating-star'],
                    $style['c-rating-star--empty'],
                    $style[`c-rating-star--${starRatingSize}`]
                ]" />
        </div>

        <div
            :class="[
                $style['c-rating-mask'],
                $style['c-rating-stars-icons']
            ]"
            :style="`--starRatingPercentage: ${getRatingStarPercentage}%`">
            <star-filled-icon
                v-for="star in maxStarRating"
                :key="star"
                :class="[
                    $style['c-rating-star'],
                    $style['c-rating-star--filled'],
                    $style[`c-rating-star--${starRatingSize}`]
                ]" />
        </div>
    </div>
</template>

<script>
import {
    StarFilledIcon,
    StarIcon
} from '@justeattakeaway/pie-icons-vue';

export default {
    components: {
        StarFilledIcon,
        StarIcon
    },

    props: {
        starRating: {
            type: Number,
            default: 0
        },
        maxStarRating: {
            type: Number,
            default: 5
        },
        starRatingSize: {
            type: String,
            default: ''
        }
    },

    computed: {
        /**
         * Calculate a percentage from the `starRating` value passed in by the consuming application.
         *
         * @returns {Number}
         */
        getRatingStarPercentage () {
            return (this.starRating / this.maxStarRating) * 100;
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;
@use '../../src/assets/scss/rating';

.c-rating-mask {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: var(--starRatingPercentage);

    svg {
        flex-shrink: 0;
    }
}
</style>
