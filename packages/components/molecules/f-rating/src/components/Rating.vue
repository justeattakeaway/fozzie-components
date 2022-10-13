<template>
    <div
        :class="$style['c-rating']"
        data-test-id="rating-component">
        <ul :class="$style['c-rating-star-wrapper']">
            <li
                v-for="star in maxStarRating"
                :key="star"
                :class="$style['c-rating-star']">
                <star-filled-icon
                    v-if="hasRating(star)"
                    :class="$style['c-rating-star-filled']" />
                <star-icon
                    v-else
                    :class="$style['c-rating-star-empty']" />
            </li>
        </ul>
        <span
            data-test-id="c-rating-description"
            class="is-visuallyHidden">
            {{ getRatingDescription }}
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
            required: true
        },
        maxStarRating: {
            type: Number,
            default: 5
        }
    },

    data () {
        return {
            tenantConfigs,
            rating: this.starRating
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
                    rating: this.rating,
                    total: this.maxStarRating
                })

                : this.$tc('ratings.starsDescription', 2, {
                    rating: this.rating,
                    total: this.maxStarRating
                });
        }
    },

    methods: {
        /**
         * Check `star` against value passed by consumer to allow empty stars to render.
         *
         * @param star
         * @returns {boolean}
         */
        hasRating (star) {
            return star <= this.rating;
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-rating {
    .c-rating-star-wrapper {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

    .c-rating-star {
        display: inline-block;
        width: 15px; // Todo - decide on how to size these. Will create a ticket around this.
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
}
</style>
