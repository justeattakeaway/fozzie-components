import { shallowMount } from '@vue/test-utils';
import Header from '../Header.vue';

describe('Header', () => {
    it('should be defined', () => {
        const wrapper = shallowMount(Header);
        expect(wrapper.exists()).toBe(true);
    });

    it('should render default component markup', () => {
        // Arrange & Act
        const wrapper = shallowMount(Header);

        // Assert
        expect(wrapper).toMatchSnapshot();
    });
});
