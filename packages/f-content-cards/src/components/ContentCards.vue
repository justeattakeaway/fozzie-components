<template>
    <div
        v-if="hasLoaded"
        :class="[$style['c-contentCards'], $style['c-contentCards--wrap' ]]"
        :data-test-id="testId">
        <template v-if="groupCards">
            <template v-for="({ title, cards: subCards, id: groupId }, groupIndex) in cardsGrouped">
                <h2
                    v-if="groupId"
                    :key="groupIndex"
                    :class="[$style['c-contentCards--group-title'], 'c-contentCards--group-title']"
                    :data-test-id="`${groupIndex}_${groupId}`"
                >
                    {{ title }}
                </h2>
                <div
                    :key="`${groupIndex}-children`"
                    :class="[$style['c-contentCards--group']]">
                    <template v-for="(contentCard, cardIndex) in subCards">
                        <component
                            :is="handleCustomCardType(contentCard.type)"
                            :key="`${groupIndex}_${cardIndex}_${contentCard.id}`"
                            :card="contentCard"
                            :tenant="tenant"
                            :data-test-id="testIdForItemWithIndex(cardIndex, groupIndex)"
                        />
                    </template>
                </div>
            </template>
        </template>
        <template v-else>
            <template v-for="(contentCard, cardIndex) in cards">
                <component
                    :is="handleCustomCardType(contentCard.type)"
                    :key="`${cardIndex}_${contentCard.id}`"
                    :card="contentCard"
                    :tenant="tenant"
                    :data-test-id="testIdForItemWithIndex(cardIndex)"
                />
            </template>
        </template>
    </div>
    <skeleton-loader
        v-else-if="showLoadingState"
        :type="loadingCard.type"
        :count="loadingCard.count" />
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import initialiseMetadataDispatcher from '@justeat/f-metadata';
import cardTemplates from './cardTemplates';
import tenantConfigs from '../tenants';

export const CARDSOURCE_METADATA = 'metadata';
export const CARDSOURCE_CUSTOM = 'custom';

const DEFAULT_SKELETON_CARD_COUNT = 3;

/**
 * Generates card-specific analytics data suitable for sending back to GTM via f-trak
 *
 * @param contentAction
 * @param card
 * @returns {{contentCTA, customVoucherCode, contentId: *, contentAction: *, contentPosition, contentTitle: *, contentType: string}}
 */
