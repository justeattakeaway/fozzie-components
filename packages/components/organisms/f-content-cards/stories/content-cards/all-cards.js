import {
    ContentCards,
    FirstTimeCustomerCard,
    PostOrderCard,
    PromotionCard,
    StampCard1,
    StampCardPromotionCard,
    TermsAndConditionsCard,
    VoucherCard
} from '../../src';
import { allCardsMockSetup } from './story-utils/braze-mocks';
import methods from './story-utils/methods';
import { STATE_DEFAULT } from '../../src/components/ContentCards';

const components = {
    ContentCards,
    VoucherCard,
    FirstTimeCustomerCard,
    PromotionCard,
    TermsAndConditionsCard,
    PostOrderCard,
    StampCard1,
    StampCardPromotionCard
};

export default function ContentCardsBraze (args, { argTypes }) {
    return {
        name: 'Content Cards Braze',

        components,

        props: Object.keys(argTypes),

        methods,

        /**
         * Ensures that card mocks are set up
         */
        beforeCreate: allCardsMockSetup,

        template: `
            <content-cards
                @on-braze-init="onBrazeInit"
                @get-card-count="getCardCount"
                @has-loaded="hasLoaded"
                @on-error="onError"
                :user-id="userId"
                :api-key="apiKey"
                :locale="locale"
                :key="locale"
            >
                <template #${STATE_DEFAULT}="{ cards }">
                    <blockquote>
                        Note that this is demo injected content for the purposes of storybook
                    </blockquote>
                    <component
                        v-for="(card, i) in cards"
                        :is="handleCustomCardType(card.type)"
                        :key="i"
                        :card="card"
                    />
                </template>
            </content-cards>`
    };
}

ContentCardsBraze.storyName = 'Braze Cards only (mocked API response)';

ContentCardsBraze.args = {
    apiKey: '00000000-0000-0000-0000-000000000000',
    userId: 'test-user-id',
    locale: 'en-GB'
};
