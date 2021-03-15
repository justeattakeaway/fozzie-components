import { withA11y } from '@storybook/addon-a11y';
import SkeletonLoader from '../src/components/SkeletonLoader.vue';

export default {
    title: 'Components/Molecules',
    decorators: [withA11y]
};

export const SkeletonLoaderComponent = (args, { argTypes }) => ({
    components: { SkeletonLoader },
    props: Object.keys(argTypes),
    template: '<skeleton-loader max-width="600" :skeletonType="skeletonType" />'
});

SkeletonLoaderComponent.args = {
    skeletonType: 'heading'
};

SkeletonLoaderComponent.argTypes = {
    skeletonType: {
        control: {
            type: 'select',
            options: ['heading', 'text']
        }
    }
};

SkeletonLoaderComponent.storyName = 'f-skeleton-loader';
