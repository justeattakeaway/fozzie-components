<template>
    <div
        :class="$style['c-rating']"
        data-test-id="rating-component">
        <div :class="$style['c-rating-stars']">
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
                :style="`--starRatingPercentage: ${getRatingStarPercentage}`">
                <star-filled-icon
                    v-for="star in maxStarRating"
                    :key="star"
                    :class="[
                        $style['c-rating-star'],
                        $style['c-rating-star--filled'],
                        $style[`c-rating-star--${starRatingSize}`]
                    ]" />
            </div>

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
import {
    StarFilledIcon,
    StarIcon
} from '@justeattakeaway/pie-icons-vue';
import { VueGlobalisationMixin } from '@justeat/f-globalisation';
import tenantConfigs from '../tenants';
import {
    VALID_STAR_RATING_SIZES,
    VALID_STAR_RATING_DISPLAY_TYPE
} from '../constants';

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
            validator: value => !!VALID_STAR_RATING_SIZES[value]
        },
        ratingDisplayType: {
            type: String,
            default: null,
            validator: value => VALID_STAR_RATING_DISPLAY_TYPE.includes(value)
        },
        reviewCount: {
            type: Number,
            default: null
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
         * Calculate a percentage from the `starRating` value passed in by the consuming application.
         *
         * @returns {string}
         */
        getRatingStarPercentage () {
            return `${(this.starRating / this.maxStarRating) * 100}%`;
        }
    },

    methods: {
        /**
         * Display review rating message format.
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

.c-rating {
    display: flex;
}

.c-rating-stars {
    margin: 0;
    padding: 0;
    position: relative;
    display: inline-block;
}
    .c-rating-stars-icons {
        display: flex;
    }

    .c-rating-star {
        width: 12px;
    }

    .c-rating-star--medium {
        width: 16px;
    }

    .c-rating-star--large {
        width: 28px;
    }

    .c-rating-star--filled {
        & path {
            fill: f.$color-support-brand-01;
        }
    }

    .c-rating-star--empty {
        & path {
            fill: f.$color-mozzarella-50;
        }
    }

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

    .c-rating-message {
        display: flex;
        align-items: center;
        @include f.font-size('body-s');
        font-weight: f.$font-weight-bold;
        margin-left: f.spacing(a);
    }
</style>
