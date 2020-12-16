<template>
    <base-content-cards
        #default="{ cards }"
        :api-key="apiKey"
        :user-id="userId"
        @has-loaded="loaded">
        <div>
            <div
                :class="[$style['c-contentCards']]"
                :data-test-id="testId">
                <template v-for="(contentCard, cardIndex) in cards">
                    <post-order-card
                        v-if="contentCard.type === 'Post_Order_Card_1'"
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

    .c-contentCards > * {
        margin-left: spacing(x1.5);
        margin-right: spacing(x1.5);
    }

</style>
