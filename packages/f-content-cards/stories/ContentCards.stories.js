import { withKnobs, array, text } from '@storybook/addon-knobs';
import ContentCards from '../src/components/ContentCards.vue';
import { defaultEnabledCardTypes } from '../src/services/contentCard.service';
import { withA11y } from '@storybook/addon-a11y';

export default {
    title: 'Components/Organisms',
    decorators: [withKnobs, withA11y]
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
        },
        enabledCardTypes: {
            default: array('Enabled Card Types', defaultEnabledCardTypes)
        }
    },
    template: '<content-cards :userId="userId" :apiKey="apiKey" :title="title" :enabledCardTypes="enabledCardTypes" />'
});

ContentCardscomponent.story = {
    name: 'f-content-cards'
};
