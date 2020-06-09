<template>
    <div
        class="c-restaurantCards c-restaurantCards--wrap"
        data-test-id="OffersInbox-Cards">
        <template v-for="(contentCard, cardIndex) in cards">
            <component
                :is="handleCustomCardType(contentCard.extras.custom_card_type)"
                :key="cardIndex"
                :card="contentCard"
            />
        </template>
    </div>
</template>

<script>
import initialiseBraze from '@justeat/f-metadata';
import ContentCards from '../services/contentCard.service';
import cardTemplates from './cardTemplates';

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
        }
    },
    data () {
        return {
            cards: [],
            titleCard: {}
        };
    },
    mounted () {
        this.setupBraze(this.apiKey, this.userId);
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
            const { cards, titleCard } = new ContentCards(appboy)
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
                default:
                    break;
            }
            return false;
        }
    }
};
</script>

<style lang="scss">
    // c-restaurantCard
    // Styling for a card that holds data on a restaurant
    // Currently consists of a main image, optional restaurant logo thumbnail
    // And then info text below (header, tags, description)

    .c-restaurantCards {
        margin-top: spacing(x5);
        margin-bottom: spacing(x5);

        @include media('>=narrowMid') {
            display: flex;
            flex-direction: row;
        }
    }
    .c-restaurantCards--centred {
        justify-content: center;
    }
    .c-restaurantCards--wrap {
        flex-wrap: wrap;

        &.has-offers-carousel {
            margin-top: 0;

            .c-restaurantCard {
                min-width: inherit;
                max-width: inherit;

                &:first-child {
                    margin-left: 0;
                }
            }
        }
    }
    .c-restaurantCards-sectionTitle {
        margin: spacing(x4) 0 0;
    }

    .c-restaurantCard {
        width: 100%;
        text-decoration: initial;
        text-align: center;

        &,
        &:hover,
        &:focus {
            color: currentColor;
        }

        .c-restaurantCards--wrap & {
            display: flex;
            flex-direction: column;
            flex: 0 0 40%;
            margin: 0 spacing() spacing(x3) 0;
            width: 100%;
        }

        @include media('>=narrowMid') {
            max-width: 370px;

            .c-restaurantCards--wrap & {
                margin: 0 spacing() spacing(x3);
            }
        }

        .c-restaurantCard-banner {
            position: relative;
            display: inline-block;
            background: #cd381f;
            transform: skew(-20deg);
            border-radius: $border-radius;
            color: white;
            padding: 0 spacing();
        }

        .c-restaurantCard-banner-content {
            display: inline-block;
            transform: skew(20deg);
        }

        /**
         * 1. Magic number to align isolated image with top of content card
         */
        &.c-restaurantCard--isolateHeroImage {
            position: relative;
            margin: 84px 0 spacing(x3); // 1

            .c-restaurantCard-info {
                border-radius: $border-radius;
            }

            .c-restaurantCard-bgImg {
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

    .c-restaurantCard-bgImg {
        width: 100%;
        min-height: 170px;
        background-repeat: repeat;
        background-size: cover;
        background-color: $grey--lightest;
        background-position: center;
        border-radius: $border-radius $border-radius 0 0;

        .c-restaurantCard-info--inset & {
            height: 188px;
        }
    }

    .c-restaurantCard-title {
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

    .c-restaurantCard-subTitle {
        @include font-size(base--scaleUp);
        margin-top: spacing();
    }

    .c-restaurantCard-text {
        margin-top: spacing();
        text-align: center;
    }

    .c-restaurantCard-info {
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

    .c-restaurantCard-link {
        font-weight: $font-weight-bold;
        text-decoration: none;
    }

    .c-restaurantCard-footer {
        width: 100%;
        margin-top: auto;
        text-align: center;
        padding-top: spacing(x2);
    }

    .c-restaurantCard-thumbnail {
        border: 1px solid $grey--lightest;
        margin-top: - (32px + spacing(x2)); // This offsets the thumbnail above the top of the info card
        width: 48px;
        min-height: 48px;
    }

    .c-restaurantCard-list {
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

    .c-restaurantCard-offer {
        background-color: $yellow--light;
        width: calc(100% + #{ spacing(x4) });
        text-align: center;
        padding: 5px;
    }

    .c-restaurantCard-promoted {
        position: absolute;
        bottom: 100%;
        right: 0;
        background-color: rgba(51, 51, 51, 0.7);
        color: $white;
        padding: 2px 4px;
        font-weight: $font-weight-bold;
    }

    .c-restaurantCard-data {
        width: 100%;
        margin-top: auto;
    }

    .c-restaurantCard-dataGroup {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: spacing();
    }

    // insets the info card on top of the restaurant image
    .c-restaurantCard-info--inset {
        margin-left: spacing();
        margin-right: spacing();
        margin-top: -62px;
    }

    // infoText is text associated to the restaurant (like delivery time/distance)
    .c-restaurantCard-infoText {
        display: flex;
        align-content: center;
        margin-top: 0;
    }
    .c-restaurantCard-infoText-icon {
        width: 18px;
        height: 18px;
        margin-right: 6px;

        path {
            fill: $grey--mid;
        }
    }

    // Highlight color for text (used for labels like 'New')
    .c-restaurantCard-infoText--highlight {
        color: $green;
    }
    // Add small margin-top to infoText
    .c-restaurantCard-infoText--spaced {
        margin-top: spacing(x0.5);
    }

    .c-restaurantCard-voucher {
        display: flex;
        width: 100%;
        font-family: $font-family-base;
        border: solid $grey--lighter;
        border-width: 1px 0 0;
        padding-top: spacing(x1.5);
        margin-top: spacing(x3);
        cursor: pointer;
        background: transparent;
    }

    .c-restaurantCard-voucher-code,
    .c-restaurantCard-voucher-copy {
        @include font-size(16, false);
        width: 50%;
    }

    .c-restaurantCard-voucher-code {
        font-weight: $font-weight-base;
        color: $grey--mid;
        text-align: left;
    }

    .c-restaurantCard-voucher-copy {
        font-weight: $font-weight-bold;
        color: $color-link-default;
        text-align: right;
    }
</style>
