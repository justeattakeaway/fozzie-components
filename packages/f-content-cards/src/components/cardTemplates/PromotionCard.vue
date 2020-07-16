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
            :class="[cardContainerStyles['c-contentCard-link'], 'o-btnLink']"
            :data-test-id="testIdForPromoCardType(2)">
            {{ ctaText }}
        </span>
    </card-container>
</template>

<script>
/* eslint-disable import/no-duplicates */
import CardContainer from './CardContainer.vue';
import CardContainerStyles from './CardContainer.vue?vue&type=style&index=0&lang=scss&module=true&';
/* eslint-enable import/no-duplicates */

export default {
    components: {
        CardContainer
    },
    props: {
        card: {
            type: Object,
            default: () => ({})
        },
        cardContainerStyles: {
            type: Object,
            default: () => CardContainerStyles
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
            extras = {},
            linkText
        } = this.card;
        const {
            button_1: button,
            custom_card_type: type
        } = extras;
        return {
            ctaText: button || linkText,
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
    }
</style>
