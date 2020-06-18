import { withKnobs, text } from '@storybook/addon-knobs';
import ContentCards from '../src/components/ContentCards.vue';

export default {
    title: 'Components/Organisms',
    decorators: [withKnobs]
};

export const ContentCardscomponent = () => ({
    components: { ContentCards },
    props: {
        apiKey: {
            default: text('API Key', '')
        },
        userId: {
            default: text('User ID', '')
        },
        title: {
            default: text('Title', 'Promotional Offers')
        }
    },
    template: '<content-cards :userId="userId" :apiKey="apiKey" :title="title" />'
});

ContentCardscomponent.story = {
    name: 'f-content-cards'
};
