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
            icon
        } = this.card;

        return {
            image,
            ctaText,
            button,
            type,
            icon
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
            @include font-size(large);

            margin-bottom: spacing(x2);

            @include media ('<mid') {
                margin: spacing(x2);
            }
        }
    }
</style>
