<template>
    <div :class="['c-postOrderCard' , { 'c-postOrderCard--condensed': !image && icon }]">
        <h2>{{ title }}</h2>
        <card-container
            :card="card"
            :container-title="containerTitle"
            :is-carousel="isCarousel">
            <span
                class="o-link--full o-link--bold u-color-link u-text-left"
                data-test-id="contentCard-postOrderCard-1">
                {{ ctaText }}
            </span>
        </card-container>
    </div>
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
        title: {
            type: String,
            default: ''
        }
    },
    data () {
        const {
            extras = {},
            linkText
        } = this.card;
        const {
            button_1: button,
            custom_card_type: type,
            image_1: image,
            icon_1: icon
        } = extras;
        return {
            ctaText: button || linkText,
            icon,
            image,
            type
        };
    }
};
</script>
