import { withA11y } from '@storybook/addon-a11y';
import SkeletonLoader from '../src/components/SkeletonLoader.vue';
import * as skeletons from '../src/components/skeletons';

export default {
    title: 'Components/Molecules',
    decorators: [withA11y]
};

export const SkeletonLoaderComponent = (args, { argTypes }) => ({
    components: { SkeletonLoader },
    props: Object.keys(argTypes),
    template: '<skeleton-loader :skeletonType="skeletonType" :isAnimated="isAnimated" />'
});

SkeletonLoaderComponent.args = {
    skeletonType: 'heading',
    isAnimated: true
};

SkeletonLoaderComponent.argTypes = {
    skeletonType: {
        control: {
            type: 'select',
            options: Object.keys(skeletons)
        }
    }
};

SkeletonLoaderComponent.storyName = 'f-skeleton-loader';
