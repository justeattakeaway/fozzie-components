import { withKnobs, number } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import SkeletonCard from '../src/components/cardTemplates/SkeletonCard.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withKnobs, withA11y]
};

export const ContentCardscomponent = () => ({
    components: { SkeletonCard },
    props: {
        count: {
            default: number('Count', 1)
        }
    },
    template: '<skeleton-card />'
});

ContentCardscomponent.story = {
    name: 'f-skeleton-card'
};
