import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import mock, { proxy } from 'xhr-mock';
import { defaultEnabledCardTypes } from '@justeat/f-braze-adapter/src/services/contentCard.service';

import {
    ContentCards,
    VoucherCard,
    FirstTimeCustomerCard,
    PromotionCard,
    TermsAndConditionsCard,
    StampCard1
} from '../src';

import cards, { labelledMultiSelectAllowedValues } from './mockData/cards';
import data from './mockData/data';

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
            default:
                break;
        }
        return false;
    }
};

const template = `<content-cards
            #default="{ cards }"
            @on-braze-init="onBrazeInit"
            @get-card-count="getCardCount"
            @has-loaded="hasLoaded"
            @on-error="onError"
            :userId="userId"
            :apiKey="apiKey"
            :locale="locale"
            >
                <div>
                    <template v-for="(card, i) in cards">
                        <component
                            :is="handleCustomCardType(card.type)"
                            :key="i"
                            :card="card"
                            :tenant="tenant"
                        />
                    </template>
                </div>
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

        components: {
            ContentCards,
            VoucherCard,
            FirstTimeCustomerCard,
            PromotionCard,
            TermsAndConditionsCard,
            StampCard1
        },

        props: Object.keys(argTypes),

        methods,

        /**
         * Ensures that card mocks are set up
         */
        beforeCreate () {
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
        },

        template
    };
}

ContentCardsBraze.storyName = 'braze cards only';

ContentCardsBraze.args = {
    apiKey: '00000000-0000-0000-0000-000000000000',
    userId: 'test-user-id',
    title: 'Promotional Offers',
    locale: 'en-GB',
    enabledCardTypes: [...defaultEnabledCardTypes, 'Stamp_Card_1']
};

export function ContentCardsCustom (args, { argTypes }) {
    return {
        components: {
            ContentCards
        },

        props: Object.keys(argTypes),

        data () {
            return {
                applyCustomCards: () => {}
            };
        },

        methods: {
            ...methods,
            getCardCount (count) {
                methods.getCardCount.bind(this)(count);
                if (count === 0) {
                    this.applyCustomCards([
                        {
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
                        }
                    ]);
                }
            },
            customCardsCallback (callback) {
                this.applyCustomCards = callback;
            }
        },

        /**
         * Ensures that card mocks are set up
         */
        beforeCreate () {
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
        },

        template
    };
}

ContentCardsCustom.storyName = 'custom card';

ContentCardsCustom.args = {
    apiKey: '00000000-0000-0000-0000-000000000000',
    userId: 'test-user-id',
    title: 'Promotional Offers',
    locale: 'en-GB',
    enabledCardTypes: defaultEnabledCardTypes
};
