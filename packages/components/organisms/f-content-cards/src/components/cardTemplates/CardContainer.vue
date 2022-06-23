<template>
    <card-case
        :card="card"
        :class="[$style['c-contentCard'], { [$style['c-contentCard--isolateHeroImage']]: shouldIsolateHeroImage }]"
        :data-test-id="testId">
        <div
            :style="{ 'background-image': shouldApplyImageAsBackground ? `url(${image})` : '' }"
            :class="[{ [$style['c-contentCard-bgImg']]: !!image }]">
            <img
                v-if="!shouldApplyImageAsBackground"
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
            <div :class="$style['c-content-card-body']">
                <h3
                    :class="[$style['c-contentCard-title']]">
                    {{ title }}
                </h3>
                <h4 :class="[$style['c-contentCard-subTitle'], { [$style['c-emboldenedText--subtitle']]: shouldEmboldenText }]">
                    {{ subtitle }}
                </h4>
                <slot
                    v-if="isBannerBeforeDescription"
                    name="banner" />
                <template v-for="(textItem, textIndex) in description">
                    <p
                        :key="textIndex"
                        :data-test-id="testIdForItemWithIndex(textIndex)"
                        :class="[$style['c-contentCard-text'], { [$style['c-emboldenedText--text']]: shouldEmboldenText }]">
                        {{ textItem }}
                    </p>
                </template>
                <slot
                    v-if="!isBannerBeforeDescription"
                    name="banner" />
            </div>
            <div :class="$style['c-contentCard-footer']">
                <slot />
            </div>
        </div>
    </card-case>
</template>

<script>
import CardCase from './CardCase.vue';

export default {
    components: {
        CardCase
    },

    props: {
        card: {
            type: Object,
            default: () => ({})
        },
        containerTitle: {
            type: String,
            default: ''
        },
        hasCta: {
            type: Boolean,
            default: true
        },
        isBannerBeforeDescription: {
            type: Boolean,
            default: false
        },
        isCarousel: {
            type: Boolean,
            default: false
        },
        shouldApplyImageAsBackground: {
            type: Boolean,
            default: true
        },
        shouldEmboldenText: {
            type: Boolean,
            default: false
        },
        shouldEmboldenTitle: {
            type: Boolean,
            default: false
        },
        shouldIsolateHeroImage: {
            type: Boolean,
            default: false
        },
        testId: {
            type: String,
            default: null
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

    methods: {
        testIdForItemWithIndex (index) {
            return this.testId && `ContentCard-TextItem-${index}`;
        }
    }
};
</script>

<style lang="scss" module>
    @use '@justeat/fozzie/src/scss/fozzie' as f;

    .c-content-card-body {
        flex-grow: 1;
    }

    .c-contentCard {
        @include common.card-container;

        margin-right: f.spacing(d);
        margin-bottom: f.spacing(d);

        @include f.media('>=narrowMid') {
            max-width: 370px;
        }

        @include f.media('<=narrowMid') {
            margin-right: 0;
        }

        .c-contentCards--wrap & {
            @include common.card-container-wrapped;
        }

        /**
         * 1. Magic numbers to correctly size the hero image
         */
        &.c-contentCard--isolateHeroImage {
            position: relative;

            .c-contentCard-info {
                padding-top: f.spacing(j) + f.spacing(h);
                padding-bottom: f.spacing(d);
                border-radius: f.$radius-rounded-c;
            }

            .c-contentCard-bgImg {
                position: absolute;
                left: 0;
                right: 0;
                top: f.spacing(d);
                z-index: f.zIndex(mid);
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
        @include common.card-bg-image;

        min-height: 170px;
    }

    .c-contentCard-title {
        margin-top: f.spacing();
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

    .c-contentCard-subTitle {
        @include f.font-size(body-l);
        font-weight: f.$font-weight-regular;
        margin-top: f.spacing();
    }

    .c-contentCard-text {
        margin-top: f.spacing(a);
        text-align: center;
    }

    .c-contentCard-info {
        position: relative;
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        align-items: center;
        min-height: 164px; // min-height set to the height of an card with a one-line title
        background-color: f.$color-container-default;
        padding: f.spacing(d);
        box-shadow: f.$elevation-01;
        border-radius: 0 0 f.$radius-rounded-c f.$radius-rounded-c;
    }

    .c-contentCard-footer {
        width: 100%;
        flex-shrink: 0;
        margin-top: f.spacing();
        text-align: center;
    }

    .c-contentCard-thumbnail {
        border: 1px solid f.$color-border-subtle;
        margin-top: - (32px + f.spacing(d)); // This offsets the thumbnail above the top of the info card
        width: 48px;
        min-height: 48px;
    }

    .c-postOrderCardContainer {
        .c-contentCard-thumbnail {
            position: absolute;
            top: f.spacing(d);
            left: f.spacing(d);
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
            padding: f.spacing(e) 0 0 0;

            @include f.media ('<mid') {
                border: 1px solid f.$color-border-strong;
                padding: f.spacing(e);
                border-radius: 0 0 f.$radius-rounded-c f.$radius-rounded-c;
            }
        }

        .c-contentCard-title {
            text-align: left;
            margin: 0 0 f.spacing(d);
        }

        .c-contentCard-subTitle {
            @include f.font-size(body-s);

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
            border-radius: f.$radius-rounded-c;

            @include f.media ('<mid') {
                border-radius: f.$radius-rounded-c f.$radius-rounded-c 0 0;
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

            @include f.media('<mid') {
                top: f.spacing(d);
                left: f.spacing(d);
            }
        }

        .c-contentCard-info {
            padding: 0 0 0 f.spacing(i);

            @include f.media('<mid') {
                position: relative;
                padding: f.spacing(d) f.spacing(d) f.spacing(d) f.spacing(i);
                border-radius: f.$radius-rounded-c;
            }
        }
    }

    .c-emboldenedText--title {
        font-weight: bold;
    }

    .c-emboldenedText--subtitle {
        @include f.font-size(body-l);
        margin-top: f.spacing(d);
    }

    .c-emboldenedText--text {
        @include f.font-size(body-s);
        font-weight: bold;
        margin-top: 0;
    }
</style>
