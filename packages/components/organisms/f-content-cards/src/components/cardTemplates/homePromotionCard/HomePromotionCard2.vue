<template>
    <component
        :is="showLink ? 'a' : 'div'"
        :href="showLink ? url : null"
        :data-test-id="testId"
        :class="['c-contentCards-homePromotionCard2', $style['c-contentCards-homePromotionCard2'], {
            [$style['c-contentCards-homePromotionCard2--light']]: isLightText
        }]"
        :style="{ background: contentBackgroundColor }"
        @click="onClickContentCard"
    >
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
            <span
                :data-test-id="ctaTestId"
                :class="[
                    'o-link--full',
                    'o-link--bold',
                    'u-color-link',
                    'u-text-left',
                    $style['c-contentCards-homePromotionCard2-link']
                ]">{{ ctaText }}</span>
        </p>
    </component>
</template>

<script>
import Color from 'color';

export default {

    inject: [
        'emitCardView',
        'emitCardClick'
    ],
    props: {
        card: {
            type: Object,
            default: () => ({})
        },

        noLink: {
            type: Boolean,
            default: false
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
        },

        /**
         * Encapsulated behaviour to ensure that the link is only shown when not contained within an HPC1 card
         * @return {boolean}
         */
        showLink () {
            return this.url && !this.noLink;
        }
    },

    mounted () {
        this.onViewContentCard();
    },

    methods: {
        onViewContentCard () {
            this.emitCardView(this.card);
        },

        onClickContentCard () {
            if (!this.noLink) {
                this.emitCardClick(this.card);
            }
        }
    }
};
</script>

<style lang="scss" module>
    @use '@justeat/fozzie/src/scss/fozzie' as f;

    .c-contentCards-homePromotionCard2 {
        text-decoration: initial;
        position: relative;
        display: block;
        width: 100%;
        box-shadow: f.$elevation-01;
        border-radius: f.$radius-rounded-c;
        padding: f.spacing(d) calc(35% + #{f.spacing()}) f.spacing(d) f.spacing(d);
        max-width: 800px; //to replicate max-width of searchbox
        margin: auto;

        @include f.media('>narrow') {
            padding-right: 208px;
            width: 95%; //to replicate width of searchbox
        }

        .c-contentCards-homePromotionCard2-link {
            @include f.font-size('body-l', false);
            text-decoration: none;
            font-weight: f.$font-weight-bold;

            & {
                color: f.$color-content-link;
            }

            &:hover, &:focus {
                color: darken(f.$color-content-link, f.$color-hover-01);
            }

            &:active {
                color: darken(f.$color-content-link, f.$color-active-01);
            }
        }

        .c-contentCards-homePromotionCard2-text {
            color: f.$color-content-subdued;
        }

        &.c-contentCards-homePromotionCard2--light {
            .c-contentCards-homePromotionCard2-text {
                color: f.$color-content-light;
            }

            .c-contentCards-homePromotionCard2-title {
                color: f.$color-interactive-secondary;
            }
        }
    }

    .c-contentCards-homePromotionCard2-title {
        @include f.font-size(heading-m);

        @include f.media('<=narrow') {
            @include f.font-size(heading-m, true, narrow);
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

        @include f.media('>narrow') {
            width: 200px;
        }
    }
</style>

