import {
    withKnobs,
    optionsKnob as options,
    text,
    select,
    button
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import mock, { proxy } from 'xhr-mock';

import ContentCards from '../src/components/ContentCards.vue';
import { defaultEnabledCardTypes } from '../src/services/contentCard.service';

import cards, { labelledMultiSelectAllowedValues } from './mockData/cards';
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

            locale: {
                default: select('Locale', ['da-DK', 'en-GB', 'en-AU'], 'en-GB')
            },

            enabledCardTypes: {
                default: options('Enabled Card Types', labelledMultiSelectAllowedValues, defaultEnabledCardTypes, {
                    display: 'multi-select'
                })
            },

            refreshDisplayedCards: {
                default: button('Refresh Card Types Displayed', () => { window.appboy.requestContentCardsRefresh(); })
            }
        },

        methods: {
            onBrazeInit: action('on-braze-init'),
            getCardCount: action('get-card-count'),
            getTitleCard: action('get-title-card'),
            hasLoaded: action('has-loaded'),
            onError: action('on-error')
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
            @on-braze-init="onBrazeInit"
            @get-card-count="getCardCount"
            @has-loaded="hasLoaded"
            @on-error="onError"
            :userId="userId"
            :apiKey="apiKey"
            :title="title"
            :locale="locale"
            :enabledCardTypes="enabledCardTypes" />`
    };
}

ContentCardscomponent.story = {
    name: 'f-content-cards'
};
