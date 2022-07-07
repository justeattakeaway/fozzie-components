import { mount, shallowMount } from '@vue/test-utils';
import Logo from '../Logo.vue';

describe('Logo', () => {
    it('should be defined', () => {
        const propsData = {
            theme: 'je',
            companyName: 'Just Eat',
            isLogoDisabled: false
        };
        const wrapper = shallowMount(Logo, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    it('should render ml logo if ml theme passed', () => {
        // Arrange
        const propsData = {
            theme: 'ml',
            companyName: 'MenuLog',
            isLogoDisabled: false
        };

        // Act
        const wrapper = shallowMount(Logo, { propsData });
        const logo = wrapper.find('[data-theme-logo="ml-logo"]');

        // Assert
        expect(logo.exists()).toBe(true);
    });

    it('should render je logo if je theme passed', () => {
        // Arrange
        const propsData = {
            theme: 'je',
            companyName: 'Just Eat',
            isLogoDisabled: false
        };

        // Act
        const wrapper = shallowMount(Logo, { propsData });
        const logo = wrapper.find('[data-theme-logo="je-logo"]');

        // Assert
        expect(logo.exists()).toBe(true);
    });

    it('should render Jet logo if jet theme passed', () => {
        // Arrange
        const propsData = {
            theme: 'jet',
            companyName: 'Just Eat Takeaway.com',
            isLogoDisabled: false
        };

        // Act
        const wrapper = shallowMount(Logo, { propsData });
        const logo = wrapper.find('[data-theme-logo="jet-logo"]');

        // Assert
        expect(logo.exists()).toBe(true);
    });

    it('should render an anchor tag around the logo if isLogoDisabled is false', () => {
        const $style = {
            disabled: 'disabled'
        };
        // Arrange
        const propsData = {
            theme: 'je',
            companyName: 'Just Eat',
            isLogoDisabled: false
        };

        // Act
        const wrapper = shallowMount(Logo, {
            propsData,
            mocks: {
                $style
            }
        });

        const disabledLogo = wrapper.find('[data-test-id="wrapper-element"]');

        // Assert
        expect(disabledLogo.exists()).toBe(true);
        expect(disabledLogo.element.tagName).toBe('A');
    });

    it('should change the logo link to a span if linkDisabled prop is provided', () => {
        const $style = {
            disabled: 'disabled'
        };
        // Arrange
        const propsData = {
            theme: 'je',
            companyName: 'Just Eat',
            isLogoDisabled: true
        };

        // Act
        const wrapper = shallowMount(Logo, {
            propsData,
            mocks: {
                $style
            }
        });

        const disabledLogo = wrapper.find('[data-test-id="disabled-wrapper-element"]');

        // Assert
        expect(disabledLogo.exists()).toBe(true);
        expect(disabledLogo.element.tagName).toBe('SPAN');
    });

    describe('header logo :: ', () => {
        const $style = {
            'c-logo-img--alt': 'c-logo-img--alt',
            'c-logo-img--search': 'c-logo-img--search'
        };

        it.each([
            ['c-logo-img--alt', 'transparent'],
            ['c-logo-img--alt', 'highlight'],
            ['c-logo-img--search', 'search']
        ])('should have "%s" class if "headerBackgroundTheme" property is "%s"', (cssClass, theme) => {
            // Arrange
            const propsData = {
                theme: 'je',
                headerBackgroundTheme: theme,
                companyName: 'Just Eat',
                isLogoDisabled: false
            };

            // Act
            const wrapper = mount(Logo, {
                propsData,
                mocks: {
                    $style
                }
            });
            const logo = wrapper.find('[data-test-id="header-logo"]');

            // Assert
            expect(logo.classes()).toContain(cssClass);
        });

        it.each([
            ['c-logo-img--alt', 'white'],
            ['c-logo-img--alt', 'search'],
            ['c-logo-img--search', 'transparent'],
            ['c-logo-img--search', 'highlight']
        ])('should not have "%s" class if "headerBackgroundTheme" property is "%s"', (cssClass, theme) => {
            // Arrange
            const propsData = {
                theme: 'je',
                headerBackgroundTheme: theme,
                companyName: 'Just Eat',
                isLogoDisabled: false
            };

            // Act
            const wrapper = mount(Logo, {
                propsData,
                mocks: {
                    $style
                }
            });
            const logo = wrapper.find('[data-test-id="header-logo"]');

            // Assert
            expect(logo.classes()).not.toContain(cssClass);
        });
    });
});
