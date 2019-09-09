import { shallowMount } from '@vue/test-utils';
import Header from '../Header.vue';

describe('Header', () => {
    it('should be defined', () => {
        const propsData = {
            isTransparent: true
        };
        const wrapper = shallowMount(Header, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    it('should render default component markup', () => {
        // Arrange & Act
        const propsData = {
            isTransparent: true
        };
        const wrapper = shallowMount(Header, { propsData });

        // Assert
        expect(wrapper).toMatchSnapshot();
    });


    it('should render ml themed component if AU local passed', () => {
        // Arrange & Act
        const propsData = {
            locale: 'en-AU',
            isTransparent: true
        };
        const wrapper = shallowMount(Header, { propsData });

        // Assert
        expect(wrapper.attributes('data-theme')).toBe('ml');
    });

    it('should render ml themed component if NZ local passed', () => {
        // Arrange & Act
        const propsData = {
            locale: 'en-NZ',
            isTransparent: true
        };
        const wrapper = shallowMount(Header, { propsData });

        // Assert
        expect(wrapper.attributes('data-theme')).toBe('ml');
    });

    it('should render je themed component if NO local passed', () => {
        // Arrange & Act
        const propsData = {
            locale: 'nb-NO',
            isTransparent: true
        };
        const wrapper = shallowMount(Header, { propsData });

        // Assert
        expect(wrapper.attributes('data-theme')).toBe('je');
    });
});
