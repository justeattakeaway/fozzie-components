import { mount, shallowMount } from '@vue/test-utils';
import Logo from '../Logo.vue';

describe('Logo', () => {
    it('should be defined', () => {
        const propsData = {
            theme: 'je',
            headerBackgroundTheme: 'transparent',
            companyName: 'Just Eat'
        };
        const wrapper = shallowMount(Logo, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    it('should render ml logo if ml theme passed', () => {
        // Arrange
        const propsData = {
            theme: 'ml',
            headerBackgroundTheme: 'transparent',
            companyName: 'MenuLog'
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
            companyName: 'Just Eat'
        };

        // Act
        const wrapper = shallowMount(Logo, { propsData });
        const logo = wrapper.find('[data-theme-logo="c-icon--je"]');

        // Assert
        expect(logo).toBeDefined();
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
                companyName: 'Just Eat'
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
                companyName: 'Just Eat'
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
