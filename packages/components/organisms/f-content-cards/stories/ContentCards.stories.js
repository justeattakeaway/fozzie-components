import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import mock, { proxy } from 'xhr-mock';

import {
    ContentCards,
    VoucherCard,
    FirstTimeCustomerCard,
    PromotionCard,
    TermsAndConditionsCard,
    PostOrderCard,
    StampCard1
} from '../src';

import {
    STATE_LOADING,
    STATE_ERROR,
    STATE_DEFAULT,
    STATE_NO_CARDS
} from '../src/components/ContentCards';

import cards from './mockData/cards';
import data from './mockData/data';

const components = {
    ContentCards,
    VoucherCard,
    FirstTimeCustomerCard,
    PromotionCard,
    TermsAndConditionsCard,
    PostOrderCard,
    StampCard1
};

/**
 * Resets all locally stored braze data so that the stubbed data is always fresh on page load
 */
function resetBrazeData () {
    document.cookie
        .split('; ')
        .filter(row => row.startsWith('ab.'))
        .map(row => row.split('=')[0])
        .forEach(cookieName => {
            document.cookie = `${cookieName}=;max-age=0`;
        });

    Object.keys(localStorage)
        .filter(row => row.startsWith('ab.'))
        .forEach(storageItem => {
            localStorage.removeItem(storageItem);
        });
}

function zeroCardsMockSetup () {
    resetBrazeData();
    mock.teardown();
    mock.setup();
    mock.post(/\/api\/v3\/content_cards\/sync\/?/, {
        status: 201,
        body: JSON.stringify({ cards: [] })
    });
    mock.post(/\/api\/v3\/data\/?/, {
        status: 201,
        body: JSON.stringify(data())
    });
    mock.use(proxy);
}

function allCardsMockSetup () {
    resetBrazeData();
    mock.teardown();
    mock.setup();
    mock.post(/\/api\/v3\/content_cards\/sync\/?/, {
        status: 201,
        body: JSON.stringify(cards())
    });
    mock.post(/\/api\/v3\/data\/?/, {
        status: 201,
        body: JSON.stringify(data())
    });
    mock.use(proxy);
}

function notReturningMockSetup () {
    resetBrazeData();
    mock.teardown();
    mock.setup();
    mock.post(/\/api\/v3\/content_cards\/sync\/?/, () => new Promise(resolve => {
        this.rejectMockPromise = resolve;
    }));
    mock.post(/\/api\/v3\/data\/?/, {
        status: 201,
        body: JSON.stringify(data())
    });
    mock.use(proxy);
}

const methods = {
    onBrazeInit: action('on-braze-init'),
    getCardCount: action('get-card-count'),
    hasLoaded: action('has-loaded'),
    onError: action('on-error'),
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
            case 'Post_Order_Card_1':
                return 'PostOrderCard';
            default:
                break;
        }
        return false;
    }
};

const template = `<content-cards
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
                <template #${STATE_NO_CARDS}="{ status }">
                    <blockquote>
                        Note that this is demo injected content for the purposes of storybook
                    </blockquote>
                    NO CARDS
                </template>
                <template #${STATE_ERROR}="{ status }">
                    <blockquote>
                        Note that this is demo injected content for the purposes of storybook
                    </blockquote>
                    ERROR
                </template>
                <template #${STATE_LOADING}="{ status }">
                    <blockquote>
                        Note that this is demo injected content for the purposes of storybook
                    </blockquote>
                    LOADING
                </template>
            </content-cards>`;

export default {
    title: 'Components/Organisms/f-content-cards',
    argTypes: {
        apiKey: { control: { type: 'text' } },
        userId: { control: { type: 'text' } },
        title: { control: { type: 'text' } },
        locale: { control: { type: 'radio', options: ['da-DK', 'en-GB', 'en-AU'] } }
    },
    decorators: [withA11y]
};

export function ContentCardsBraze (args, { argTypes }) {
    return {
        name: 'Content Cards Braze',

        components,

        props: Object.keys(argTypes),

        methods,

        /**
         * Ensures that card mocks are set up
         */
        beforeCreate: allCardsMockSetup,

        template
    };
}

ContentCardsBraze.storyName = 'Braze Cards only (mocked API response)';

ContentCardsBraze.args = {
    apiKey: '00000000-0000-0000-0000-000000000000',
    userId: 'test-user-id',
    locale: 'en-GB'
};

export function ContentCardsCustom (args, { argTypes }) {
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

        template
    };
}

ContentCardsCustom.storyName = 'Custom card';

ContentCardsCustom.args = {
    apiKey: '00000000-0000-0000-0000-000000000000',
    userId: 'test-user-id',
    locale: 'en-GB'
};

export function ContentCardsLoading (args, { argTypes }) {
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

        template
    };
}

ContentCardsLoading.storyName = 'Loading state';

ContentCardsLoading.args = {
    apiKey: '00000000-0000-0000-0000-000000000000',
    userId: 'test-user-id',
    locale: 'en-GB'
};

export function ContentCardsNoCards (args, { argTypes }) {
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

        template
    };
}

ContentCardsNoCards.storyName = 'No Cards state';

ContentCardsNoCards.args = {
    apiKey: '00000000-0000-0000-0000-000000000000',
    userId: 'test-user-id',
    locale: 'en-GB'
};

export function ContentCardsError (args, { argTypes }) {
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

        template
    };
}

ContentCardsError.storyName = 'Error state';

ContentCardsError.args = {
    userId: 'test-user-id',
    locale: 'en-GB'
};
