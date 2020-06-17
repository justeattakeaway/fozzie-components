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
            default: text('API Key', '3360df52-217f-41e9-9c9c-0dcda2538025')
        },
        userId: {
            default: text('User ID', 'XHfk/Wgf3psjtfK1oNSOMWsuKPA=')
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
