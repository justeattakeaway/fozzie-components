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
        const logo = wrapper.find('[data-js-test="c-icon--ml"]');

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
        const logo = wrapper.find('[data-js-test="c-icon--je"]');

        // Assert
        expect(logo).toBeDefined();
    });

    it('should have "c-icon-je--alt" class if "headerBackgroundTheme" property is "transparent"', () => {
        // Arrange
        const propsData = {
            theme: 'je',
            headerBackgroundTheme: 'transparent',
            companyName: 'Just Eat'
        };

        // Act
        const wrapper = mount(Logo, { propsData });
        const logo = wrapper.find('[data-js-test="c-icon--je"]');

        // Assert
        // with dynamically rendered components
        // dynamic classes returned as one string in the array
        // so have to check for 'c-logo-img,c-icon--je,c-icon-je--alt' not just 'c-icon-je--alt'
        expect(logo.classes('c-icon-je--alt')).toBe(true);
    });

    it('should have "c-icon-je--alt" class if "headerBackgroundTheme" property is "red"', () => {
        // Arrange
        const propsData = {
            theme: 'je',
            headerBackgroundTheme: 'red',
            companyName: 'Just Eat'
        };

        // Act
        const wrapper = mount(Logo, { propsData });
        const logo = wrapper.find('[data-js-test="c-icon--je"]');

        // Assert
        // with dynamically rendered components
        // dynamic classes returned as one string in the array
        // so have to check for 'c-logo-img,c-icon--je,c-icon-je--alt' not just 'c-icon-je--alt'
        expect(logo.classes('c-icon-je--alt')).toBe(true);
    });

    it('shouldn\'t have "c-icon-je--alt" class if if "headerBackgroundTheme" property is not "red", "transparent"', () => {
        // Arrange
        const propsData = {
            theme: 'je',
            headerBackgroundTheme: 'green',
            companyName: 'Just Eat'
        };

        // Act
        const wrapper = shallowMount(Logo, { propsData });
        const logo = wrapper.find('[data-js-test="c-icon--je"]');

        // Assert
        // with dynamically rendered components
        // dynamic classes returned as one string in the array
        // so have to check for 'c-logo-img,c-icon--je,c-icon-je--alt' not just 'c-icon-je--alt'
        expect(logo.classes()).not.toContain('c-logo-img,c-icon--je,c-icon-je--alt');
    });
});
