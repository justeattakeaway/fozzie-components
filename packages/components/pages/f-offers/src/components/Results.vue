

<template>
    <div>
        <content-cards
            :user-id="globalUserId"
            :api-key="brazeApiKey"
            :locale="$i18n.locale"
            :tags="tags"
            :push-to-data-layer="pushToDataLayer"
            @has-loaded="hasLoaded"
            @get-card-count="cardsReceived"
            @voucher-code-click="openModal($event)"
            @on-error="onError">
            <template #default="{ cards }">
                <div :class="$style['c-offersResults-contentCards']">
                    <template v-for="(card, i) in cards">
                        <group-header-card
                            :class="$style['c-offersResults-contentCards-groupHeader']"
                            v-if="card.type === 'Header_Card'"
                            :key="i"
                            :title="card.title" />
                        <component
                            :is="handleCustomCardType(card.type)"
                            v-else
                            :key="i"
                            :card="card"
                            :test-id="testIdForItemWithIndex(i)"
                            :tenant="tenant"
                        />
                    </template>
                </div>
            </template>
            <template #loading>
                <skeleton-loader
                    :type="loadingCard.type"
                    :count="loadingCard.count" />
            </template>
        </content-cards>
        <modal-copied-voucher-code
            :is-open="isModalOpen"
            :url="modalOngoingUrl"
            @close-modal="closeModal"
        />
    </div>
</template>

<script>
import {
    ContentCards,
    PromotionCard,
    PromotionCardOne,
    PromotionCardTwo,
    VoucherCard,
    GroupHeaderCard,
    FirstTimeCustomerCard,
    SkeletonLoader
} from '@justeat/f-content-cards';
import '@justeat/f-content-cards/dist/f-content-cards.css';
import { mapState } from 'vuex';
import { VUEX_MODULE_NAMESPACE_OFFERS } from '../store/types';
import ModalCopiedVoucherCode from './ModalCopiedVoucherCode.vue';

export default {
    name: 'OffersResults',

    components: {
        ContentCards,
        PromotionCard,
        PromotionCardOne,
        PromotionCardTwo,
        VoucherCard,
        GroupHeaderCard,
        FirstTimeCustomerCard,
        SkeletonLoader,
        ModalCopiedVoucherCode
    },

    data: () => ({
        enabledCardTypes: [
            'Header_Card',
            'Promotion_Card_1',
            'Promotion_Card_2',
            'Recommendation_Card_1',
            'Restaurant_FTC_Offer_Card',
            'Voucher_Card_1',
            'Anniversary_Card_1'
        ],
        title: 'Offers',
        hasMounted: false,
        contentCardsHaveLoaded: false,
        error: undefined,
        isModalOpen: false,
        modalOngoingUrl: '',
        loadingCard: { type: 'postOrder', count: 3 },
        pushToDataLayer: () => {},
        tags: 'offers'
    }),

    computed: {
        ...mapState(VUEX_MODULE_NAMESPACE_OFFERS, [
            'brazeApiKey',
            'globalUserId'
        ]),

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

    /**
     * Handles the setting of appboy on the window in order to prevent a race condition between internally
     * and externally loaded versions of the braze sdk
     */
    mounted () {
        this.mountTime = Date.now();
        this.hasMounted = true;
        this.loggingData = {
            tags: this.tags,
            data: {
                timeSinceMount: Date.now() - this.mountTime
            }
        };
    },

    methods: {
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
                    return 'PromotionCardOne';
                case 'Promotion_Card_2':
                    return 'PromotionCardTwo';
                default:
                    break;
            }
            return false;
        },

        /**
         * Consumes the number of cards received from braze by the content cards component
         * @param {number} cards
         */
        cardsReceived (cards) {
            if (cards || this.contentCardsHaveLoaded) {
                this.$log.info(
                    'f-offers (Results) - Content cards received',
                    'offers',
                    {
                        ...this.loggingData,
                        Count: cards
                    }
                );
            }
        },

        /**
         * Handles a successful load of the content cards component
         */
        hasLoaded () {
            this.contentCardsHaveLoaded = true;
            this.$log.info(
                'f-offers (Results) - Content cards loaded successfully',
                'offers',
                {
                    ...this.loggingData
                }
            );
        },

        /**
         * Handles errors emitted by the content cards component
         * @param {Error} error
         */
        onError (error) {
            this.error = error;
            this.$log.error(
                'f-offers (Results) - An error has occurred during the loading of content cards',
                error,
                'offers',
                {
                    ...this.loggingData,
                    error: {
                        body: error,
                        exception: error.name,
                        exceptionMessage: error.message,
                        exceptionStackTrace: error.stack,
                        traceId: error.traceId || (error.response && error.response.data.traceId),
                        errorCode: error.errorCode
                    }
                }
            );
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

        /**
         * Surfaces a message indicating a voucher code has been copied, with an optional url for an ongoing journey
         */
        openModal ({ url = '' }) {
            this.modalOngoingUrl = url;
            this.isModalOpen = true;
        },

        /**
         * Closes the voucher modal and clears the ongoing url for reuse
         */
        closeModal () {
            this.isModalOpen = false;
            this.modalOngoingUrl = '';
        }
    }
};
</script>

<style lang="scss" module>
.c-offersResults-contentCards {
    display: grid;
    gap: spacing(d);
    justify-items: center;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    @include media('>=narrowMid') {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @include media('>=wide') {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}
.c-offersResults-contentCards-groupHeader {
    grid-column: 1 / -1;
}
</style>
