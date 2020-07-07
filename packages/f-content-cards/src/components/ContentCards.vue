<template>
    <div
        class="c-contentCards c-contentCards--wrap"
        :data-test-id="testId">
        <template v-for="(contentCard, cardIndex) in cards">
            <component
                :is="handleCustomCardType(contentCard.extras.custom_card_type)"
                :key="cardIndex"
                :card="contentCard"
                :title="title"
                :data-test-id="testIdForItemWithIndex(cardIndex)"
            />
        </template>
    </div>
</template>

<script>
import initialiseBraze, { logCardClick, logCardImpressions } from '@justeat/f-metadata';
import ContentCards from '../services/contentCard.service';
import cardTemplates from './cardTemplates';

/**
 * Generates card-specific analytics data suitable for sending back to GTM via f-trak
 *
 * @param contentAction
 * @param card
 * @returns {{contentCTA, customVoucherCode, contentId: *, contentAction: *, contentPosition, contentTitle: *, contentType: string}}
 */
const createBrazeCardEvent = (contentAction, card) => {
    const {
        id: contentId,
        title: contentTitle,
        extras = {}
    } = card;
    const {
        order: contentPosition,
        button_1: contentCTA,
        voucher_code: customVoucherCode
    } = extras;

    return {
        contentId,
        contentType: 'contentCard',
        customVoucherCode,
        contentTitle,
        contentAction,
        contentPosition,
        contentCTA
    };
};

export default {
    name: 'ContentCards',
    components: {
        ...cardTemplates
    },
    props: {
        apiKey: {
            type: String,
            default: ''
        },
        userId: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        enabledCardTypes: {
            type: Array,
            default: () => ([])
        },
        pushToDataLayer: {
            type: Function,
            default: () => (() => {})
        },
        testId: {
            type: String,
            default: null
        }
    },

    data () {
        return {
            cards: [],
            titleCard: {}
        };
    },

    watch: {
        cards (current, previous) {
            if (current.length && (current.length !== previous.length)) {
                logCardImpressions(this.cards);
            }
        }
    },

    mounted () {
        this.setupBraze(this.apiKey, this.userId);
    },

    provide () {
        const component = this;

        return {
            emitCardView (card) {
                component.trackCardVisibility(card);
            },
            emitCardClick (card) {
                component.trackCardClick(card);
                logCardClick(card);
            }
        };
    },

    methods: {
        setupBraze (apiKey, userId, enableLogging = false) {
            initialiseBraze({
                apiKey,
                userId,
                enableLogging,
                callbacks: {
                    handleContentCards: this.contentCards
                }
            });
        },
        contentCards (appboy) {
            if (!appboy) return;
            const { cards, titleCard } = new ContentCards(appboy, {
                enabledCardTypes: this.enabledCardTypes
            })
                .removeDuplicateContentCards()
                .filterCards()
                .getTitleCard()
                .arrangeCardsByTitles()
                .output();
            this.cards = cards;
            this.titleCard = titleCard;
        },

        handleCustomCardType (type) {
            switch (type) {
                case 'Promotion_Card_1':
                case 'Promotion_Card_2':
                    return 'PromotionCard';
                case 'Post_Order_Card_1':
                    return 'PostOrderCard';
                default:
                    break;
            }
            return false;
        },

        pushBrazeEvent (payload) {
            this.pushToDataLayer({
                event: 'BrazeContent',
                custom: {
                    braze: payload
                }
            });
        },

        testIdForItemWithIndex (index) {
            return this.testId && `ContentCard-${index}`;
        },

        trackCardClick (card) {
            const event = createBrazeCardEvent('click', card);
            this.pushBrazeEvent(event);
        },

        trackCardVisibility (card) {
            const event = createBrazeCardEvent('view', card);
            this.pushBrazeEvent(event);
        }
    }
};
</script>

