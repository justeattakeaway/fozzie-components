import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import ContentCards, { STATE_DEFAULT } from '../../src/components/ContentCards';
import generateStampCards from '../mockData/stampCards';
import StampCard from '../../src/components/cardTemplates/StampCard1.vue';

export default {
    title: 'Components/Organisms/f-content-cards',
    decorators: [withA11y]
};

export const CustomContentCardsAdapter = (args, { argTypes }) => ({
    components: {
        ContentCards,
        StampCard
    },

    props: Object.keys(argTypes),

    data: () => ({
        adapters: []
    }),

    created () {
        const adapter = () => ({
            source: 'StampCardsAdapter',
            initialise: (_, callback) => {
                callback(generateStampCards(4));
            },
            handleCardView: card => {
                action('view')(card);
            },
            handleCardClick: card => {
                action('click')(card);
            }
        });

        this.adapters.push(adapter());
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

CustomContentCardsAdapter.args = {
    locale: 'en-GB'
};

CustomContentCardsAdapter.storyName = 'Custom Adapter';
