<template>
    <card-container
        class="c-postOrderCard"
        :card="card"
        :container-title="containerTitle"
        :is-carousel="isCarousel">
        <span
            class="o-btn o-btn--tertiary"
            data-test-id="contentCard-postOrderCard-1">
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
