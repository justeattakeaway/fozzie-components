<template>
    <card-container
        :card="card"
        :container-title="containerTitle"
        :is-carousel="isCarousel"
        :data-test-id="testId"
        :bold-title="true"
    >
        <span
            v-if="type === 'Promotion_Card_1'"
            :class="[$style['c-contentCard-linkPromo1']]"
            :data-test-id="testIdForPromoCardType(1)">
            {{ ctaText }}
        </span>
        <span
            v-if="type === 'Promotion_Card_2'"
            :class="[$style['c-contentCard-linkPromo2']]"
            :data-test-id="testIdForPromoCardType(2)">
            {{ ctaText }}
        </span>
    </card-container>
</template>

<script>
import CardContainer from './CardContainer.vue';

export default {
    components: {
        CardContainer
    },
    props: {
        card: {
            type: Object,
            default: () => ({})
        },
        containerTitle: {
            type: String,
            default: ''
        },
        isCarousel: {
            type: Boolean,
            default: false
        },
        testId: {
            type: String,
            default: null
        }
    },
    data () {
        const {
            button,
            ctaText,
            type
        } = this.card;
        return {
            button,
            ctaText,
            type
        };
    },

    methods: {
        testIdForPromoCardType (type) {
            return this.testId && `contentCard-promoCard-${type}`;
        }
    }
};
</script>

<style lang="scss" module>

    $btn-secondary-bgColor              : $blue--offWhite;
    $btn-secondary-bgColor--hover       : $blue--offWhite--dark;
    $btn-secondary-bgColor--active      : $blue--offWhite--darkest;
    $btn-secondary-textColor            : $blue;
    $btn-secondary-textColor--hover     : $blue;
    $btn-secondary-textColor--active    : $blue;

    .c-contentCard-linkPromo2 {
        font-weight: $font-weight-bold;
        text-decoration: none;
        @include font-size(body-l);
        color: $color-secondary;
        display: block;
    }

    .c-contentCard-linkPromo1 {
        background-color: $btn-secondary-bgColor;

        border: 1px solid transparent;
        user-select: none;
        overflow: visible;
        text-align: center;
        cursor: pointer;
        margin-right: spacing();
        display: inline-block;
        vertical-align: middle;

        padding: spacing() 1.2em;
        border-radius: $border-radius;
        font-weight: $font-weight-bold;
        font-family: $font-family-base;
        @include font-size('body-l');
        text-decoration: none;

        &,
        &:link,
        &:visited {
            color: $btn-secondary-textColor;
        }

        &:hover,
        &:active,
        &:focus {
            color: $btn-secondary-textColor;
        }

        &:hover {
            background-color: $btn-secondary-bgColor--hover;
        }

        &:active {
            background-color: $btn-secondary-bgColor--active;
        }
    }

</style>
