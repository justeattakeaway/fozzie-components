<template>
    <div
        :data-test-id="testId"
        :style="{ background: backgroundColor }"
        :class="[$style['c-contentCards-homePromotionCard1']]">
        <div
            :data-test-id="containerTestId"
            :class="['l-container', $style['c-contentCards-homePromotionCard1-container']]"
            :style="{ maxWidth: `${maxWidth}px` }">
            <div :class="[$style['c-contentCards-homePromotionCard1-icon']]">
                <img
                    :src="icon"
                    alt="">
            </div>
            <div :class="[$style['c-contentCards-homePromotionCard1-innerCard']]">
                <home-promotion-card2 :card="card" />
            </div>
        </div>
    </div>
</template>

<script>
import HomePromotionCard2 from './HomePromotionCard2.vue';

export default {
    components: {
        HomePromotionCard2
    },
    props: {
        card: {
            type: Object,
            default: () => ({})
        },
        containerMaxWidth: {
            type: Number,
            default: 1272
        },
        testId: {
            type: String,
            default: 'contentCard-homePromotionCard-1'
        }
    },
    data () {
        const {
            image,
            ctaText,
            button,
            backgroundColor,
            contentContainerBackground,
            type,
            icon,
            title,
            url,
            description
        } = this.card;

        return {
            title,
            backgroundColor,
            contentContainerBackground,
            image,
            ctaText,
            button,
            type,
            icon,
            url,
            description
        };
    },
    computed: {
        ctaTestId () {
            return `${this.testId}--cta`;
        },

        containerTestId () {
            return `${this.testId}--container`;
        },

        maxWidth () {
            return typeof this.containerMaxWidth === 'string' ? this.containerMaxWidth : `${this.containerMaxWidth}px`;
        }
    }
};
</script>

<style lang="scss" module>
    .c-contentCards-homePromotionCard1 {
        padding: spacing(x3) 0 spacing(x2);

        @include media('>mid') {
            padding: spacing(x3) 0;
        }
    }

    .c-contentCards-homePromotionCard1-container {
        display: flex;
        flex-wrap: wrap;
    }

    .c-contentCards-homePromotionCard1-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin-bottom: spacing(x3);

        img {
            max-height: 65px;
            max-width: 100%;
        }

        @include media('>mid') {
            width: 50%;
            margin-bottom: 0;
        }
    }

    .c-contentCards-homePromotionCard1-innerCard {
        width: 100%;

        @include media('>mid') {
            width: 50%;
        }
    }
</style>
