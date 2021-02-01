import { shallowMount } from '@vue/test-utils';
import Footer from '../Footer.vue';

describe('Footer', () => {
    allure.feature('Footer');
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

    it('should render ml themed component if AU local passed', () => {
        // Arrange & Act
        const propsData = {
            locale: 'en-AU'
        };
        const wrapper = shallowMount(Footer, { propsData });

        // Assert
        expect(wrapper.attributes('data-theme')).toBe('ml');
    });

    it('should render ml themed component if NZ local passed', () => {
        // Arrange & Act
        const propsData = {
            locale: 'en-NZ'
        };
        const wrapper = shallowMount(Footer, { propsData });

        // Assert
        expect(wrapper.attributes('data-theme')).toBe('ml');
    });

    it('should render je themed component if NO local passed', () => {
        // Arrange & Act
        const propsData = {
            locale: 'nb-NO'
        };
        const wrapper = shallowMount(Footer, { propsData });

        // Assert
        expect(wrapper.attributes('data-theme')).toBe('je');
    });

    it('should not render country selector if `showCountrySelector` is false', () => {
        // Arrange & Act
        const propsData = {
            locale: 'en-GB',
            showCountrySelector: false
        };
        const wrapper = shallowMount(Footer, { propsData });

        // Assert
        expect(wrapper.find('[data-test-id="country-selector"]').exists()).toBe(false);
    });

    it('should render country selector if `showCountrySelector` is true', () => {
        // Arrange & Act
        const propsData = {
            locale: 'en-GB',
            showCountrySelector: true
        };
        const wrapper = shallowMount(Footer, { propsData });

        // Assert
        expect(wrapper.find('[data-test-id="country-selector"]').exists()).toBe(true);
    });
});
