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

    describe('computed :: ', () => {
        describe('logoColourModifier :: ', () => {
            it.each([
                ['', 'white'],
                ['c-icon--onTransparentBg', 'transparent'],
                ['c-icon--onHighlightBg', 'highlight'],
                ['', 'blue']
            ])('should return correct %s if `headerBackgroundTheme` is %s', (expected, theme) => {
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
                        $style: {
                            'c-icon--onTransparentBg': 'c-icon--onTransparentBg',
                            'c-icon--onHighlightBg': 'c-icon--onHighlightBg'
                        }
                    }
                });

                // Assert
                expect(wrapper.vm.logoColourModifier).toEqual(expected);
            });
        });
    });
});
