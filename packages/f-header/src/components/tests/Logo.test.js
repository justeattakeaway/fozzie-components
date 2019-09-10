import { shallowMount } from '@vue/test-utils';
import Logo from '../Logo.vue';

describe('Logo', () => {
    it('should be defined', () => {
        const propsData = {
            theme: 'je',
            isTransparent: true,
            companyName: 'Just Eat'
        };
        const wrapper = shallowMount(Logo, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    it('should render ml logo if ml theme passed', () => {
        // Arrange
        const propsData = {
            theme: 'ml',
            isTransparent: true,
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
            isTransparent: true,
            companyName: 'Just Eat'
        };

        // Act
        const wrapper = shallowMount(Logo, { propsData });
        const logo = wrapper.find('[data-js-test="c-icon--je"]');

        // Assert
        expect(logo).toBeDefined();
    });

    it('should have "c-icon-je--transparentBg" class if "isTransparent" property is true', () => {
        // Arrange
        const propsData = {
            theme: 'je',
            isTransparent: true,
            companyName: 'Just Eat'
        };

        // Act
        const wrapper = shallowMount(Logo, { propsData });
        const logo = wrapper.find('[data-js-test="c-icon--je"]');

        // Assert
        // with dynamically rendered components
        // dynamic classes returned as one string in the array
        // so have to check for 'c-icon--je,c-icon-je--transparentBg' not just 'c-icon-je--transparentBg'
        expect(logo.classes()).toContain('c-icon--je,c-icon-je--transparentBg');
    });

    it('shouldn\'t have "c-icon-je--transparentBg" class if "isTransparent" property is false', () => {
        // Arrange
        const propsData = {
            theme: 'je',
            isTransparent: false,
            companyName: 'Just Eat'
        };

        // Act
        const wrapper = shallowMount(Logo, { propsData });
        const logo = wrapper.find('[data-js-test="c-icon--je"]');

        // Assert
        // with dynamically rendered components
        // dynamic classes returned as one string in the array
        // so have to check for 'c-icon--je,c-icon-je--transparentBg' not just 'c-icon-je--transparentBg'
        expect(logo.classes()).not.toContain('c-icon--je,c-icon-je--transparentBg');
    });
});
