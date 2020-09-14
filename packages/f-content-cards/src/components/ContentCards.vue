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
import initialiseBraze, { logCardClick, logCardImpressions } from '@justeat/f-metadata';
import ContentCards from '../services/contentCard.service';
import cardTemplates from './cardTemplates';
import tenantConfigs from '../tenants';

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
            loadingCard
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
            if (current.length && (current.length !== previous.length)) {
                logCardImpressions(this.rawCards);
            }
        }
    },

    mounted () {
        this.setupBraze(this.apiKey, this.userId);
    },

    provide () {
        const component = this;

        return {
            emitCardClick (card) {
                component.trackCardClick(card);
                logCardClick(card);
            },

            emitCardView (card) {
                component.trackCardVisibility(card);
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
        setupBraze (apiKey, userId, enableLogging = false) {
            try {
                initialiseBraze({
                    apiKey,
                    userId,
                    enableLogging,
                    callbacks: {
                        handleContentCards: this.contentCards
                    }
                });
            } catch (error) {
                this.$emit('on-error', error);
            }
        },

        contentCards (appboy) {
            if (!appboy) return;
            const { cards, rawCards, titleCard } = new ContentCards(appboy, {
                enabledCardTypes: this.enabledCardTypes
            })
                .removeDuplicateContentCards()
                .filterCards(this.brands)
                .getTitleCard()
                .arrangeCardsByTitles()
                .applyCardLimit(this.cardLimit)
                .output();

            this.rawCards = rawCards;
            this.cards = cards;
            this.titleCard = titleCard;
            this.hasLoaded = true;

            this.$emit('on-braze-init', appboy);
            this.$emit('get-card-count', cards.length);
            this.$emit('has-loaded', true);
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
