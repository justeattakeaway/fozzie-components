<template>
    <div
        :data-test-id="testId"
        :class="[$style['c-postOrderCard']]">
        <h2
            v-if="title"
            :class="[$style['c-postOrderCard-title']]"
            data-test-id="contentCard-postOrderCard-title"
        >
            {{ title }}
        </h2>
        <card-container
            :card="card"
            :class="[cardContainerStyles['c-postOrderCardContainer'] , { [cardContainerStyles['c-postOrderCard--condensed']]: !image && icon }]"
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

<style lang="scss" module>
    .c-postOrderCard {
        border: 1px solid $color-border;
        border-radius: $contentCardRadius;
        padding: spacing(x3);
        width: 100%;

        @include media ('<mid') {
            border: none;
            padding: 0;
        }

        .c-postOrderCard-title {
            @include font-size(large);

            margin-bottom: spacing(x2);

            @include media ('<mid') {
                margin: spacing(x2);
            }
        }
    }
</style>
