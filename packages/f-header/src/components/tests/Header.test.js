import { shallowMount } from '@vue/test-utils';
import Header from '../Header.vue';

describe('Header', () => {
    allure.feature('Header');
    it('should be defined', () => {
        const propsData = {
            headerBackgroundTheme: 'transparent'
        };
        const wrapper = shallowMount(Header, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    it('should render default component markup', () => {
        // Arrange
        const propsData = {
            headerBackgroundTheme: 'transparent'
        };

        // Act
        const wrapper = shallowMount(Header, { propsData });

        // Assert
        expect(wrapper).toMatchSnapshot();
    });


    it('should render ml themed component if AU local passed', () => {
        // Arrange
        const propsData = {
            locale: 'en-AU',
            headerBackgroundTheme: 'transparent'
        };

        // Act
        const wrapper = shallowMount(Header, { propsData });

        // Assert
        expect(wrapper.attributes('data-theme')).toBe('ml');
    });

    it('should render ml themed component if NZ local passed', () => {
        // Arrange
        const propsData = {
            locale: 'en-NZ',
            headerBackgroundTheme: 'transparent'
        };

        // Act
        const wrapper = shallowMount(Header, { propsData });

        // Assert
        expect(wrapper.attributes('data-theme')).toBe('ml');
    });

    it('should render je themed component if NO local passed', () => {
        // Arrange
        const propsData = {
            locale: 'nb-NO',
            headerBackgroundTheme: 'transparent'
        };

        // Act
        const wrapper = shallowMount(Header, { propsData });

        // Assert
        expect(wrapper.attributes('data-theme')).toBe('je');
    });
});
