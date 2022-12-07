import { withA11y } from '@storybook/addon-a11y';
import Vue from 'vue';
import Vuex from 'vuex';
import HttpRequestMock from 'http-request-mock';
import VLoyalty from '../src/components/Loyalty.vue';
import loyaltyModule from '../src/store/loyalty.module';
import generateRestaurant from './mocks/generateRestaurant';
import data from './mocks/data';
import generateStampCards from './mocks/stampCards';

Vue.use(Vuex);

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
    title: 'Components/Pages',
    decorators: [withA11y]
};

export const VLoyaltyComponent = (args, { argTypes }) => ({
    components: { VLoyalty },

    props: Object.keys(argTypes),

    store: new Vuex.Store({
        modules: {
            loyaltyModule
        }
    }),

    beforeCreate () {
        resetBrazeData();

        function timeRange10HoursAroundNow () {
            const now = Math.floor(Date.now() / 1000);
            return {
                nowPlus5Hours: now + 60 * 60 * 5,
                nowMinus5Hours: now - 60 * 60 * 5
            };
        }
        const { nowMinus5Hours } = timeRange10HoursAroundNow();

        const mocker = HttpRequestMock.setup();

        // stampcards api mock
        mocker.mock({
            url: 'https://example.com/stampcards/status',
            method: 'get',
            delay: 0,
            status: 200,
            header: {
                'content-type': 'application/json'
            },
            body: {
                restaurants: [...['29221', '183152', '95259', '177906'].map(id => generateRestaurant(id))]
            }
        });

        // braze api mocks
        mocker.mock({
            url: 'https://sdk.iad-01.braze.com/api/v3/data/',
            method: 'post',
            delay: 0,
            status: 200,
            header: {
                'content-type': 'application/json'
            },
            body: data()
        });
        mocker.mock({
            url: 'https://sdk.iad-01.braze.com/api/v3/content_cards/sync',
            method: 'post',
            delay: 0,
            status: 200,
            header: {
                'content-type': 'application/json'
            },
            body: {
                cards: generateStampCards(10),
                // eslint-disable-next-line camelcase
                last_full_sync_at: nowMinus5Hours,
                // eslint-disable-next-line camelcase
                last_card_updated_at: nowMinus5Hours,
                // eslint-disable-next-line camelcase
                full_sync: true
            }
        });
    },

    template: '<v-loyalty v-bind="$props" />'
});

VLoyaltyComponent.storyName = 'f-loyalty';

VLoyaltyComponent.args = {
    // this is a fake JWT and contains no confidential data
    authToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vZXhhbXBsZS5jb20vbG95YWx0eSIsImlhdCI6MTY2OTczNTg3NiwiZXhwIjoxNzAxMjcxODc2LCJhdWQiOiJodHRwOi8vZXhhbXBsZS5jb20vbG95YWx0eSIsInN1YiI6IjE3OTg0NzA4IiwiZW1haWwiOiJqb2huc21pdGhAZXhhbXBsZS5jb20iLCJuYW1lIjoiSm9obiBTbWl0aCIsImdsb2JhbF91c2VyX2lkIjoiMTIzNDU2Nzg5IiwiZ2l2ZW5fbmFtZSI6IkpvaG4iLCJyb2xlIjoiUmVnaXN0ZXJlZCIsImZhbWlseV9uYW1lIjoiU21pdGgifQ.d__NTXKO7y3I1scfi11wkC4MtNhANzziTDH831T3shI',
    brazeApiKey: '83eac5ae-7482-11ed-a1eb-0242ac120002',
    inStampCardsAdapterExperiment: false,
    stampCardsAPIUrl: 'https://example.com/stampcards/status'
};
