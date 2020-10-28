import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import { withTests } from '@storybook/addon-jest';
import { defaultEnabledCardTypes } from '@justeat/f-metadata/src/services/contentCard.service';
import mock, { proxy } from 'xhr-mock';
import ContentCards from '../../src/components/ContentCards.vue';
import results from '../../src/components/tests/.jest-test-results.json';
// import { makeServer } from '../mocks/mirage-server';
import cards, { labelledMultiSelectAllowedValues } from '../mockData/cards';
import data from '../mockData/data';

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
    getTitleCard: action('get-title-card'),
    hasLoaded: action('has-loaded'),
    onError: action('on-error'),
    customCardsCallback: action('custom-cards-callback')
};

const template = `<content-cards
            @on-braze-init="onBrazeInit"
            @get-card-count="getCardCount"
            @has-loaded="hasLoaded"
            @on-error="onError"
            @custom-cards-callback="customCardsCallback"
            :userId="userId"
            :apiKey="apiKey"
            :title="title"
            :locale="locale"
            :group-cards="true"
            :enabledCardTypes="enabledCardTypes" />`;

export default {
    title: 'Components/Organisms/f-content-cards',
    argTypes: {
        apiKey: { control: { type: 'text' } },
        userId: { control: { type: 'text' } },
        title: { control: { type: 'text' } },
        groupCards: { control: { type: 'boolean' } },
        locale: { control: { type: 'radio', options: ['da-DK', 'en-GB', 'en-AU'] } },
        enabledCardTypes: { control: { type: 'check', options: labelledMultiSelectAllowedValues } }
    },
    decorators: [withA11y, withTests({ results })]
};

export function ContentCardsBrazeGroup (args, { argTypes }) {
    return {
        components: {
            ContentCards
        },

        props: Object.keys(argTypes),

        methods,

        /**
         * Ensures that card mocks are set up
         */
        beforeCreate () {
            resetBrazeData();
            // make the mirage server
            // makeServer();
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

ContentCardsBrazeGroup.storyName = 'Braze: Grouped';

ContentCardsBrazeGroup.parameters = {
    jest: ['ContentCards.test.js']
};

ContentCardsBrazeGroup.args = {
    apiKey: '00000000-0000-0000-0000-000000000000',
    userId: 'test-user-id',
    title: 'Promotional Offers',
    locale: 'en-GB',
    enabledCardTypes: defaultEnabledCardTypes
};
