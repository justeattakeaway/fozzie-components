import { mount, shallowMount } from '@vue/test-utils';
import Footer from '../Footer.vue';
import content from '../../../data/en-GB.json';
import { tenantConfigs } from '../../tenants';

let propsData;

describe('Footer', () => {
    beforeEach(() => {
        propsData = {
            content
        };
    });

    it('should be defined', () => {
        const wrapper = shallowMount(Footer, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    it('should render default component markup', () => {
        // Arrange & Act
        const wrapper = shallowMount(Footer, { propsData });

        // Assert
        expect(wrapper).toMatchSnapshot();
    });

    it('should render ml themed component if AU locale passed', () => {
        // Arrange & Act
        propsData = {
            ...propsData,
            locale: 'en-AU'
        };

        const wrapper = shallowMount(Footer, { propsData });

        // Assert
        expect(wrapper.attributes('data-theme')).toBe('ml');
    });

    it('should render ml themed component if NZ locale passed', () => {
        // Arrange & Act
        propsData = {
            ...propsData,
            locale: 'en-NZ'
        };

        const wrapper = shallowMount(Footer, { propsData });

        // Assert
        expect(wrapper.attributes('data-theme')).toBe('ml');
    });

    it('should render je themed component if IE locale passed', () => {
        // Arrange & Act
        propsData = {
            ...propsData,
            locale: 'en-IE'
        };

        const wrapper = shallowMount(Footer, { propsData });

        // Assert
        expect(wrapper.attributes('data-theme')).toBe('je');
    });

    it('should not render country selector if `showCountrySelector` is false', () => {
        // Arrange & Act
        propsData = {
            ...propsData,
            locale: 'en-GB',
            showCountrySelector: false
        };

        const wrapper = shallowMount(Footer, { propsData });

        // Assert
        expect(wrapper.find('[data-test-id="country-selector"]').exists()).toBe(false);
    });

    it('should render country selector if `showCountrySelector` is true', () => {
        // Arrange & Act
        propsData = {
            ...propsData,
            locale: 'en-GB',
            showCountrySelector: true
        };

        const wrapper = shallowMount(Footer, { propsData });

        // Assert
        expect(wrapper.find('[data-test-id="country-selector"]').exists()).toBe(true);
    });

    it.each([
        'en-GB',
        'en-AU',
        'en-IE',
        'en-NZ',
        'it-IT'
    ])('should not render the Confianza URL and icon when locale is %s', locale => {
        // Arrange & Act
        propsData = {
            ...propsData,
            locale
        };

        const wrapper = shallowMount(Footer, { propsData });

        // Assert
        expect(wrapper.find('[data-test-id="confianza-link"]').exists()).toBe(false);
        expect(wrapper.find('[data-test-id="confianza-icon"]').exists()).toBe(false);
    });

    describe('ES locale', () => {
        it('should render the Confianza URL and icon', () => {
            // Arrange & Act
            propsData = {
                ...propsData,
                locale: 'es-ES'
            };

            const wrapper = mount(Footer, { propsData });

            // Assert
            expect(wrapper.find('[data-test-id="confianza-link"]').exists()).toBe(true);
            expect(wrapper.find('[data-test-id="confianza-icon"]').exists()).toBe(true);
        });

        it('should use the correct Confianza URL', () => {
            // Arrange & Act
            propsData = {
                ...propsData,
                locale: 'es-ES'
            };

            const wrapper = mount(Footer, { propsData });

            // Assert
            expect(wrapper.find('[data-test-id="confianza-link"]').attributes('href')).toBe(tenantConfigs['es-ES'].metaLegalField.url);
        });

        it('should provide an aria label for screen readers', () => {
            // Arrange & Act
            propsData = {
                ...propsData,
                locale: 'es-ES'
            };

            const wrapper = mount(Footer, { propsData });

            // Assert
            expect(wrapper.find('[data-test-id="confianza-link"]').attributes('aria-label')).toBe(tenantConfigs['es-ES'].metaLegalField.screenReaderText);
        });

        it('should hide the Confianza icon from screen readers', () => {
            // Arrange & Act
            propsData = {
                ...propsData,
                locale: 'es-ES'
            };

            const wrapper = mount(Footer, { propsData });

            // Assert
            expect(wrapper.find('[data-test-id="confianza-icon"]').attributes('aria-hidden')).toBe('true');
        });

        it('should open the link in a new tab', () => {
            // Arrange & Act
            propsData = {
                ...propsData,
                locale: 'es-ES'
            };

            const wrapper = mount(Footer, { propsData });

            // Assert
            expect(wrapper.find('[data-test-id="confianza-link"]').attributes('target')).toBe('_blank');
            expect(wrapper.find('[data-test-id="confianza-link"]').attributes('rel')).toBe('noopener noreferrer');
        });
    });
});
