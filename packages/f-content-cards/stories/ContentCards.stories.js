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
            default: text('API Key', 'f714b0fc-6de5-4460-908e-2d9930f31339')
        },
        userId: {
            default: text('User ID', 'R8n39I8z2ZrfYSnqLbp2xPj5NdM=')
        }
    },
    template: '<content-cards :userId="userId" :apiKey="apiKey" />'
});

ContentCardscomponent.story = {
    name: 'f-content-cards'
};
