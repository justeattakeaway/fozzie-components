import { withKnobs, number } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import SkeletonLoader from '../src/components/cardTemplates/SkeletonLoader.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withKnobs, withA11y]
};

export const ContentCardscomponent = () => ({
    components: { SkeletonLoader },
    props: {
        count: {
            default: number('Count', 1)
        }
    },
    template: '<skeleton-loader :count="count" />'
});

ContentCardscomponent.story = {
    name: 'f-skeleton-card'
};
