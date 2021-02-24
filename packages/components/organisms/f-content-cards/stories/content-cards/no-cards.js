import { ContentCards } from '../../src';
import methods from './story-utils/methods';
import { zeroCardsMockSetup } from './story-utils/braze-mocks';
import { STATE_NO_CARDS } from '../../src/components/ContentCards';

export default function ContentCardsNoCards (args, { argTypes }) {
    return {
        components: {
            ContentCards
        },

        props: Object.keys(argTypes),

        methods,

        /**
         * Ensures that card mocks are set up
         */
        beforeCreate: zeroCardsMockSetup,

        template: `
<content-cards
    @on-braze-init="onBrazeInit"
    @get-card-count="getCardCount"
    @has-loaded="hasLoaded"
    @on-error="onError"
    :user-id="userId"
    :api-key="apiKey"
    :locale="locale"
    :custom-cards="customCards"
    :key="locale"
>
    <template #${STATE_NO_CARDS}="{ status }">
        <blockquote>
            Note that this is demo injected content for the purposes of storybook
        </blockquote>
        NO CARDS
    </template>
</content-cards>`
    };
}

ContentCardsNoCards.storyName = 'No Cards state';

ContentCardsNoCards.args = {
    apiKey: '00000000-0000-0000-0000-000000000000',
    userId: 'test-user-id',
    locale: 'en-GB'
};
