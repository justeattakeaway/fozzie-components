import { mount, shallowMount } from '@vue/test-utils';
import Logo from '../Logo.vue';

describe('Logo', () => {
    it('should be defined', () => {
        const propsData = {
            theme: 'je',
            headerBackgroundTheme: 'transparent',
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
            headerBackgroundTheme: 'transparent',
            companyName: 'MenuLog',
            isLogoDisabled: false
        };

        // Act
        const wrapper = shallowMount(Logo, { propsData });
        const logo = wrapper.find('[data-theme-logo="c-icon--ml"]');

        // Assert
        expect(logo).toBeDefined();
    });

    it('should render je logo if je theme passed', () => {
        // Arrange
        const propsData = {
            theme: 'je',
            headerBackgroundTheme: 'transparent',
            companyName: 'Just Eat',
            isLogoDisabled: false
        };

        // Act
        const wrapper = shallowMount(Logo, { propsData });
        const logo = wrapper.find('[data-theme-logo="c-icon--je"]');

        // Assert
        expect(logo).toBeDefined();
    });

    it('should render Jet logo if jet theme passed', () => {
        // Arrange
        const propsData = {
            theme: 'jet',
            headerBackgroundTheme: 'transparent',
            companyName: 'Just Eat Takeaway.com',
            isLogoDisabled: false
        };

        // Act
        const wrapper = shallowMount(Logo, { propsData });
        const logo = wrapper.find('[data-theme-logo="c-icon--jet"]');

        // Assert
        expect(logo).toBeDefined();
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
            'c-logo-img--alt': 'c-logo-img--alt'
        };

        it.each([
            ['transparent'],
            ['highlight']
        ])('should have "c-logo-img--alt" class if "headerBackgroundTheme" property is %s', theme => {
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
            expect(logo.classes()).toContain('c-logo-img--alt');
        });

        it.each([
            ['white'],
            ['blue']
        ])('should not have "c-logo-img--alt" class if "headerBackgroundTheme" property is %s', theme => {
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
            expect(logo.classes()).not.toContain('c-logo-img--alt');
        });
    });
});
