import { withA11y } from '@storybook/addon-a11y';
import HttpRequestMock from 'http-request-mock';
import stampCardsAdapter from '@justeattakeaway/cc-stampcards-adapter';
import ContentCards, { STATE_DEFAULT } from '../../src/components/ContentCards';
import StampCard from '../../src/components/cardTemplates/StampCard1.vue';
import generateRestaurant from '../mockData/generateRestaurant';

export default {
    title: 'Components/Organisms/f-content-cards',
    decorators: [withA11y]
};

export const StampcardsContentCardsAdapter = (args, { argTypes }) => ({
    components: {
        ContentCards,
        StampCard
    },

    props: Object.keys(argTypes),

    data: () => ({
        adapters: []
    }),

    beforeCreate () {
        const mocker = HttpRequestMock.setup();
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
    },

    created () {
        const adapter = stampCardsAdapter({
            token: () => '__MOCK_TOKEN__',
            tenant: 'uk',
            url: 'https://example.com/stampcards/status'
        });

        this.adapters.push(adapter);
    },

    template: `
        <content-cards
            :adapters="adapters"
            :locale="locale"
        >
            <template #${STATE_DEFAULT}="{ cards }">
                <stamp-card v-for="card in cards" :key="card.id" :card="card"></stamp-card>
            </template>
        </content-cards>`
});

StampcardsContentCardsAdapter.args = {
    locale: 'en-GB'
};

StampcardsContentCardsAdapter.storyName = 'StampCards Adapter';
