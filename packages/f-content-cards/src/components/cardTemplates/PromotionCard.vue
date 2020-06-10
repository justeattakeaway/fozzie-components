<template>
    <card-container
        :card="card"
        :container-title="containerTitle"
        :is-carousel="isCarousel">
        <span
            v-if="type === 'Promotion_Card_1'"
            class="o-btn o-btn--secondary"
            data-test-id="contentCard-promoCard-1">
            {{ ctaText }}
        </span>
        <span
            v-if="type === 'Promotion_Card_2'"
            class="c-restaurantCard-link o-btnLink"
            data-test-id="contentCard-promoCard-2">
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
    }
};
</script>
