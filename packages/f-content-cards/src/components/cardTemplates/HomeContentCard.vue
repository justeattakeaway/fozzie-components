<template>
    <div
        :data-test-id="testId"
        :style="{ background: backgroundColor }"
        :class="[$style['c-homeContentCard']]">
        <div :class="[$style['c-homeContentCard-icon']]">
            <img
                :src="icon"
                alt="">
        </div>
        <div
            :class="[$style['c-homeContentCard-innerCard']]"
            :style="{ background: contentContainerBackground }">
            <img
                :src="image"
                alt="">
            <h3>{{ title }}</h3>
            <p>{{ subtitle }}</p>
            <p>
                <a
                    :href="url"
                    class="o-link--full o-link--bold u-color-link u-text-left">{{ ctaText }}</a>
            </p>
        </div>
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
            button,
            backgroundColor,
            contentContainerBackground,
            type,
            icon,
            title,
            url,
            subtitle
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
            subtitle
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
    .c-homeContentCard {
        display: flex;
        padding: spacing(x3);
    }

    .c-homeContentCard-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50%;

        img {
            width: 100px;
        }
    }

    .c-homeContentCard-innerCard {
        position: relative;
        width: 50%;
        border: 1px solid $color-border;
        border-radius: $post-order-card-radius;
        padding: spacing(x3) 220px spacing(x3) spacing(x3);

        img {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translate(0, -50%);
            width: 200px;
        }
    }
</style>