<style lang="scss">
    // c-contentCard
    // Styling for a card that holds data on a restaurant
    // Currently consists of a main image, optional restaurant logo thumbnail
    // And then info text below (header, tags, description)

    $contentCardRadius: 8px;

    .c-contentCards {
        margin-top: spacing(x5);
        margin-bottom: spacing(x5);

        @include media('>=narrowMid') {
            display: flex;
            flex-direction: row;
        }
    }
    .c-contentCards--centred {
        justify-content: center;
    }
    .c-contentCards--wrap {
        flex-wrap: wrap;

        &.has-offers-carousel {
            margin-top: 0;
        }
    }
    .c-contentCards-sectionTitle {
        margin: spacing(x4) 0 0;
    }

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

        .has-offers-carousel & {
            min-width: inherit;
            max-width: inherit;

            &:first-child {
                margin-left: 0;
            }
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

        .c-contentCard-banner {
            position: relative;
            display: inline-block;
            background: $brand--orange;
            transform: skew(-20deg);
            border-radius: $border-radius;
            color: white;
            padding: 0 spacing();
        }

        .c-contentCard-banner-content {
            display: inline-block;
            transform: skew(20deg);
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

    .c-contentCard-link {
        font-weight: $font-weight-bold;
        text-decoration: none;
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

    .c-contentCard-list {
        display: flex;
        margin-top: 4px;
        margin-bottom: 4px;

        li {
            position: relative;
            padding-right: 10px;
            margin-right: 5px;

            &:after {
                content: '\2022';
                color: $grey--light;
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
            }

            &:last-of-type {
                padding-right: 0;
                margin-right: 0;

                &:after {
                    display: none;
                }
            }
        }

        & + & {
            margin-top: 0;
        }
    }

    .c-contentCard-offer {
        background-color: $yellow--offWhite;
        width: calc(100% + #{ spacing(x4) });
        text-align: center;
        padding: 5px;
    }

    .c-contentCard-promoted {
        position: absolute;
        bottom: 100%;
        right: 0;
        background-color: rgba(51, 51, 51, 0.7);
        color: $white;
        padding: 2px 4px;
        font-weight: $font-weight-bold;
    }

    .c-contentCard-data {
        width: 100%;
        margin-top: auto;
    }

    .c-contentCard-dataGroup {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: spacing();
    }

    // insets the info card on top of the restaurant image
    .c-contentCard-info--inset {
        margin-left: spacing();
        margin-right: spacing();
        margin-top: -62px;
    }

    // infoText is text associated to the restaurant (like delivery time/distance)
    .c-contentCard-infoText {
        display: flex;
        align-content: center;
        margin-top: 0;
    }
    .c-contentCard-infoText-icon {
        width: 18px;
        height: 18px;
        margin-right: 6px;

        path {
            fill: $grey--mid;
        }
    }

    // Highlight color for text (used for labels like 'New')
    .c-contentCard-infoText--highlight {
        color: $green;
    }
    // Add small margin-top to infoText
    .c-contentCard-infoText--spaced {
        margin-top: spacing(x0.5);
    }

    .c-contentCard-voucher {
        display: flex;
        width: 100%;
        font-family: $font-family-base;
        border: solid $grey--light;
        border-width: 1px 0 0;
        padding-top: spacing(x1.5);
        margin-top: spacing(x3);
        cursor: pointer;
        background: transparent;
    }

    .c-contentCard-voucher-code,
    .c-contentCard-voucher-copy {
        @include font-size(16, false);
        width: 50%;
    }

    .c-contentCard-voucher-code {
        font-weight: $font-weight-base;
        color: $grey--mid;
        text-align: left;
    }

    .c-contentCard-voucher-copy {
        font-weight: $font-weight-bold;
        color: $color-link-default;
        text-align: right;
    }

    .c-postOrderCard {
        border: 1px solid $color-border;
        border-radius: $contentCardRadius;
        padding: spacing(x3);
        width: 100%;

        @include media ('<mid') {
            border: none;
            padding: 0;
        }

        .c-postOrderCard-title {
            @include font-size(large);

            margin-bottom: spacing(x2);

            @include media ('<mid') {
                margin: spacing(x2);
            }
        }

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

        .c-contentCard {
            position: relative;
            margin: 0;
            padding: 0;
            max-width: 100%;
        }

        .c-contentCard-bgImg {
            min-height: 250px;
            border-radius: $contentCardRadius;

            @include media ('<mid') {
                border-radius: $contentCardRadius $contentCardRadius 0 0;
            }
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
