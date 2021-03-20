import { shallowMount } from '@vue/test-utils';
import SkeletonLoader from '../SkeletonLoader.vue';

const defaultProps = {};

describe('SkeletonLoader', () => {
    const makeWrapper = ({ propsData = defaultProps } = {}) => shallowMount(SkeletonLoader, {
        propsData
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        // Arrange & Act
        const wrapper = makeWrapper();

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    describe('skeletonType validator', () => {
        it.each([[true, 'Heading'], [true, 'TextBlock'], [true, 'Sentence'], [false, 'NotAValidType']])('should return %p when %s is passed', (expected, skeletonTypeValue) => {
            // Arrange & Act
            const wrapper = makeWrapper();
            const prop = wrapper.vm.$options.props.skeletonType;

            // Assert
            expect(prop.validator(skeletonTypeValue)).toBe(expected);
        });
    });
});
