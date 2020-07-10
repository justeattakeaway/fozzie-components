<template>
    <div
        :data-test-id="testId"
        :class="['c-postOrderCard' , { 'c-postOrderCard--condensed': !image && icon }]">
        <h2
            v-if="title"
            class="c-postOrderCard-title"
            data-test-id="contentCard-postOrderCard-title"
        >
            {{ title }}
        </h2>
        <card-container
            :card="card"
            :container-title="containerTitle"
            :is-carousel="isCarousel"
            :data-test-id="containerTestId()">
            <span
                class="o-link--full o-link--bold u-color-link u-text-left"
                :data-test-id="cardContentTestId()">
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
        },
        testId: {
            type: String,
            default: null
        }
    },
    data () {
        const {
            extras = {},
            imageUrl,
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
            image: image || imageUrl,
            type
        };
    },

    methods: {
        cardContentTestId () {
            return this.testId && 'contentCard-postOrderCard-1';
        },
        containerTestId () {
            return this.testId && 'contentCard-link';
        }
    }
};
</script>
