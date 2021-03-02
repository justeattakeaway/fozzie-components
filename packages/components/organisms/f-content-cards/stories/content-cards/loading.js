import { ContentCards } from '../../src';
import methods from './story-utils/methods';
import { notReturningMockSetup } from './story-utils/braze-mocks';
import { STATE_LOADING } from '../../src/components/ContentCards';

export default function ContentCardsLoading (args, { argTypes }) {
    return {
        components: {
            ContentCards
        },

        props: Object.keys(argTypes),

        methods,

        /**
         * Ensures that card mocks are set up
         */
        beforeCreate: notReturningMockSetup,

        /**
         * Reject the promise set up by the above mock
         */
        beforeDestroy () {
            this.rejectMockPromise({
                status: 500
            });
        },

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
                <template #${STATE_LOADING}="{ status }">
                    <blockquote>
                        Note that this is demo injected content for the purposes of storybook
                    </blockquote>
                    LOADING
                </template>
            </content-cards>`
    };
}

ContentCardsLoading.storyName = 'Loading state';

ContentCardsLoading.args = {
    apiKey: '00000000-0000-0000-0000-000000000000',
    userId: 'test-user-id',
    locale: 'en-GB'
};
