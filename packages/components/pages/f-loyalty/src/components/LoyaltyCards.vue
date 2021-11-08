<template>
    <div class="c-loyaltyCards-stampsContainer">
        <content-cards
            v-if="globalUserId"
            :user-id="globalUserId"
            :api-key="brazeApiKey"
            :locale="$i18n.locale"
            :push-to-data-layer="pushToDataLayer">
            <template #default="{ cards }">
                <cards-slot :cards="cards" />
            </template>
            <template #no-cards>
                <no-cards-error-state engagement-label="no_cards" />
                <terms />
            </template>
            <template #error>
                <no-cards-error-state engagement-label="error_errorState" />
                <terms />
            </template>
            <template #loading>
                <loyalty-cards-loading-state />
            </template>
        </content-cards>
        <loyalty-cards-loading-state v-else />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { ContentCards } from '@justeat/f-content-cards';
import '@justeat/f-content-cards/dist/f-content-cards.css';
import NoCardsErrorState from './NoCardsErrorState.vue';
import LoyaltyCardsLoadingState from './Loading.vue';
import CardsSlot from './Slots.vue';
import Terms from './Terms.vue';
import { VUEX_MODULE_NAMESPACE_LOYALTY } from '../store/types';

export default {
    name: 'LoyaltyCards',

    components: {
        LoyaltyCardsLoadingState,
        Terms,
        ContentCards,
        NoCardsErrorState,
        CardsSlot
    },

    data () {
        return {
            pushToDataLayer: () => {}
        };
    },

    computed: {
        ...mapState(VUEX_MODULE_NAMESPACE_LOYALTY, [
            'globalUserId',
            'brazeApiKey'
        ])
    }
};
</script>

<style lang="scss" module>

</style>
