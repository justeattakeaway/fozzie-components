import ContentCards from '../src/components/ContentCards.vue';

export default {
    title: 'Components/Organisms'
};

export const ContentCardsComponent = () => ({
    components: { ContentCards },
    template: '<content-cards />'
});

ContentCardsComponent.story = {
    name: 'f-content-cards'
};
