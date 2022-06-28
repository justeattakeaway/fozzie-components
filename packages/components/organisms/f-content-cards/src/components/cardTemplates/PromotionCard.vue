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
@use '@justeat/fozzie/src/scss/fozzie' as f;

$btn-secondary-bgColor              : f.$color-interactive-secondary;
$btn-secondary-bgColor--hover       : darken(f.$color-interactive-secondary, f.$color-hover-01);
$btn-secondary-bgColor--active      : darken(f.$color-interactive-secondary, f.$color-active-01);
$btn-secondary-textColor            : f.$color-content-interactive-secondary;
$btn-secondary-textColor--hover     : f.$color-content-interactive-secondary;
$btn-secondary-textColor--active    : f.$color-content-interactive-secondary;

    .c-contentCard-linkPromo2 {
        font-weight: f.$font-weight-bold;
        text-decoration: none;
        @include f.font-size(body-l);
        color: f.$color-content-link;
        display: block;
    }

    .c-contentCard-linkPromo1 {
        background-color: $btn-secondary-bgColor;

        border: 1px solid transparent;
        user-select: none;
        overflow: visible;
        text-align: center;
        cursor: pointer;
        margin-right: f.spacing();
        display: inline-block;
        vertical-align: middle;

        padding: f.spacing() 1.2em;
        border-radius: f.$radius-rounded-c;
        font-weight: f.$font-weight-bold;
        font-family: f.$font-family-base;
        @include f.font-size('body-l');
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
