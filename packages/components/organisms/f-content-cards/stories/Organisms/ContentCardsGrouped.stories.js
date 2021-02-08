import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import mock, { proxy } from 'xhr-mock';
import { ContentCards } from '../../src';
import data from '../mockData/data';
import cards from '../mockData/cards';

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
                TEST
            </content-cards>`;

export default {
    title: 'Components/Organisms/f-content-cards',
    argTypes: {
        apiKey: { control: { type: 'text' } },
        userId: { control: { type: 'text' } },
        title: { control: { type: 'text' } },
        groupCards: { control: { type: 'boolean' } },
        locale: { control: { type: 'radio', options: ['da-DK', 'en-GB', 'en-AU'] } },
    },
    decorators: [withA11y]
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

ContentCardsBrazeGroup.args = {
    apiKey: '00000000-0000-0000-0000-000000000000',
    userId: 'test-user-id',
    title: 'Promotional Offers',
    locale: 'en-GB',
    groupCards: true,
    enabledCardTypes: ['Header_Card', 'Promotion_Card_1', 'Promotion_Card_2', 'Restaurant_FTC_Offer_Card', 'Voucher_Card_1', 'Anniversary_Card_1']
};
