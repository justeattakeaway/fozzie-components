import { withA11y } from '@storybook/addon-a11y';
import HttpRequestMock from 'http-request-mock';
import brazeAdapter from '@justeattakeaway/cc-braze-adapter';
import { faker } from '@faker-js/faker';
import ContentCards, { STATE_DEFAULT } from '../../src/components/ContentCards';
import StampCard1 from '../../src/components/cardTemplates/StampCard1.vue';
import StampCardPromotionCard from '../../src/components/cardTemplates/StampCardPromotionCard.vue';
import FirstTimeCustomerCard from '../../src/components/cardTemplates/FirstTimeCustomerCard.vue';
import PostOrderCard from '../../src/components/cardTemplates/PostOrderCard.vue';
import TermsAndConditionsCard from '../../src/components/cardTemplates/TermsAndConditionsCard.vue';
import VoucherCard from '../../src/components/cards/VoucherCard.vue';
import PromotionCard from '../../src/components/cards/PromotionCardOne.vue';
import data from '../mockData/data';
import cards from '../mockData/cards';

export default {
    title: 'Components/Organisms/f-content-cards',
    decorators: [withA11y]
};

export const BrazeContentCardsAdapter = (args, { argTypes }) => ({
    components: {
        ContentCards,
        StampCard1,
        StampCardPromotionCard,
        FirstTimeCustomerCard,
        PostOrderCard,
        VoucherCard,
        PromotionCard,
        TermsAndConditionsCard
    },

    props: Object.keys(argTypes),

    data: () => ({
        adapters: []
    }),

    methods: {
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
                case 'Stamp_Card_1':
                    return 'StampCard1';
                case 'StampCard_Promotion_Card_1':
                    return 'StampCardPromotionCard';
                case 'Post_Order_Card_1':
                    return 'PostOrderCard';
                default:
                    break;
            }
            return false;
        }
    },

    beforeCreate () {
        const mocker = HttpRequestMock.setup();

        mocker.mock({
            url: 'https://sdk.iad-01.braze.com/api/v3/data',
            method: 'post',
            delay: 0,
            status: 200,
            header: {
                'content-type': 'application/json'
            },
            body: data()
        });

        mocker.mock({
            url: 'https://sdk.iad-01.braze.com/api/v3/content_cards/sync',
            method: 'post',
            delay: 0,
            status: 200,
            header: {
                'content-type': 'application/json'
            },
            body: cards()
        });
    },

    created () {
        const adapter = brazeAdapter({
            apiKey: faker.datatype.uuid(),
            sdkEndpoint: 'sdk.iad-01.braze.com',
            userId: faker.datatype.uuid()
        });

        this.adapters.push(adapter);
    },

    template: `
        <content-cards
            :adapters="adapters"
            :locale="locale"
        >
            <template #${STATE_DEFAULT}="{ cards }">
                <template v-for="card in cards">
                    <component :key="card.id" :is="handleCustomCardType(card.type)" :card="card"></component>
                </template>
            </template>
        </content-cards>`
});

BrazeContentCardsAdapter.args = {
    locale: 'en-GB'
};

BrazeContentCardsAdapter.storyName = 'Braze Adapter';
