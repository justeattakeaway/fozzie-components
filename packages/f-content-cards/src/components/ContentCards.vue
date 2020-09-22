<template>
    <div
        v-if="hasLoaded"
        :class="[$style['c-contentCards'], $style['c-contentCards--wrap' ]]"
        :data-test-id="testId">
        <template
            v-for="(contentCard, cardIndex) in cards">
            <component
                :is="handleCustomCardType(contentCard.type)"
                :key="`${cardIndex}_${contentCard.id}`"
                :card="contentCard"
                :title="title"
                :tenant="tenant"
                :data-test-id="testIdForItemWithIndex(cardIndex)"
            />
        </template>
    </div>
    <skeleton-loader
        v-else-if="showLoadingState"
        :type="loadingCard.type"
        :count="loadingCard.count" />
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import initialiseBrazeDispatcher from '@justeat/f-metadata';
import cardTemplates from './cardTemplates';
import tenantConfigs from '../tenants';

export const CARDSOURCE_BRAZE = 'braze';
export const CARDSOURCE_CUSTOM = 'custom';

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
        }
    },

    data () {
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];
        const isPostOrderSkeletonCard = this.enabledCardTypes.length && this.enabledCardTypes.every(type => type === 'Post_Order_Card_1');
        const loadingCard = isPostOrderSkeletonCard ? { type: 'postOrder', count: 1 } : { type: 'promo', count: 3 };

        return {
            cards: [],
            rawCards: [],
            copy: { ...localeConfig },
            titleCard: {},
            hasLoaded: false,
            loadingCard,
            brazeDispatcher: null
        };
    },

    computed: {
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
        cards (current, previous) {
            this.$emit('get-card-count', current.length);

            if (current.length && (current.length !== previous.length)) {
                this.brazeDispatcher.logCardImpressions(this.cards.map(({ id }) => id));
            }
            if ((current.length > 0) && (previous.length === 0)) {
                this.hasLoaded = true;
            }
        },

        hasLoaded (current, previous) {
            if (current && !previous) {
                this.$emit('has-loaded', true);
            }
        }
    },

    mounted () {
        this.$emit('custom-cards-callback', this.customContentCards.bind(this));
        this.setupBraze(this.apiKey, this.userId);
    },

    provide () {
        const component = this;

        return {
            emitCardClick (card) {
                component.handleCardClick(card);
            },

            emitCardView (card) {
                component.handleCardView(card);
            },

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
         * @param {String} apiKey
         * @param {String} userId
         * @param {Boolean} enableLogging
         * @return {Promise<void>}
         **/
        setupBraze (apiKey, userId, enableLogging = false) {
            return initialiseBrazeDispatcher({
                apiKey,
                userId,
                enableLogging,
                enabledCardTypes: this.enabledCardTypes,
                callbacks: {
                    handleContentCards: this.brazeContentCards
                }
            })
                .then(dispatcher => {
                    this.brazeDispatcher = dispatcher;
                })
                .catch(error => {
                    this.$emit('on-error', error);
                });
        },

        contentCards ({
            source,
            successCallback = () => {},
            failCallback = () => {}
        }, cards) {
            if (cards === undefined) {
                return failCallback();
            }

            this.cards = this.limitCards(cards, this.cardLimit)
                .map(card => Object.assign(card, { source }));

            return successCallback();
        },

        brazeContentCards (cards) {
            this.contentCards({
                source: CARDSOURCE_BRAZE,
                successCallback: () => this.$emit('on-braze-init', window.appboy)
            }, cards);
        },

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

        handleCardClick (card) {
            switch (card.source) {
                case CARDSOURCE_BRAZE:
                    this.trackBrazeCardClick(card);
                    this.brazeDispatcher.logCardClick(card.id);
                    break;
                case CARDSOURCE_CUSTOM:
                    // TBC DPDAMI-2688
                    break;
                default:
                    throw new Error('Invalid card source type');
            }
        },

        handleCardView (card) {
            switch (card.source) {
                case CARDSOURCE_BRAZE:
                    this.trackBrazeCardVisibility(card);
                    break;
                case CARDSOURCE_CUSTOM:
                    // TBC DPDAMI-2688
                    break;
                default:
                    throw new Error('Invalid card source type');
            }
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
            return this.testId && `ContentCard-${this.testId}-${index}`;
        },

        trackBrazeCardClick (card) {
            const event = createBrazeCardEvent('click', card);
            this.pushBrazeEvent(event);
        },

        trackBrazeCardVisibility (card) {
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
