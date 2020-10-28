<template>
    <component
        :is="url && ctaEnabled ? 'a' : 'div'"
        :href="ctaEnabled && url"
        :target="target.attribute"
        :rel="target.rel"
        :class="[$style['c-contentCard'], { [$style['c-contentCard--isolateHeroImage']]: isolateHeroImage }]"
        :data-test-id="testId"
        @click="onClickContentCard"
    >
        <div
            :style="{ 'background-image': applyImageAsBackground ? `url(${image})` : '' }"
            :class="[{ [$style['c-contentCard-bgImg']]: !!image }]">
            <img
                v-if="!applyImageAsBackground"
                :class="$style['c-contentCard-img']"
                :src="image"
                :alt="title">
        </div>
        <div :class="$style['c-contentCard-info']">
            <img
                v-if="icon"
                :src="icon"
                :alt="title"
                :class="$style['c-contentCard-thumbnail']">
            <h3
                :class="[$style['c-contentCard-title'], {
                    [$style['c-contentCard-title-legacy']]: !boldTitle,
                    [$style['c-emboldenedText--title']]: emboldenText
                }]">
                {{ title }}
            </h3>
            <h4 :class="[$style['c-contentCard-subTitle'], { [$style['c-emboldenedText--subtitle']]: emboldenText }]">
                {{ subtitle }}
            </h4>
            <slot
                v-if="bannerBeforeDescription"
                name="banner" />
            <template v-for="(textItem, textIndex) in description">
                <p
                    :key="textIndex"
                    :data-test-id="testIdForItemWithIndex(textIndex)"
                    :class="[$style['c-contentCard-text'], { [$style['c-emboldenedText--text']]: emboldenText }]">
                    {{ textItem }}
                </p>
            </template>
            <slot
                v-if="!bannerBeforeDescription"
                name="banner" />
            <div :class="$style['c-contentCard-footer']">
                <slot />
            </div>
        </div>
    </component>
</template>

<script>
export default {
    props: {
        card: {
            type: Object,
            default: () => ({})
        },
        containerTitle: {
            type: String,
            default: ''
        },
        isCarousel: {
            type: Boolean,
            default: false
        },
        ctaEnabled: {
            type: Boolean,
            default: true
        },
        testId: {
            type: String,
            default: null
        },
        applyImageAsBackground: {
            type: Boolean,
            default: true
        },
        emboldenText: {
            type: Boolean,
            default: false
        },
        isolateHeroImage: {
            type: Boolean,
            default: false
        },
        bannerBeforeDescription: {
            type: Boolean,
            default: false
        },
        boldTitle: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        description () {
            return this.card.description;
        },

        icon () {
            return this.card.icon;
        },

        image () {
            return this.card.image;
        },

        subtitle () {
            return this.card.subtitle;
        },

        target () {
            return this.card.target || {};
        },

        title () {
            return this.card.title;
        },

        url () {
            return this.card.url;
        }
    },

    inject: [
        'emitCardView',
        'emitCardClick'
    ],

    mounted () {
        this.onViewContentCard();
    },

    methods: {
        onViewContentCard () {
            this.emitCardView(this.card);
        },

        onClickContentCard () {
            this.emitCardClick(this.card);
        },

        testIdForItemWithIndex (index) {
            return this.testId && `ContentCard-TextItem-${index}`;
        }
    }
};
</script>

