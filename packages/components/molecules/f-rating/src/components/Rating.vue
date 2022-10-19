<template>
    <div
        :class="$style['c-rating']"
        data-test-id="rating-component">
        <div :class="$style['c-rating-starWrapper']">
            <div :class="$style['c-rating-container']">
                <star-icon
                    v-for="star in maxStarRating"
                    :key="star"
                    :class="[
                        $style['c-rating-star-empty'],
                        $style[`c-rating-star--${starRatingSize}`]
                    ]" />
            </div>

            <div
                :class="[
                    $style['c-rating-mask'],
                    $style['c-rating-container']
                ]"
                :style="getRatingStarPercentage">
                <star-filled-icon
                    v-for="star in maxStarRating"
                    :key="star"
                    :class="[
                        $style['c-rating-star-filled'],
                        $style[`c-rating-star--${starRatingSize}`]
                    ]" />
            </div>

            <span
                data-test-id="c-rating-description"
                class="is-visuallyHidden">
                {{ getRatingDescription }}
            </span>
        </div>
    </div>
</template>

<script>
import {
    StarFilledIcon,
    StarIcon
} from '@justeattakeaway/pie-icons-vue';
import { VueGlobalisationMixin } from '@justeat/f-globalisation';
import tenantConfigs from '../tenants';
import { VALID_STAR_RATING_SIZES } from '../constants';

export default {
    name: 'VRating',
    components: {
        StarFilledIcon,
        StarIcon
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
                    total: this.maxStarRating
                })

                : this.$tc('ratings.starsDescription', 2, {
                    rating: this.starRating,
                    total: this.maxStarRating
                });
        },

        /**
         * Calculate a percentage from the `starRating` value passed in by the consuming application.
         *
         * @returns {string}
         */
        getRatingStarPercentage () {
            const percentage = (this.starRating / this.maxStarRating) * 100;

            return `width: ${percentage}%`;
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-rating-starWrapper {
    margin: 0;
    padding: 0;
    position: relative;
    display: inline-block;
}
    .c-rating-container {
        display: flex;
    }

    .c-rating-star {
        &--small {
            width: 12px;
        }

        &--medium {
            width: 16px;
        }

        &--large {
            width: 28px;
        }
    }

    .c-rating-star-filled {
        & path {
            fill: f.$color-support-brand-01;
        }
    }

    .c-rating-star-empty {
        & path {
            fill: f.$color-mozzarella-50;
        }
    }

    .c-rating-mask {
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;

        svg {
            flex-shrink: 0;
        }
    }
</style>
