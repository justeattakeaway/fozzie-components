<template>
    <div class="c-loyaltyCards-stampsContainer">
        <content-cards
            :adapters="adapters"
            :tags="tags"
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
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { ContentCards } from '@justeat/f-content-cards';
import '@justeat/f-content-cards/dist/f-content-cards.css';
import stampCardsAdapter from '@justeattakeaway/cc-stampcards-adapter';
import brazeAdapter from '@justeattakeaway/cc-braze-adapter';
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
            pushToDataLayer: () => {},
            tags: 'loyalty',
            adapters: []
        };
    },


    computed: {
        ...mapState(VUEX_MODULE_NAMESPACE_LOYALTY, [
            'globalUserId',
            'brazeApiKey',
            'authToken',
            'tenant',
            'stampCardsAPIUrl',
            'inStampCardsAdapterExperiment'
        ])
    },

    created () {
        this.adapters.push(this.inStampCardsAdapterExperiment ? stampCardsAdapter({
            token: () => this.authToken,
            tenant: this.tenant,
            url: this.stampCardsAPIUrl
        }) : brazeAdapter({
            apiKey: this.brazeApiKey,
            sdkEndpoint: 'sdk.iad-01.braze.com',
            userId: this.globalUserId,
            loggingEnabled: false
        }));
    }

};
</script>

<style lang="scss" module>

</style>
