<template>
    <div
        :data-test-id="testId"
        :class="[$style['c-postOrderCard']]">
        <h2
            v-if="headline"
            :class="[$style['c-postOrderCard-title']]"
            data-test-id="contentCard-postOrderCard-title"
        >
            {{ headline }}
        </h2>
        <card-container
            :card="card"
            :class="[cardContainerStyles['c-postOrderCardContainer'] , { [cardContainerStyles['c-postOrderCard--condensed']]: !image && icon }]"
            :container-title="containerTitle"
            :is-carousel="isCarousel"
            :data-test-id="containerTestId()"
            :should-apply-image-as-background="false">
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
// The below allows distinct import of styles from cardContainer, in order to directly influence which intra-component
// styles are used on the wrapper element in the card-container
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
            image,
            ctaText,
            button,
            type,
            icon,
            headline
        } = this.card;

        return {
            image,
            ctaText,
            button,
            type,
            icon,
            headline
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
        border-radius: $post-order-card-radius;
        padding: spacing(x3);
        width: 100%;

        @include media ('<mid') {
            border: none;
            padding: 0;
        }

        .c-postOrderCard-title {
            @include font-size(heading-m);

            margin-bottom: spacing(x2);
            text-align: left;

            @include media ('<mid') {
                margin: spacing(x2);
            }
        }
    }
</style>
