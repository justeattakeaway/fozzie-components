import { withA11y } from '@storybook/addon-a11y';
import SkeletonLoader from '../src/components/cardTemplates/SkeletonLoader.vue';

export default {
    title: 'Components/Molecules/f-content-cards',
    decorators: [withA11y]
};

export const SkeletonLoaderComponent = (args, { argTypes }) => ({
    components: { SkeletonLoader },
    props: Object.keys(argTypes),
    template: '<skeleton-loader :count="count" :type="type" />'
});

SkeletonLoaderComponent.storyName = 'skeleton-card';

SkeletonLoaderComponent.args = {
    count: 1,
    type: 'promo'
};

SkeletonLoaderComponent.argTypes = {
    count: {
        control: { type: 'number' },
        description: 'Increases the amount of visible skeleton cards'
    },
    type: {
        control: { type: 'select' },
        description: 'Changes skeleton card type on select',
        options: ['promo', 'postOrder']
    }
};
