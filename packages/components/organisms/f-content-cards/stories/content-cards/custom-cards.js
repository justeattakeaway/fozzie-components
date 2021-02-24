import { ContentCards, PostOrderCard } from '../../src';
import methods from './story-utils/methods';
import { zeroCardsMockSetup } from './story-utils/braze-mocks';
import { STATE_DEFAULT } from '../../src/components/ContentCards';

export default function ContentCardsCustom (args, { argTypes }) {
    return {
        components: {
            ContentCards,
            PostOrderCard
        },

        props: Object.keys(argTypes),

        data () {
            return {
                customCards: []
            };
        },

        methods: {
            ...methods,
            getCardCount (count) {
                methods.getCardCount.bind(this)(count);
                if (count === 0) {
                    this.customCards.push({
                        ctaText: 'A special link',
                        description: [],
                        headline: 'The below card has been injected dynamically.',
                        icon: 'https://picsum.photos/seed/My-original-card-seed-icon/48/48',
                        image: 'https://picsum.photos/seed/My-original-card-seed-image/384/216?blur=3',
                        pinned: true,
                        subtitle: 'You didn\'t expect that, did you?',
                        target: {
                            attribute: '_self'
                        },
                        title: 'Surprise!',
                        type: 'Post_Order_Card_1',
                        url: null
                    });
                }
            }
        },

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
    <template #${STATE_DEFAULT}="{ cards }">
        <blockquote>
            Note that this is demo injected content for the purposes of storybook
        </blockquote>
        <component
            v-for="(card, i) in cards"
            :is="handleCustomCardType(card.type)"
            :key="i"
            :card="card"
            :tenant="tenant"
        />
    </template>
</content-cards>`
    };
}

ContentCardsCustom.storyName = 'Custom card';

ContentCardsCustom.args = {
    apiKey: '00000000-0000-0000-0000-000000000000',
    userId: 'test-user-id',
    locale: 'en-GB'
};
