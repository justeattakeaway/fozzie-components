import { withKnobs, number, select } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import SkeletonLoader from '../src/components/cardTemplates/SkeletonLoader.vue';

export default {
    title: 'Components/Molecules/f-content-cards',
    decorators: [withKnobs, withA11y]
};

export const SkeletonLoaderComponent = () => ({
    components: { SkeletonLoader },
    props: {
        count: {
            default: number('Count', 1)
        },
        type: {
            default: select('Type', ['promo', 'postOrder'], 'promo')
        }
    },
    template: '<skeleton-loader :count="count" :type="type" />'
});

SkeletonLoaderComponent.storyName = 'skeleton-card';
