<template>
    <div
        :data-test-id="testId"
        :class="['c-contentCards-homePromotionCard2', $style['c-contentCards-homePromotionCard2']]"
        :style="{ background: contentBackgroundColor }">
        <div
            :class="['c-contentCards-homePromotionCard2-image', $style['c-contentCards-homePromotionCard2-image']]"
            :style="{ backgroundImage: `url('${image}')` }" />
        <h3>{{ title }}</h3>
        <template v-for="(textItem, textIndex) in description">
            <p
                :key="textIndex">
                {{ textItem }}
            </p>
        </template>
        <p v-if="url">
            <a
                :href="url"
                :data-test-id="ctaTestId"
                class="o-link--full o-link--bold u-color-link u-text-left">{{ ctaText }}</a>
        </p>
    </div>
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
            default: null
        }
    },
    data () {
        const {
            image,
            ctaText,
            contentBackgroundColor,
            title,
            url,
            description
        } = this.card;

        return {
            title,
            contentBackgroundColor,
            image,
            ctaText,
            url,
            description
        };
    },
    computed: {
        ctaTestId () {
            return this.testId ? `${this.testId}--cta` : false;
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
        padding: spacing(x3) calc(35% + 8px) spacing(x3) spacing(x3);

        @include media('>narrow') {
            padding-right: 208px;
        }
    }

    .c-contentCards-homePromotionCard2-image {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(0, -50%);
        width: 35%;
        height: 100%;
        background: right center no-repeat;
        background-size: contain;

        @include media('>narrow') {
            width: 200px;
        }
    }
</style>

