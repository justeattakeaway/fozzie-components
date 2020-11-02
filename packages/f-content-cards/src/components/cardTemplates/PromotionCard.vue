<template>
    <card-container
        :card="card"
        :container-title="containerTitle"
        :is-carousel="isCarousel"
        :data-test-id="testId">
        <span
            v-if="type === 'Promotion_Card_1'"
            class="o-btn o-btn--secondary"
            :data-test-id="testIdForPromoCardType(1)">
            {{ ctaText }}
        </span>
        <span
            v-if="type === 'Promotion_Card_2'"
            :class="[$style['c-contentCard-link']]"
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
    .c-contentCard-link {
        font-weight: $font-weight-bold;
        text-decoration: none;
        @include font-size(body-l);
        color: $color-secondary;
        margin-top: spacing();
        display: block; // TODO replace
    }
</style>
