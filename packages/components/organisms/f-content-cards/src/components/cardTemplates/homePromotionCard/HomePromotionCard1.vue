<template>
    <div
        :data-test-id="testId"
        :style="{ background: backgroundColor }"
        :class="['c-contentCards-homePromotionCard1', $style['c-contentCards-homePromotionCard1']]">
        <div
            :data-test-id="containerTestId"
            :class="['l-container', 'c-contentCards-homePromotionCard1-container', $style['c-contentCards-homePromotionCard1-container']]"
            :style="{ maxWidth: `${containerMaxWidth}px` }">
            <div
                :data-test-id="headerTestId"
                :class="['c-contentCards-homePromotionCard1-iconPane', $style['c-contentCards-homePromotionCard1-iconPane']]">
                <img
                    :data-test-id="imageTestId"
                    :class="[$style['c-contentCards-homePromotionCard1-icon']]"
                    :src="icon"
                    alt="">
                <h3
                    :data-test-id="subtitleTestId"
                    :class="[$style['c-contentCards-homePromotionCard1-subtitle'], {
                        [$style['c-contentCards-homePromotionCard1-subtitle--light']]: isLightSubtitle
                    }]"
                >
                    {{ subtitle }}
                </h3>
            </div>
            <div :class="['c-contentCards-homePromotionCard1-innerCard', $style['c-contentCards-homePromotionCard1-innerCard']]">
                <home-promotion-card2 :card="card" />
            </div>
        </div>
    </div>
</template>

<script>
import Color from 'color';
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
            default: 'home-promotion-1'
        }
    },
    data () {
        const {
            image,
            ctaText,
            button,
            backgroundColor,
            contentBackgroundColor,
            type,
            icon,
            title,
            url,
            description,
            subtitle
        } = this.card;

        return {
            title,
            backgroundColor,
            contentBackgroundColor,
            image,
            ctaText,
            button,
            type,
            icon,
            url,
            description,
            subtitle
        };
    },
    computed: {
        ctaTestId () {
            return this.testId ? `${this.testId}--cta` : false;
        },

        containerTestId () {
            return this.testId ? `${this.testId}--container` : false;
        },

        headerTestId () {
            return this.testId ? `${this.testId}--header` : false;
        },

        imageTestId () {
            return this.testId ? `${this.testId}--image` : false;
        },

        subtitleTestId () {
            return this.testId ? `${this.testId}--subtitle` : false;
        },
        /**
         * If background colour is set *and* dark, then use a light text colour for the subtitle for A11y
         * @return {boolean}
         */
        isLightSubtitle () {
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
    .c-contentCards-homePromotionCard1 {
        padding: spacing(x3) 0 spacing(x2);
        width: 100%;

        @include media('>mid') {
            padding: spacing(x3) 0;
        }
    }

    .c-contentCards-homePromotionCard1-container {
        display: flex;
        flex-wrap: wrap;
        margin: 0 auto;
    }

    .c-contentCards-homePromotionCard1-iconPane {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin-bottom: spacing(x2);

        @include media('>mid') {
            width: 50%;
            margin-bottom: 0;
        }
    }

    .c-contentCards-homePromotionCard1-icon {
        max-height: 88px;
        max-width: 100%;
    }

    .c-contentCards-homePromotionCard1-subtitle {
        display: none;

        @include media('>mid') {
            display: unset;
            @include font-size(heading-m);
        }
    }

        .c-contentCards-homePromotionCard1-subtitle--light {
            color: $white;
        }

    .c-contentCards-homePromotionCard1-innerCard {
        width: 100%;
        padding: 0;

        @include media('>mid') {
            width: 50%;

            :global(.c-contentCards-homePromotionCard2) {
                padding-left: spacing(x5);
            }

            :global(.c-contentCards-homePromotionCard2-title) {
                @include font-size(heading-m);
                margin-bottom: spacing();
            }

            :global(.c-contentCards-homePromotionCard2-text) {
                @include font-size(subheading-s);
                margin-top: spacing();
            }
        }
    }
</style>
