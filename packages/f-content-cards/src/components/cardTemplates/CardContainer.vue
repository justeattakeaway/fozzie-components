<template>
    <component
        :is="ctaUrl && ctaEnabled ? 'a' : 'div'"
        :href="ctaEnabled && ctaUrl"
        :class="[$style['c-contentCard'], { [$style['c-contentCard--isolateHeroImage']]: isAnniversaryCard }]"
        :data-test-id="testId"
        @click="onClickContentCard"
    >
        <div
            :style="{ 'background-image': isBackgroundImage ? `url(${image})` : '' }"
            :class="[{ [$style['c-contentCard-bgImg']]: !!image }]">
            <img
                v-if="!isBackgroundImage"
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
            <h3 :class="$style['c-contentCard-title']">
                {{ title }}
            </h3>
            <h4 :class="$style['c-contentCard-subTitle']">
                {{ subtitle }}
            </h4>
            <template v-for="(textItem, textIndex) in descriptionText">
                <p
                    :key="textIndex"
                    :data-test-id="testIdForItemWithIndex(textIndex)"
                    :class="$style['c-contentCard-text']">
                    {{ textItem }}
                </p>
            </template>
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
        }
    },

    data () {
        const {
            id: cardId,
            url: ctaUrl,
            extras = {},
            imageUrl,
            title,
            description: subtitle
        } = this.card;
        const {
            icon_1: icon,
            image_1: image,
            order,
            custom_card_type: type,
            voucher_code: voucherCode
        } = extras;

        return {
            cardId,
            ctaUrl,
            image: image || imageUrl,
            icon,
            title,
            subtitle,
            order,
            voucherCode,
            type,
            extras
        };
    },

    computed: {
        descriptionText () {
            return Object.keys(this.extras)
                        .filter(key => key.indexOf('line_') !== -1)
                        .map(key => this.extras[key]);
        },

        extractedCardId () {
            const decoded = atob(this.cardId);
            const start = decoded.indexOf('=');
            const end = decoded.indexOf('&');
            return decoded.slice(start + 1, end);
        },

        isAnniversaryCard () {
            return this.type === 'Anniversary_Card_1';
        },

        isBackgroundImage () {
            return this.type !== 'Post_Order_Card_1';
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
         * 1. Magic number to align isolated image with top of content card
         */
        &.c-contentCard--isolateHeroImage {
            position: relative;
            margin: 84px 0 spacing(x3); // 1

            .c-contentCard-info {
                border-radius: $border-radius;
            }

            .c-contentCard-bgImg {
                position: absolute;
                left: 0;
                right: 0;
                top: -83px;
                z-index: zIndex(mid);
                width: 109px;
                height: 96px;
                margin: 0 auto;
                min-height: inherit;
                background: transparent no-repeat;
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

        .c-contentCard-info--inset & {
            height: 188px;
        }
    }

    .c-contentCard-title {
        margin-top: spacing();
        text-align: center;

        // This is a super weird way to truncate text to 2 lines
        // It uses old flexbox notation and webkit properties, but is supported in
        // Chrome and Edge (as both are Chromium), Safari and Firefox. Go figure.
        // Check this article for more info: https://css-tricks.com/line-clampin/#article-header-id-0
        overflow: hidden;
        display: -webkit-box; /* stylelint-disable-line value-no-vendor-prefix */
        -webkit-line-clamp: 2; // stop at 2 lines
        -webkit-box-orient: vertical;
    }

    .c-contentCard-subTitle {
        @include font-size(base--scaleUp);
        margin-top: spacing();
    }

    .c-contentCard-text {
        margin-top: spacing();
        text-align: center;
    }

    .c-contentCard-info {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 164px; // min-height set to the height of an card with a one-line title
        background-color: $white;
        padding: spacing(x3) spacing(x2);
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        height: 100%;
        border-radius: 0 0 $border-radius $border-radius;

        .has-offer & {
            padding-bottom: 0;
        }
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
                border-radius: 0 0 $contentCardRadius $contentCardRadius;
            }
        }

        .c-contentCard-title {
            text-align: left;
            margin: 0 0 spacing(x2);
        }

        .c-contentCard-subTitle {
            @include font-size(base);

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
            border-radius: $contentCardRadius;

            @include media ('<mid') {
                border-radius: $contentCardRadius $contentCardRadius 0 0;
            }
        }

        .c-contentCard-img {
            display: block;
            max-width: 100%;
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
                border-radius: $contentCardRadius;
            }
        }
    }
</style>
