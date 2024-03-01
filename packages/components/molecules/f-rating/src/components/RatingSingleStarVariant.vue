<template>
    <div
        :class="$style['c-rating']">
        <div :class="$style['c-rating-stars-icon']">
            <star-filled-icon
                v-if="starRating"
                :class="[
                    $style['c-rating-star'],
                    $style['c-rating-star--filled'],
                    $style[`c-rating-star--${starRatingSize}`]
                ]" />
            <star-icon
                v-else
                :class="[
                    $style['c-rating-star'],
                    $style['c-rating-star--empty'],
                    $style[`c-rating-star--${starRatingSize}`]
                ]" />
        </div>
    </div>
</template>

<script>
import {
    StarIcon,
    StarFilledIcon
} from '@justeattakeaway/pie-icons-vue';

export default {
    name: 'RatingSingleStar',

    components: {
        StarFilledIcon,
        StarIcon
    },

    props: {
        starRating: {
            type: Number,
            default: 0
        },
        starRatingSize: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="css" module>
</style>
