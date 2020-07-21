<template>
    <div
        v-if="hasLoaded"
        :class="[$style['c-contentCards'], $style['c-contentCards--wrap' ]]"
        :data-test-id="testId">
        <template
            v-for="(contentCard, cardIndex) in cards">
            <component
                :is="handleCustomCardType(contentCard.extras.custom_card_type)"
                :key="cardIndex"
                :card="contentCard"
                :title="title"
                :data-test-id="testIdForItemWithIndex(cardIndex)"
            />
        </template>
    </div>
    <skeleton-loader
        v-else
        :type="loader.type"
        :count="loader.count" />
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
        const isPostOrderSkeletonCard = this.enabledCardTypes && this.enabledCardTypes.every(type => type === 'Post_Order_Card_1');
        const loader = isPostOrderSkeletonCard ? { type: 'postOrder', count: 1 } : { type: 'promo', count: 3 };

        return {
            cards: [],
            titleCard: {},
            hasLoaded: false,
            loader
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
            this.hasLoaded = true;
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

<style lang="scss" module>
    .c-contentCards {
        margin-top: spacing(x5);
        margin-bottom: spacing(x5);

        @include media('>=narrowMid') {
            display: flex;
            flex-direction: row;
        }
    }

    .c-contentCards--wrap {
        flex-wrap: wrap;
    }
</style>
