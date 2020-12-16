<template>
    <base-content-cards
        #default="{ cards }"
        :api-key="apiKey"
        :user-id="userId"
        @has-loaded="loaded">
        <div>
            <div
                v-if="hasLoaded"
                :class="[$style['c-contentCards'], $style['c-contentCards--wrap' ]]"
                :data-test-id="testId">
                <template v-for="(contentCard, cardIndex) in cards">
                    <h2
                        v-if="contentCard.type === 'Header_Card'"
                        :key="`${cardIndex}_${contentCard.id}`"
                        :class="[$style['c-contentCards--group-title'], 'c-contentCards--group-title']"
                        :data-test-id="testIdForItemWithIndex(cardIndex)"
                    >
                        {{ contentCard.title }}
                    </h2>
                    <component
                        :is="handleCustomCardType(contentCard.type)"
                        v-else
                        :key="`${cardIndex}_${contentCard.id}`"
                        :card="contentCard"
                        :tenant="tenant"
                        :data-test-id="testIdForItemWithIndex(cardIndex)"
                    />
                </template>
            </div>
            <skeleton-loader
                v-if="!hasLoaded"
                :type="loadingCard.type"
                :count="loadingCard.count" />
        </div>
    </base-content-cards>
</template>

<script>
import cardTemplates from '../cardTemplates';
import BaseContentCards from '../BaseContentCards.vue';
import ContentCardsMixin from '../../mixins/content-cards';

const DEFAULT_SKELETON_CARD_COUNT = 3;

export default {
    name: 'ContentCards',

    components: {
        ...cardTemplates,
        BaseContentCards
    },

    mixins: [ContentCardsMixin],

    data () {
        // const isPostOrderSkeletonCard = this.enabledCardTypes.length && this.enabledCardTypes.every(type => type === 'Post_Order_Card_1');
        const loadingCard = {
            type: 'promo',
            count: DEFAULT_SKELETON_CARD_COUNT
        };

        return {

            hasLoaded: false,
            loadingCard,
            metadataDispatcher: null
        };
    },

    /**
     * Emits an event that allows consuming code to inject custom content cards, and sets off metadata initialisation
     **/
    mounted () {
        // this.$emit('custom-cards-callback', this.customContentCards.bind(this));
    },

    methods: {
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
        /**
         * Generates a unique test id on a per-card basis if testId prop provided
         * @param index
         * @param groupIndex optional
         */
        testIdForItemWithIndex (index, groupIndex = null) {
            return groupIndex !== null ?
                this.testId && `ContentCard-${this.testId}-${index}-${groupIndex}` :
                this.testId && `ContentCard-${this.testId}-${index}`;
        },

        loaded () {
            this.hasLoaded = true;
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

    .c-contentCards--group-title {
        width: 100%;
        &:not(:first-child) {
            margin-top: spacing(x3);
        }
        margin-bottom: spacing(x2);
    }

</style>
