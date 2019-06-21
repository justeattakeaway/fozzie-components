import { shallowMount } from '@vue/test-utils';
import Footer from './Base.vue';

describe('ChevronIcon', () => {
    it('should be defined', () => {
        const wrapper = shallowMount(Footer);
        expect(wrapper).toBeDefined();
    });

    it('should render default component markup', () => {
        // Arrange & Act
        const wrapper = shallowMount(Footer);

        // Assert
        expect(wrapper).toMatchSnapshot();
    });
});