const createMetadataCardEvent = (contentAction, card) => {
    const {
        id: contentId,
        title: contentTitle,
        order: contentPosition,
        ctaText: contentCTA,
        voucherCode: customVoucherCode
    } = card;

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

/**
 * Generates custom card-specific analytics data suitable for sending back to GTM via f-trak
 *
 * @param {String} action
 * @param {Object} card
 * @returns {Object}
 */
const createCustomCardEvent = (action, card) => {
    const {
        headline: name,
        ctaText: cta
    } = card;

    return {
        event: 'Promotion',
        custom: {
            Promotion: {
                name,
                type: 'justeat_contentCard',
                id: null,
                voucher: null,
                action,
                cta
            }
        }
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

        brands: {
            type: Array,
            default: () => ([])
        },

        cardLimit: {
            type: Number,
            default: -1
        },

        enabledCardTypes: {
            type: Array,
            default: () => ([])
        },

        locale: {
            type: String,
            default: ''
        },

        pushToDataLayer: {
            type: Function,
            default: () => (() => {})
        },

        showLoadingState: {
            type: Boolean,
            default: true
        },

        testId: {
            type: String,
            default: null
        },

        userId: {
            type: String,
            default: ''
        },

        groupCards: {
            type: Boolean,
            default: false
        }
    },

    data () {
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];
        const isPostOrderSkeletonCard = this.enabledCardTypes.length && this.enabledCardTypes.every(type => type === 'Post_Order_Card_1');
        const loadingCard = isPostOrderSkeletonCard
            ? { type: 'postOrder', count: 1 }
            : {
                type: 'promo',
                count: this.cardLimit === -1
                    ? DEFAULT_SKELETON_CARD_COUNT
                    : Math.min(DEFAULT_SKELETON_CARD_COUNT, this.cardLimit)
            };

        return {
            cards: [],
            cardsGrouped: [],
            rawCards: [],
            copy: { ...localeConfig },
            titleCard: {},
            hasLoaded: false,
            loadingCard,
            metadataDispatcher: null
        };
    },

    computed: {
        /**
         * Determines the tenant based on the currently selected locale in order to choose correct translations
         * @return {String}
         **/
        tenant () {
            return {
                'en-GB': 'uk',
                'en-AU': 'au',
                'en-NZ': 'nz',
                'da-DK': 'dk',
                'es-ES': 'es',
                'en-IE': 'ie',
                'it-IT': 'it',
                'nb-NO': 'no'
            }[this.locale] || 'uk';
        }
    },

    watch: {
        /**
         * Determines what card impressions should be logged, and whether the loaded flag should be set
         * @param {Card[]} current
         * @param {Card[]} previous
         **/
        cards (current, previous) {
            this.$emit('get-card-count', current.length);

            if (current.length && (current.length !== previous.length) && !this.groupCards) {
                this.metadataDispatcher.logCardImpressions(this.cards.map(({ id }) => id));
            }
            if ((current.length > 0) && (previous.length === 0)) {
                this.hasLoaded = true;
            }
        },

        /**
         * Determines what card impressions should be logged, and whether the loaded flag should be set for groups cards
         * @param {Boolean} current
         * @param {Boolean} previous
         **/
        cardsGrouped (current, previous) {
            this.$emit('get-group-count', current.length);

            if (current.length && (current.length !== previous.length) && this.groupCards) {
                const cardsReduced = this.cardsGrouped.reduce(
                    (acc, { cards, id: groupId }) => [...acc,
                        ...[groupId, ...cards.map(({ id: cardId }) => cardId)]],
                    []
                )
                .filter(cardID => cardID !== undefined);
                this.metadataDispatcher.logCardImpressions(cardsReduced);
            }
            if ((current.length > 0) && (previous.length === 0)) {
                this.hasLoaded = true;
            }
        },

        /**
         * Monitors the loaded flag to emit the has-loaded event if necessary
         * @param {Boolean} current
         * @param {Boolean} previous
         **/
        hasLoaded (current, previous) {
            if (current && !previous) {
                this.$emit('has-loaded', true);
            }
        }

    },

    /**
     * Emits an event that allows consuming code to inject custom content cards, and sets off metadata initialisation
     **/
    mounted () {
        this.$emit('custom-cards-callback', this.customContentCards.bind(this));
        this.setupMetadata(this.apiKey, this.userId);
    },

    /**
     * Sets up dependencies required by descendant components
     **/
    provide () {
        const component = this;

        return {
            /**
             * Reflects card click events though to common click event handler
             **/
            emitCardClick (card) {
                component.handleCardClick(card);
            },

            /**
             * Reflects card view events though to common view event handler
             **/
            emitCardView (card) {
                component.handleCardView(card);
            },

            /**
             * Emits voucher code click event with given ongoing url
             **/
            emitVoucherCodeClick (url) {
                component.$emit('voucherCodeClick', {
                    url
                });
            },

            copy: component.copy
        };
    },

    methods: {
        /**
         * Initializes metadata and handles success / failure states from the returned promise
         * @param {String} apiKey
         * @param {String} userId
         * @param {Boolean} enableLogging
         * @return {Promise<void>}
         **/
        setupMetadata (apiKey, userId, enableLogging = false) {
            return initialiseMetadataDispatcher({
                apiKey,
                userId,
                enableLogging,
                enabledCardTypes: [...this.enabledCardTypes],
                brands: this.brands,
                callbacks: {
                    handleContentCards: this.metadataContentCards,
                    handleContentCardsGrouped: this.metadataContentCardsGrouped
                }
            })
            .then(dispatcher => {
                this.metadataDispatcher = dispatcher;
            })
            .catch(error => {
                this.$emit('on-error', error);
            });
        },

        /**
         * Common method for handling card ingestion to component. Card list length of 0 (after filtering) is considered
         * 'successful' but does not overwrite any cards currently in place, in order to maintain cards that are present
         * @param {String} source
         * @param {Function} successCallback
         * @param {Function} failCallback
         * @param {Card[]} cards
         **/
        contentCards ({
            source,
            successCallback = () => {},
            failCallback = () => {}
        }, cards) {
            if (cards === undefined) {
                return failCallback();
            }

            const limitedCards = this.limitCards(cards, this.cardLimit);

            if ((this.cards.length !== 0) && (limitedCards.length === 0)) {
                return successCallback();
            }

            this.cards = limitedCards.map(card => Object.assign(card, { source }));

            return successCallback();
        },

        /**
         * Common method for handling card ingestion to component for grouped cards.
         * @param {String} source
         * @param {Card[]} groupedCards
         **/
        contentCardsGrouped ({
            source
        }, groupedCards) {
            this.cardsGrouped = groupedCards.map(card => Object.assign(card, { source }));
        },

        /**
         * Handles card ingestion via metadata for groups
         * @param {Card[]} groupedCards
         **/
        metadataContentCardsGrouped (groupedCards) {
            this.contentCardsGrouped({
                source: CARDSOURCE_METADATA
            }, groupedCards);
        },

        /**
         * Handles card ingestion via metadata
         * @param {Card[]} cards
         **/
        metadataContentCards (cards) {
            this.contentCards({
                source: CARDSOURCE_METADATA,
                successCallback: () => {
                    this.$emit('on-braze-init', window.appboy); // for backward compatibility
                    this.$emit('on-metadata-init', window.appboy);
                }
            }, cards);
        },

        /**
         * Handles custom card ingestion
         * @param {Card[]} cards
         **/
        customContentCards (cards) {
            this.contentCards({
                source: CARDSOURCE_CUSTOM
            }, cards);
        },

        /**
         * Method for returning a shallow copy of the cards array with a maximum of the given limit
         * @param {Object[]} cards
         * @param {Number} limit
         **/
        limitCards (cards, limit) {
            if (limit === 1 && this.enabledCardTypes.length > 1) {
                const filteredCards = [];
                this.enabledCardTypes.some(enabledCardType => {
                    const card = cards.find(({ type }) => type === enabledCardType);
                    if (card) filteredCards.push(card);
                    return card && filteredCards.length === limit;
                });
                return filteredCards;
            }
            return limit > -1 ? cards.slice(0, limit) : cards;
        },

        /**
         * Maps given card type to component name
         *
         * @param type
         * @return {string|boolean}
         */
        handleCustomCardType (type) {
            switch (type) {
                case 'Anniversary_Card_1':
                case 'Voucher_Card_1':
                    return 'VoucherCard';
                case 'Restaurant_FTC_Offer_Card':
                    return 'FirstTimeCustomerCard';
                case 'Post_Order_Card_1':
                    return 'PostOrderCard';
                case 'Promotion_Card_1':
                case 'Promotion_Card_2':
                    return 'PromotionCard';
                case 'Terms_And_Conditions_Card':
                case 'Terms_And_Conditions_Card_2':
                    return 'TermsAndConditionsCard';
                case 'Home_Promotion_Card_1':
                    return 'HomePromotionCard1';
                case 'Home_Promotion_Card_2':
                    return 'HomePromotionCard2';
                default:
                    break;
            }
            return false;
        },

        /**
         * Takes appropriate response for click event for given card object based on its source
         * @param card
         */
        handleCardClick (card) {
            switch (card.source) {
                case CARDSOURCE_METADATA:
                    this.trackMetadataCardClick(card);
                    this.metadataDispatcher.logCardClick(card.id);
                    break;
                case CARDSOURCE_CUSTOM:
                    this.trackCustomCardClick(card);
                    break;
                default:
                    throw new Error('Invalid card source type');
            }
        },

        /**
         * Takes appropriate response for view event for given card object based on its source
         * @param card
         */
        handleCardView (card) {
            switch (card.source) {
                case CARDSOURCE_METADATA:
                    this.trackMetadataCardVisibility(card);
                    break;
                case CARDSOURCE_CUSTOM:
                    this.trackCustomCardVisibility(card);
                    break;
                default:
                    throw new Error('Invalid card source type');
            }
        },

        /**
         * Generates a click event for the given card data and reports using the common method
         * @param card
         */
        trackMetadataCardClick (card) {
            const event = createMetadataCardEvent('click', card);
            this.metadataDispatcher.pushShapedEventToDataLayer(this.pushToDataLayer, event);
        },

        /**
         * Generates a click event for the given card data and reports using the common method
         * @param card
         */
        trackCustomCardClick (card) {
            const event = createCustomCardEvent('click', card);
            this.pushToDataLayer(event);
        },

        /**
         * Generates a view event for the given card data and reports using the common method
         * @param card
         */
        trackMetadataCardVisibility (card) {
            const event = createMetadataCardEvent('view', card);
            this.metadataDispatcher.pushShapedEventToDataLayer(this.pushToDataLayer, event);
        },

        /**
         * Generates a view event for the given card data and reports using the common method
         * @param card
         */
        trackCustomCardVisibility (card) {
            const event = createCustomCardEvent('view', card);
            this.pushToDataLayer(event);
        },

        /**
         * Generates a unique test id on a per-card basis if testId prop provided
         * @param index
         * @param groupIndex optional
         */
        testIdForItemWithIndex (index, groupIndex = null) {
            return groupIndex !== null ?
                this.testId && `ContentCard-${this.testId}-${index}-${groupIndex}` :
                this.testId && `ContentCard-${this.testId}-${index}`;
        }
    }
};
</script>

<style lang="scss" module>
    .c-contentCards {
        margin-top: spacing(x5);
        margin-bottom: spacing(x3);

        @include media('>=narrowMid') {
            display: flex;
            flex-flow: row;
        }
    }

    .c-contentCards--wrap {
        flex-flow: wrap;
    }

    .c-contentCards--group {
        display: flex;
        flex-flow: row wrap;
        width: 100%;
    }

    .c-contentCards--group-title {
        width: 100%;
        &:not(:first-child) {
            margin-top: spacing(x3);
        }
        margin-bottom: spacing(x2);
    }

</style>
