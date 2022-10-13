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
                    v-if="getRating(star)"
                    :class="$style['c-rating-star-filled']" />
                <star-icon
                    v-else
                    :class="$style['c-rating-star-empty']" />
            </li>
            <span
                data-test-id="c-rating-description"
                class="is-visuallyHidden">
                {{ starRating }} {{ setRatingDescription }} {{ maxStarRating }}
            </span>
        </ul>
    </div>
</template>

<script>
import {
    StarFilledIcon,
    StarIcon
} from '@justeattakeaway/pie-icons-vue';
import { globalisationServices } from '@justeat/f-services';
import tenantConfigs from '../tenants';

export default {
    name: 'VRating',
    components: {
        StarFilledIcon,
        StarIcon
    },
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
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];

        return {
            copy: { ...localeConfig },
            rating: this.starRating
        };
    },

    computed: {
        /**
         * Return singular description if one star.
         *
         * @returns {string|*}
         */
        setRatingDescription () {
            return this.starRating < 2
                ? this.copy.ratings.starsDescriptionSingular
                : this.copy.ratings.starsDescription;
        }
    },

    methods: {
        /**
         * Check if `star` against value passed by consumer to allow empty stars to render.
         *
         * @param star
         * @returns {boolean}
         */
        getRating (star) {
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
}
</style>
