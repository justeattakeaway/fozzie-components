import { shallowMount } from '@vue/test-utils';
import Footer from '../Footer.vue';

describe('Footer', () => {
    it('should be defined', () => {
        const wrapper = shallowMount(Footer);
        expect(wrapper.exists()).toBe(true);
    });

    it('should render default component markup', () => {
        // Arrange & Act
        const wrapper = shallowMount(Footer);

        // Assert
        expect(wrapper).toMatchSnapshot();
    });
});