<style lang="scss" module>
    .c-contentCard {
        width: 100%;
        text-decoration: initial;
        text-align: center;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        margin-right: spacing(x2);
        margin-bottom: spacing(x2);

        @include media('>=narrowMid') {
            max-width: 370px;
        }

        &,
        &:hover,
        &:focus {
            color: currentColor;
        }

        .c-contentCards--wrap & {
            display: flex;
            flex-direction: column;
            flex: 0 0 40%;
            margin: 0 spacing() spacing(x3) 0;
            width: 100%;

            @include media('>=narrowMid') {
                margin: 0 spacing() spacing(x3);
            }
        }

        /**
         * 1. Magic numbers to correctly size the hero image
         */
        &.c-contentCard--isolateHeroImage {
            position: relative;

            .c-contentCard-info {
                padding-top: spacing(x10) + spacing(x6);
                padding-bottom: spacing(x2);
                border-radius: $border-radius;
            }

            .c-contentCard-bgImg {
                position: absolute;
                left: 0;
                right: 0;
                top: spacing(x2);
                z-index: zIndex(mid);
                width: 114px; // 1
                height: 114px; // 1
                margin: 0 auto;
                min-height: inherit;
                background: transparent no-repeat center;
                background-size: contain;
                border-radius: 0;
            }
        }
    }

    .c-contentCard-bgImg {
        width: 100%;
        min-height: 170px;
        background-repeat: repeat;
        background-size: cover;
        background-color: $grey--lighter;
        background-position: center;
        border-radius: $border-radius $border-radius 0 0;
    }

    .c-contentCard-title {
        margin-top: spacing();
        text-align: center;

        // This is a super weird way to truncate text to 2 lines
        // It uses old flexbox notation and webkit properties, but is supported in
        // Chrome and Edge (as both are Chromium), Safari and Firefox. Go figure.
        // Check this article for more info: https://css-tricks.com/line-clampin/#article-header-id-0
        overflow: hidden;
        font-weight: bold;
        display: -webkit-box; /* stylelint-disable-line value-no-vendor-prefix */
        -webkit-line-clamp: 2; // stop at 2 lines
        -webkit-box-orient: vertical;
    }

    .c-contentCard-title-legacy {
        font-weight: normal;
    }

    .c-contentCard-subTitle {
        @include font-size(body-l);
        margin-top: spacing();
    }

    .c-contentCard-text {
        margin-top: spacing();
        text-align: center;
    }

    .c-contentCard-info {
        position: relative;
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        align-items: center;
        min-height: 164px; // min-height set to the height of an card with a one-line title
        background-color: $white;
        padding: spacing(x3) spacing(x2);
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        border-radius: 0 0 $border-radius $border-radius;
    }

    .c-contentCard-footer {
        width: 100%;
        margin-top: auto;
        text-align: center;
        padding-top: spacing(x2);
    }

    .c-contentCard-thumbnail {
        border: 1px solid $grey--lighter;
        margin-top: - (32px + spacing(x2)); // This offsets the thumbnail above the top of the info card
        width: 48px;
        min-height: 48px;
    }

    .c-postOrderCardContainer {
        .c-contentCard-thumbnail {
            position: absolute;
            top: spacing(x2);
            left: spacing(x2);
            margin: 0;
            border: none;
        }

        .c-contentCard-info {
            background: none;
            box-shadow: none;
            position: static;
            display: block;
            text-align: left;
            min-height: 0;
            padding: spacing(x3) 0 0 0;

            @include media ('<mid') {
                border: 1px solid $color-border;
                padding: spacing(x3);
                border-radius: 0 0 $post-order-card-radius $post-order-card-radius;
            }
        }

        .c-contentCard-title {
            text-align: left;
            margin: 0 0 spacing(x2);
        }

        .c-contentCard-subTitle {
            @include font-size(body-s);

            text-align: left;
            margin: 0;
        }

        &.c-contentCard {
            position: relative;
            margin: 0;
            padding: 0;
            max-width: 100%;
        }

        .c-contentCard-bgImg {
            overflow: hidden;
            border-radius: $post-order-card-radius;

            @include media ('<mid') {
                border-radius: $post-order-card-radius $post-order-card-radius 0 0;
            }
        }

        .c-contentCard-img {
            display: block;
            width: 100%;
        }
    }

    .c-postOrderCard--condensed {
        .c-contentCard-bgImg {
            display: none;
        }

        .c-contentCard-thumbnail {
            left: 0;
            top: 0;

            @include media('<mid') {
                top: spacing(x2);
                left: spacing(x2);
            }
        }

        .c-contentCard-info {
            padding: 0 0 0 spacing(x9);

            @include media('<mid') {
                position: relative;
                padding: spacing(x2) spacing(x2) spacing(x2) spacing(x9);
                border-radius: $post-order-card-radius;
            }
        }
    }

    .c-emboldenedText--title {
        font-weight: bold;
    }

    .c-emboldenedText--subtitle {
        @include font-size(body-s);
        margin-top: spacing(x2);
    }

    .c-emboldenedText--text {
        @include font-size(body-s);
        font-weight: bold;
        margin-top: 0;
    }
</style>
