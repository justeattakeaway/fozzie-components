import { ContentCards } from '../../src';
import methods from './story-utils/methods';
import { zeroCardsMockSetup } from './story-utils/braze-mocks';
import { STATE_ERROR } from '../../src/components/ContentCards';

export default function ContentCardsError (args, { argTypes }) {
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
                <template #${STATE_ERROR}="{ status }">
                    <blockquote>
                        Note that this is demo injected content for the purposes of storybook
                    </blockquote>
                    ERROR
                </template>
            </content-cards>`
    };
}

ContentCardsError.storyName = 'Error state';

ContentCardsError.args = {
    userId: 'test-user-id',
    locale: 'en-GB'
};
