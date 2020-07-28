import {
    withKnobs,
    optionsKnob as options,
    text,
    button
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import mock, { proxy } from 'xhr-mock';

import ContentCards from '../src/components/ContentCards.vue';
import { defaultEnabledCardTypes } from '../src/services/contentCard.service';

import cards from './mockData/cards';
import data from './mockData/data';

const callback = alert;
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

const allowedCardTypes = {
    'Terms and Conditions': 'Terms_And_Conditions_Card',
    'Terms and Conditions 2': 'Terms_And_Conditions_Card_2',
    Header: 'Header_Card',
    Voucher: 'Voucher_Card_1',
    Recommendation: 'Recommendation_Card_1',
    'Promotion 1': 'Promotion_Card_1',
    'Promotion 2': 'Promotion_Card_2',
    'Home Promotion 1': 'Home_Promotion_Card_1',
    'Home Promotion 2': 'Home_Promotion_Card_2',
    'Post Order 1': 'Post_Order_Card_1',
    'Anniversary 1': 'Anniversary_Card_1',
    'Restaurant FTC Offer': 'Restaurant_FTC_Offer_Card',
    'Recommendation 1': 'Recommendation_Card_1'
};

export default {
    title: 'Components/Organisms',
    decorators: [withKnobs, withA11y]
};

export function ContentCardscomponent () {
    return {
        components: {
            ContentCards
        },

        props: {
            apiKey: {
                default: text('API Key', '00000000-0000-0000-0000-000000000000')
            },
            userId: {
                default: text('User ID', 'test-user-id')
            },
            title: {
                default: text('Title', 'Promotional Offers')
            },
            enabledCardTypes: {
                default: options('Enabled Card Types', allowedCardTypes, defaultEnabledCardTypes, {
                    display: 'multi-select'
                })
            },
            refreshDisplayedCards: {
                default: button('Refresh Card Types Displayed', () => { window.appboy.requestContentCardsRefresh(); })
            }
        },

        methods: {
            onAppboyInit (appboy) {
                action('on-appboy-init')(appboy);
            },
            getCardCount (count) {
                action('get-card-count')(count);
            },
            getTitleCard (card) {
                action('get-title-card')(card);
            },
            hasLoaded (status) {
                action('has-loaded')(status);
            },
            onError (error) {
                action('on-error', error);
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
                body: JSON.stringify(cards())
            });
            mock.post(/\/api\/v3\/data\/?/, {
                status: 201,
                body: JSON.stringify(data())
            });
            mock.use(proxy);
        },

        template: `<content-cards
            @on-appboy-init="onAppboyInit"
            @get-card-count="getCardCount"
            @has-loaded="hasLoaded"
            @on-error="onError"
            :userId="userId"
            :apiKey="apiKey"
            :title="title"
            :enabledCardTypes="enabledCardTypes" />`
    };
}

ContentCardscomponent.story = {
    name: 'f-content-cards'
};
