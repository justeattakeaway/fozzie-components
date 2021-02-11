<template>
    <div
        :data-test-id="testId"
        :class="['c-contentCards-homePromotionCard2', $style['c-contentCards-homePromotionCard2'], {
            [$style['c-contentCards-homePromotionCard2--light']]: isLightText
        }]"
        :style="{ background: contentBackgroundColor }">
        <div
            :data-test-id="imageTestId"
            :class="['c-contentCards-homePromotionCard2-image', $style['c-contentCards-homePromotionCard2-image']]"
            :style="{ backgroundImage: `url('${image}')` }" />
        <h3
            :data-test-id="titleTestId"
            :class="['c-contentCards-homePromotionCard2-title', $style['c-contentCards-homePromotionCard2-title']]">
            {{ title }}
        </h3>
        <template v-for="(textItem, textIndex) in description">
            <p
                :key="textIndex"
                :data-test-id="textTestId"
                :class="['c-contentCards-homePromotionCard2-text', $style['c-contentCards-homePromotionCard2-text']]">
                {{ textItem }}
            </p>
        </template>
        <p v-if="url">
            <a
                :href="url"
                :data-test-id="ctaTestId"
                :class="[
                    'o-link--full',
                    'o-link--bold',
                    'u-color-link',
                    'u-text-left',
                    $style['c-contentCards-homePromotionCard2-link']
                ]">{{ ctaText }}</a>
        </p>
    </div>
</template>

<script>
import Color from 'color';

export default {
    props: {
        card: {
            type: Object,
            default: () => ({})
        },
        testId: {
            type: String,
            default: 'home-promotion-2'
        }
    },
    data () {
        const {
            image,
            ctaText,
            backgroundColor,
            contentBackgroundColor,
            title,
            url,
            description
        } = this.card;

        return {
            title,
            backgroundColor,
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
        },

        textTestId () {
            return this.testId ? `${this.testId}--text` : false;
        },

        titleTestId () {
            return this.testId ? `${this.testId}--title` : false;
        },

        imageTestId () {
            return this.testId ? `${this.testId}--backgroundImage` : false;
        },
        /**
         * If background colour is set *and* dark, then use a light text colour for the title and text for A11y
         * @return {boolean}
         */
        isLightText () {
            if (this.contentBackgroundColor) {
                try {
                    return new Color(this.contentBackgroundColor).isDark();
                } catch {
                    // Fall through and try with backgroundColor from surrounding HPC1
                }
            }
            try {
                return this.backgroundColor
                    ? (new Color(this.backgroundColor)).isDark()
                    : false;
            } catch {
                return false;
            }
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
        border-radius: 4px;
        padding: spacing(x2) calc(35% + #{spacing()}) spacing(x2) spacing(x2);
        max-width: 800px; //to replicate max-width of searchbox
        margin: auto;

        @include media('>narrow') {
            padding-right: 208px;
            width: 95%; //to replicate width of searchbox
        }

        .c-contentCards-homePromotionCard2-link {
            @include font-size('body-l', false);
            text-decoration: none;
            font-weight: $font-weight-bold;

            & {
                color: $color-link-default;
            }

            &:hover, &:focus {
                color: $color-link-hover;
            }

            &:active {
                color: $color-link-active;
            }
        }

        .c-contentCards-homePromotionCard2-text {
            color: $grey--dark;
        }

        &.c-contentCards-homePromotionCard2--light {
            .c-contentCards-homePromotionCard2-text {
                color: $white;
            }

            .c-contentCards-homePromotionCard2-title {
                color: $grey--lighter;
            }
        }
    }

    .c-contentCards-homePromotionCard2-title {
        @include font-size(heading-m);

        @include media('<=narrow') {
            @include font-size(heading-m, true, narrow);
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

