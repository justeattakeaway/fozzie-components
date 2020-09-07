<template>
    <component
        :data-testid="testId"
        :class="[$style['c-contentCards-homePromotionCard2']]"
        :style="{ background: contentContainerBackground }">
        <img
            :src="image"
            :class="[$style['c-contentCards-homePromotionCard2-image']]"
            alt="">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
        <p v-if="url">
            <a
                :href="url"
                :data-test-id="ctaTestId"
                class="o-link--full o-link--bold u-color-link u-text-left">{{ ctaText }}</a>
        </p>
    </component>
</template>

<script>
export default {
    props: {
        card: {
            type: Object,
            default: () => ({})
        },
        testId: {
            type: String,
            default: 'contentCard-homePromotionCard-2'
        }
    },
    data () {
        const {
            image,
            ctaText,
            contentContainerBackground,
            title,
            url,
            description
        } = this.card;

        return {
            title,
            contentContainerBackground,
            image,
            ctaText,
            url,
            description
        };
    },
    computed: {
        ctaTestId () {
            return `${this.testId}--cta`;
        }
    }
};
</script>

<style lang="scss" module>
    .c-contentCards-homePromotionCard2 {
        position: relative;
        display: block;
        width: 100%;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        border-radius: $post-order-card-radius;
        padding: spacing(x3) 220px spacing(x3) spacing(x3);
    }

    .c-contentCards-homePromotionCard2-image {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(0, -50%);
        width: 200px;
    }
</style>

